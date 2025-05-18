import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { BaseEntity } from '../../../entities/base.entity';
import { AssetEntity } from '../../../modules/assets/assets.entity';

@Entity('admins')
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  @MinLength(3)
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  @MinLength(6)
  password: string;

  @Column({
    type: 'enum',
    enum: ['super-admin', 'admin'],
    default: 'admin',
  })
  @IsEnum(['super-admin', 'admin'])
  role: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @Column({ nullable: true })
  assetId: number;

  @OneToOne(() => AssetEntity, {
    cascade: true,
  })
  @JoinColumn({ name: 'assetId', referencedColumnName: 'id' })
  asset: AssetEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
