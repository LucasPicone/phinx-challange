import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PokemonType } from '../enum/pokemon-type.enum';

@Entity()
export class Pokemon {
  @PrimaryColumn()
  @IsString()
  id?: string;

  @DeleteDateColumn({ select: false, nullable: true })
  @IsDateString()
  deletedAt?: Date;

  @CreateDateColumn()
  @IsDateString()
  createdAt?: Date;

  @UpdateDateColumn()
  @IsDateString()
  updatedAt?: Date;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  @IsPositive()
  @Min(1)
  attack: number;

  @Column()
  @IsNumber()
  @IsPositive()
  @Min(1)
  defense: number;

  @Column()
  @IsNumber()
  @IsPositive()
  @Min(1)
  hp: number;

  @Column()
  @IsNumber()
  @IsPositive()
  @Min(1)
  speed: number;

  @Column({ type: 'simple-enum', enum: PokemonType, nullable: false })
  @IsEnum(PokemonType)
  type: PokemonType;

  @Column()
  @IsString()
  @IsUrl()
  imageUrl: string;
}
