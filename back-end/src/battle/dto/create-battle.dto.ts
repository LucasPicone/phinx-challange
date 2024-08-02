import { IsString } from 'class-validator';

export class CreateBattleDto {
  @IsString()
  firstFighter: string;

  @IsString()
  secondFighter: string;
}
