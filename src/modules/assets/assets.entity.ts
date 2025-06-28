import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Localization } from '../localization/entities/localization.entity';

@Entity('assets')
export class AssetEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => Localization, {
    cascade: true,
  })
  @JoinColumn({ name: 'title', referencedColumnName: 'id' })
  localizationTitle: Localization;
}
