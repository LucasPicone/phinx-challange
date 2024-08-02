import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { BattleRepository } from './repository/battle.repository';
import { Battle } from './entities/battle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Battle])],
  controllers: [BattleController],
  providers: [BattleRepository, BattleService],
})
export class BattleModule {}
