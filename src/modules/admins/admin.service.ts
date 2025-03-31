import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import { BaseService } from '../../providers/base.service';

@Injectable()
export class AdminService extends BaseService<AdminEntity> {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {
    super(adminRepository);
  }
}
