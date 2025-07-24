import { BadRequestException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity as _BaseEntity,
  AfterLoad,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntity extends _BaseEntity {
  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @DeleteDateColumn()
  deleteDate: Date;

  @VersionColumn({ default: 0 })
  version: number;
}
