import { Column, Entity, PrimaryColumn, OneToMany, AfterLoad, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Translation } from './Translation.entity';

@Entity('localizationtest')
export class Localization extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  explanation: string;

  @OneToMany(() => Translation, (translation) => translation.localization, {
    cascade: true,
    eager: true,
  })
  translations?: Translation[];

  text: string;
  language: string;

  @AfterLoad()
  setFirstTranslation() {
    this.text = this.translations?.[0]?.text ?? "";
    this.language = this.translations?.[0]?.language ?? "";
  }
}


