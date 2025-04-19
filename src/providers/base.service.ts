import { DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

export class BaseService<T extends BaseEntity> {
  constructor(
    private readonly repository: Repository<T>, // Injected Repository
  ) {}

  async findAll({ skip, limit }: { skip: number; limit: number }) {
    const list = await this.repository.find({
      skip,
      take: limit,
    });
    return {
      total: await this.repository.count(),
      data: list,
    };
  }

  async findOne(id: string | number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any); // "id" assumes that the primary column is `id`
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string | number, data: DeepPartial<T>): Promise<T> {
    // Find the existing entity
    const existingEntity = await this.findOne(id);
    if (!existingEntity) {
      throw new Error(`Entity with id ${id} not found`);
    }

    // Merge the existing entity with new data
    const updatedEntity = this.repository.merge(existingEntity, data);
    return this.repository.save(updatedEntity); // Save merged entity
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
