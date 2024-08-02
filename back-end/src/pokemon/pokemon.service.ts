import { Inject, Injectable, NotImplementedException } from '@nestjs/common';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonRepository } from './repository/pokemon.repository';

@Injectable()
export class PokemonService {
  constructor(
    @Inject(PokemonRepository) private readonly repository: PokemonRepository,
  ) {}

  create(createPokemonDto: CreatePokemonDto) {
    throw new NotImplementedException();
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    throw new NotImplementedException();
  }

  remove(id: number) {
    throw new NotImplementedException();
  }
}
