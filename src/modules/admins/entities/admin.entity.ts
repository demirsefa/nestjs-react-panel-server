import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
  IsBoolean,
} from 'class-validator';

@Entity('admins')
export class AdminEntity {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
