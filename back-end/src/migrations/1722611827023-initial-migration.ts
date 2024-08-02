import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1722611827023 implements MigrationInterface {
  name = 'InitialMigration1722611827023';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `CREATE TABLE \`pokemon\` (\`id\` varchar(255) NOT NULL, \`deletedAt\` datetime(6) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`attack\` int NOT NULL, \`defense\` int NOT NULL, \`hp\` int NOT NULL, \`speed\` int NOT NULL, \`type\` enum ('NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY') NOT NULL, \`imageUrl\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
      await queryRunner.query(
        `CREATE TABLE \`battle\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deletedAt\` datetime(6) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`turnAmount\` int NOT NULL, \`winnerId\` varchar(255) NULL, \`loserId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
      );
      await queryRunner.query(
        `ALTER TABLE \`battle\` ADD CONSTRAINT \`FK_0f28157daad5bdcf01ba0c6430d\` FOREIGN KEY (\`winnerId\`) REFERENCES \`pokemon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
      await queryRunner.query(
        `ALTER TABLE \`battle\` ADD CONSTRAINT \`FK_eca4550a510e58e8ff8bad572b1\` FOREIGN KEY (\`loserId\`) REFERENCES \`pokemon\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    } catch (error) {
      await this.down(queryRunner);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`battle\` DROP FOREIGN KEY \`FK_eca4550a510e58e8ff8bad572b1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`battle\` DROP FOREIGN KEY \`FK_0f28157daad5bdcf01ba0c6430d\``,
    );
    await queryRunner.query(`DROP TABLE \`battle\``);
    await queryRunner.query(`DROP TABLE \`pokemon\``);
  }
}
