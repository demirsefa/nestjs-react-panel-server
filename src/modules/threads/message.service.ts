import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { BaseService } from '../../providers/base.service';

@Injectable()
export class MessageService extends BaseService<MessageEntity> {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {
    super(messageRepository);
  }

  async findByThread(threadId: string): Promise<MessageEntity[]> {
    return this.messageRepository.find({
      where: { thread: { id: threadId } },
      relations: ['author'],
      order: { createdAt: 'ASC' },
    });
  }
}
