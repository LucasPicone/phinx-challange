import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Battle } from '../entities/battle.entity';

@Injectable()
export class BattleRepository extends Repository<Battle> {
  constructor(
    @InjectRepository(Battle) private readonly _: Repository<Battle>,
  ) {
    super(_.target, _.manager, _.queryRunner);
  }
}
