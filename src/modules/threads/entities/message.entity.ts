import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { IsString, MinLength, IsBoolean, ValidateNested } from 'class-validator';
import { ThreadEntity } from './thread.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  @IsString()
  @MinLength(1)
  content: string;

  @ManyToOne(() => ThreadEntity, thread => thread.messages, { nullable: false })
  @ValidateNested()
  thread: ThreadEntity;

  @ManyToOne(() => UserEntity, { nullable: false })
  @ValidateNested()
  author: UserEntity;

  @Column({ default: true })
  @IsBoolean()
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
