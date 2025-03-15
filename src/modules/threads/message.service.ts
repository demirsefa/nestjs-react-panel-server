import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  async findByThread(threadId: string): Promise<MessageEntity[]> {
    return this.messageRepository.find({
      where: { thread: { id: threadId } },
      relations: ['author'],
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<MessageEntity> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['author', 'thread'],
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async create(messageData: Partial<MessageEntity>): Promise<MessageEntity> {
    const message = this.messageRepository.create(messageData);
    return this.messageRepository.save(message);
  }

  async update(id: string, messageData: Partial<MessageEntity>): Promise<MessageEntity> {
    const message = await this.findOne(id);
    Object.assign(message, messageData);
    return this.messageRepository.save(message);
  }

  async delete(id: string): Promise<void> {
    const result = await this.messageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
  }
}
