import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { BattleModule } from './battle/battle.module';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: configService.get('database.type') as any,
        database: configService.get<string>('database.database'),
        entities: [`${__dirname}/**/**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
        migrationsTableName: 'migrations',
        migrationsRun: false,
        logging: configService.get('database.logging') == 'true',
      }),
      inject: [ConfigService],
    }),
    PokemonModule,
    BattleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
