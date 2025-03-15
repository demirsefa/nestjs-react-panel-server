import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminEntity } from '../modules/admins/entities/admin.entity';
import { UserEntity } from '../modules/users/entities/user.entity';
import { ThreadEntity } from '../modules/threads/entities/thread.entity';
import { MessageEntity } from '../modules/threads/entities/message.entity';
import { GenerateAdminsCommand } from './generate-admins.command';
import { GenerateUsersCommand } from './generate-users.command';
import { GenerateThreadsCommand } from './generate-threads.command';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [AdminEntity, UserEntity, ThreadEntity, MessageEntity],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    TypeOrmModule.forFeature([AdminEntity, UserEntity, ThreadEntity, MessageEntity]),
  ],
  providers: [GenerateAdminsCommand, GenerateUsersCommand, GenerateThreadsCommand],
})
export class CommandsModule {}
