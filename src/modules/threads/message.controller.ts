import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { BaseController } from '../../controllers/base.controller';
import { MessageEntity } from './entities/message.entity';

@Controller('messages')
export class MessageController extends BaseController<MessageEntity> {
  constructor(private readonly messageService: MessageService) {
    super(messageService);
  }

  @Get('thread/:threadId')
  findByThread(@Param('threadId') threadId: string) {
    return this.messageService.findByThread(threadId);
  }
}
