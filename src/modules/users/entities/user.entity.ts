import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  @MinLength(3)
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  @MinLength(6)
  password: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  firstName: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  lastName: string;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
