import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async findAll(): Promise<AdminEntity[]> {
    return this.adminRepository.find();
  }

  async findOne(id: string): Promise<AdminEntity> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  async create(adminData: Partial<AdminEntity>): Promise<AdminEntity> {
    const admin = this.adminRepository.create(adminData);
    return this.adminRepository.save(admin);
  }

  async update(
    id: string,
    adminData: Partial<AdminEntity>,
  ): Promise<AdminEntity> {
    await this.adminRepository.update(id, adminData);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.adminRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
  }
}
