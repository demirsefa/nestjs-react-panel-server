import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from '../modules/admins/entities/admin.entity';
import { UserEntity } from '../modules/users/entities/user.entity';
import { ThreadEntity } from '../modules/threads/entities/thread.entity';
import { MessageEntity } from '../modules/threads/entities/message.entity';
import { GenerateAdminsCommand } from './generate-admins.command';
import { GenerateUsersCommand } from './generate-users.command';
import { GenerateThreadsCommand } from './generate-threads.command';
import { databaseConfig } from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      AdminEntity,
      UserEntity,
      ThreadEntity,
      MessageEntity,
    ]),
  ],
  providers: [
    GenerateAdminsCommand,
    GenerateUsersCommand,
    GenerateThreadsCommand,
  ],
})
export class CommandsModule {}
