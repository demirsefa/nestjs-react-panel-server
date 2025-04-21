import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { LanguageEntity } from './entities/language.entity';
import { BaseService } from '../../providers/base.service';

@Injectable()
export class LanguageService extends BaseService<LanguageEntity> {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageRepository: Repository<LanguageEntity>,
  ) {
    super(languageRepository);
  }

  private async validateDefaultLanguage(data: DeepPartial<LanguageEntity>, currentCode?: string): Promise<void> {
    if (data.isDefault) {
      const existingDefault = await this.languageRepository.findOne({
        where: { isDefault: true },
      });

      if (existingDefault && (!currentCode || existingDefault.code !== currentCode)) {
        throw new BadRequestException('Another language is already set as default');
      }
    }
  }

  override async create(data: DeepPartial<LanguageEntity>): Promise<LanguageEntity> {
    await this.validateDefaultLanguage(data);
    return this.languageRepository.save(data);
  }

  override async update(id: string , data: DeepPartial<LanguageEntity>): Promise<LanguageEntity> {
    // Find the existing entity
    const existingEntity = await this.findOne(id);
    if (!existingEntity) {
      throw new Error(`Entity with code ${id} not found`);
    }

    await this.validateDefaultLanguage(data, existingEntity.code);

    // Merge the existing entity with the update data
    const updatedEntity = this.languageRepository.merge(existingEntity, data);
    return this.languageRepository.save(updatedEntity);
  }
}