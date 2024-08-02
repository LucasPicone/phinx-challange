import { OmitType } from '@nestjs/swagger';

import { Pokemon } from '../entities/pokemon.entity';

export class CreatePokemonDto extends OmitType(Pokemon, [
  'createdAt',
  'deletedAt',
  'updatedAt',
] as const) {}
