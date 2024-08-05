import { MigrationInterface, QueryRunner } from 'typeorm';

import { PokemonType } from '../pokemon/enum/pokemon-type.enum';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { pokemon } from '../../data/pokemon.json';

export class ImportPokemon1722658644952 implements MigrationInterface {
  name = 'ImportPokemon1722658644952';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Pokemon)
        .values(
          pokemon.map((p) => {
            return { ...p, type: p.type as PokemonType };
          }),
        )
        .updateEntity(false)
        .execute();
    } catch (error) {
      await this.down(queryRunner);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`pokemon\``);
  }
}
