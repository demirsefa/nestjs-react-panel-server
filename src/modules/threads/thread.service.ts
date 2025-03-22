import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThreadEntity } from './entities/thread.entity';
import { AdminEntity } from '../admins/entities/admin.entity';
import { BaseService } from '../../providers/base.service';

@Injectable()
export class ThreadService extends BaseService<ThreadEntity> {
  constructor(
    @InjectRepository(ThreadEntity)
    private threadRepository: Repository<ThreadEntity>,
  ) {
    super(threadRepository);
  }

  async approve(id: string, admin: AdminEntity): Promise<ThreadEntity> {
    const thread = await this.findOne({ id } as any);
    if (!thread) {
      throw new NotFoundException(`thread with id ${id} not found`);
    }
    thread.isApprovedByAdmin = true;
    thread.approvedBy = admin;
    return this.threadRepository.save(thread);
  }
}
