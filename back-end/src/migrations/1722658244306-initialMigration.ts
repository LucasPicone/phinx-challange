import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1722658244306 implements MigrationInterface {
  name = 'InitialMigration1722658244306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar CHECK( "type" IN ('NORMAL','FIRE','WATER','ELECTRIC','GRASS','ICE','FIGHTING','POISON','GROUND','FLYING','PSYCHIC','BUG','ROCK','GHOST','DRAGON','DARK','STEEL','FAIRY') ) NOT NULL, "imageUrl" varchar NOT NULL)`,
      );
      await queryRunner.query(
        `CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "turnAmount" integer NOT NULL, "winnerId" varchar, "loserId" varchar)`,
      );
      await queryRunner.query(
        `CREATE TABLE "temporary_battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "turnAmount" integer NOT NULL, "winnerId" varchar, "loserId" varchar, CONSTRAINT "FK_0f28157daad5bdcf01ba0c6430d" FOREIGN KEY ("winnerId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_eca4550a510e58e8ff8bad572b1" FOREIGN KEY ("loserId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      );
      await queryRunner.query(
        `INSERT INTO "temporary_battle"("id", "deletedAt", "createdAt", "updatedAt", "turnAmount", "winnerId", "loserId") SELECT "id", "deletedAt", "createdAt", "updatedAt", "turnAmount", "winnerId", "loserId" FROM "battle"`,
      );
      await queryRunner.query(`DROP TABLE "battle"`);
      await queryRunner.query(
        `ALTER TABLE "temporary_battle" RENAME TO "battle"`,
      );
    } catch (error) {
      await this.down(queryRunner);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "battle" RENAME TO "temporary_battle"`,
    );
    await queryRunner.query(
      `CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "deletedAt" datetime, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "turnAmount" integer NOT NULL, "winnerId" varchar, "loserId" varchar)`,
    );
    await queryRunner.query(
      `INSERT INTO "battle"("id", "deletedAt", "createdAt", "updatedAt", "turnAmount", "winnerId", "loserId") SELECT "id", "deletedAt", "createdAt", "updatedAt", "turnAmount", "winnerId", "loserId" FROM "temporary_battle"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_battle"`);
    await queryRunner.query(`DROP TABLE "battle"`);
    await queryRunner.query(`DROP TABLE "pokemon"`);
  }
}
