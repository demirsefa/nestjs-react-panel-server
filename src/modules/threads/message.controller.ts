import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageEntity } from './entities/message.entity';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('thread/:threadId')
  findByThread(@Param('threadId') threadId: string) {
    return this.messageService.findByThread(threadId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() messageData: Partial<MessageEntity>) {
    return this.messageService.create(messageData);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() messageData: Partial<MessageEntity>) {
    return this.messageService.update(id, messageData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.messageService.delete(id);
  }
}
