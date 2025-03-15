import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { IsString, MinLength, IsBoolean, ValidateNested } from 'class-validator';
import { MessageEntity } from './message.entity';
import { AdminEntity } from '../../admins/entities/admin.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('threads')
export class ThreadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @MinLength(3)
  title: string;

  @Column({ type: 'text' })
  @IsString()
  @MinLength(10)
  content: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  @ValidateNested()
  author: UserEntity;

  @Column({ default: false })
  @IsBoolean()
  isApprovedByAdmin: boolean;

  @ManyToOne(() => AdminEntity, { nullable: true })
  @ValidateNested()
  approvedBy: AdminEntity;

  @OneToMany(() => MessageEntity, message => message.thread)
  @ValidateNested({ each: true })
  messages: MessageEntity[];

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
