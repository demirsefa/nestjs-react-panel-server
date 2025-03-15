import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThreadEntity } from './entities/thread.entity';
import { AdminEntity } from '../admins/entities/admin.entity';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(ThreadEntity)
    private threadRepository: Repository<ThreadEntity>,
  ) {}

  async findAll(): Promise<ThreadEntity[]> {
    return this.threadRepository.find({
      relations: ['author', 'approvedBy', 'messages'],
    });
  }

  async findOne(id: string): Promise<ThreadEntity> {
    const thread = await this.threadRepository.findOne({
      where: { id },
      relations: ['author', 'approvedBy', 'messages'],
    });
    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
    return thread;
  }

  async create(threadData: Partial<ThreadEntity>): Promise<ThreadEntity> {
    const thread = this.threadRepository.create(threadData);
    return this.threadRepository.save(thread);
  }

  async approve(id: string, admin: AdminEntity): Promise<ThreadEntity> {
    const thread = await this.findOne(id);
    thread.isApprovedByAdmin = true;
    thread.approvedBy = admin;
    return this.threadRepository.save(thread);
  }

  async update(id: string, threadData: Partial<ThreadEntity>): Promise<ThreadEntity> {
    const thread = await this.findOne(id);
    Object.assign(thread, threadData);
    return this.threadRepository.save(thread);
  }

  async delete(id: string): Promise<void> {
    const result = await this.threadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }
  }
}
