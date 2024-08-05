import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { BattleRepository } from './repository/battle.repository';
import { Battle } from './entities/battle.entity';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [TypeOrmModule.forFeature([Battle]), PokemonModule],
  controllers: [BattleController],
  providers: [BattleRepository, BattleService],
})
export class BattleModule {}
