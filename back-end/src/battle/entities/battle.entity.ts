import { IsDateString, IsNumber, IsPositive } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Pokemon } from '../../pokemon/entities/pokemon.entity';

@Entity()
export class Battle {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id?: number;

  @DeleteDateColumn({ select: false, nullable: true })
  @IsDateString()
  deletedAt?: Date;

  @CreateDateColumn()
  @IsDateString()
  createdAt?: Date;

  @UpdateDateColumn()
  @IsDateString()
  updatedAt?: Date;

  // it could be changed to a ManyToMany to support multi-pokemon battles
  // TODO: add a column to save the remaining HP for the winning pokemon
  @ManyToOne(() => Pokemon)
  @JoinColumn()
  winner: Pokemon;

  @ManyToOne(() => Pokemon)
  @JoinColumn()
  loser: Pokemon;

  @Column()
  @IsNumber()
  @IsPositive()
  turnAmount: number;
}
