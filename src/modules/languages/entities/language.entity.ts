import {
  Entity,
  Column,
  PrimaryColumn,
} from 'typeorm';
import { IsString, MinLength } from 'class-validator';
import { BaseEntity } from '../../../entities/base.entity';

@Entity('language')
export class LanguageEntity extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  @MinLength(2)
  code: string;
  
  @Column({ default: false })
  isDefault: boolean;
} 