import { BaseEntity } from '../../../entities/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Localization } from './localization.entity';

@Entity('translation')
export class Translation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  language: string;

  @ManyToOne(() => Localization, (localization) => localization.translations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'localizationId' })
  localization: Localization;

  @Column()
  localizationId: string;
}
