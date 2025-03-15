import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadEntity } from './entities/thread.entity';
import { MessageEntity } from './entities/message.entity';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ThreadEntity, MessageEntity])],
  providers: [ThreadService, MessageService],
  controllers: [ThreadController, MessageController],
  exports: [ThreadService, MessageService],
})
export class ThreadModule {}
