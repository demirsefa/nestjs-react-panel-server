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

  @IsNotEmpty()
  clientVersion: number; // To hold the version from the client

  @BeforeUpdate()
  validateVersion() {
    if (this.version !== this.clientVersion) {
      throw new BadRequestException('Version mismatch: Data is outdated');
    }
  }

  @AfterLoad()
  setClientVersion() {
    this.clientVersion = this.version;
  }
}
