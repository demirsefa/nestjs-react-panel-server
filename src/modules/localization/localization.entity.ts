import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';

@Entity('localizations')
export class Localization extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  text: string;

  @Column()
  explanation: string;

  @Column()
  language: string;
} 