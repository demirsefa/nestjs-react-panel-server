import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdminEntity } from '../modules/admins/entities/admin.entity';
import { UserEntity } from '../modules/users/entities/user.entity';
import { ThreadEntity } from '../modules/threads/entities/thread.entity';
import { AssetEntity } from '../modules/assets/assets.entity';
import { MessageEntity } from '../modules/threads/entities/message.entity';
import { GenerateAdminsCommand } from './generate-admins.command';
import { GenerateUsersCommand } from './generate-users.command';
import { GenerateThreadsCommand } from './generate-threads.command';
import { FixAdminsCommand } from './fix-admins.command';
import { databaseConfig } from '../config/database.config';
// npx ts-node cli.ts fix:admins
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([
      AssetEntity,
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
    FixAdminsCommand,
  ],
})
export class CommandsModule {}
