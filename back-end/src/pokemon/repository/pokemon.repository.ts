import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Pokemon } from '../entities/pokemon.entity';

@Injectable()
export class PokemonRepository extends Repository<Pokemon> {
  constructor(
    @InjectRepository(Pokemon) private readonly _: Repository<Pokemon>,
  ) {
    super(_.target, _.manager, _.queryRunner);
  }
}
