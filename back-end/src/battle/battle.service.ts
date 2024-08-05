import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateBattleDto } from './dto/create-battle.dto';
import { PokemonService } from '../pokemon/pokemon.service';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { BattleRepository } from './repository/battle.repository';
import { Battle } from './entities/battle.entity';

@Injectable()
export class BattleService {
  constructor(
    private readonly repository: BattleRepository,
    private readonly pokemonService: PokemonService,
  ) {}

  /** The last element on the array will be the receiver of the first attack */
  private battleStart(first: Pokemon, second: Pokemon): Pokemon[] {
    const battleOrder: Pokemon[] = [];
    if (first.speed === second.speed) {
      if (first.attack > second.attack) {
        battleOrder.push(first, second);
      } else {
        battleOrder.push(second, first);
      }
    } else if (first.speed > second.speed) {
      battleOrder.push(first, second);
    } else {
      battleOrder.push(second, first);
    }
    return battleOrder;
  }
  /**
   * @param createBattleDto
   * Para el cálculo de la batalla, ten en consideración lo siguiente:
   *    El pokemon con la velocidad más alta hace el primer ataque, si son iguales, el pokemon con el ataque más alto va primero.
   *    Para calcular el daño, resta la defensa del ataque (ataque-defensa). La diferencia es el daño. Si el ataque es igual o menor que la defensa el daño es 1.
   *    El daño lo restas del HP.
   *    Los pokemon pelearán por turnos. Todos los turnos serán calculados in el mismo request. Es por esto por lo que el endpoint debe retornar la data del ganador en la misma llamada.
   *    El ganador es el que se reste el HP del enemigo a cero.
   *    NOTA: como adicional se podría implementar el sistema de tipos, pero no es requerido.
   * @returns
   */
  async create(createBattleDto: CreateBattleDto) {
    const { firstFighter, secondFighter } = createBattleDto;
    const [firstPokemon, secondPokemon] = await Promise.all([
      this.pokemonService.findOne(firstFighter),
      this.pokemonService.findOne(secondFighter),
    ]);
    if (!firstPokemon || !secondPokemon)
      throw new NotFoundException('At least one of the pokemons was not found');

    const battle = this.battleStart(firstPokemon, secondPokemon);

    let turnCount = 1;

    const newBattle: Battle = new Battle();

    while (battle.length === 2) {
      const receiver = battle.pop();
      const attacker = battle.pop();

      const attack =
        attacker.attack <= receiver.defense
          ? 1
          : attacker.attack - receiver.defense;
      receiver.hp -= attack;
      if (receiver.hp > 0) {
        turnCount += 1;
        battle.push(receiver);
      } else {
        newBattle.loser = receiver;
        newBattle.winner = attacker;
        newBattle.turnAmount = turnCount;
      }
      battle.push(attacker);
    }

    return this.repository.save(newBattle);
  }

  findAll() {
    return `This action returns all battle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} battle`;
  }
}
