import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { BattleService } from './battle.service';
import { CreateBattleDto } from './dto/create-battle.dto';

@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Post()
  create(@Body() createBattleDto: CreateBattleDto) {
    return this.battleService.create(createBattleDto);
  }

  @Get()
  findAll() {
    return this.battleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.battleService.findOne(+id);
  }
}
