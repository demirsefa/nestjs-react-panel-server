import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localization } from './localization.entity';
import { BaseService } from '../../providers/base.service';

@Injectable()
export class LocalizationService extends BaseService<Localization> {
  constructor(
    @InjectRepository(Localization)
    private readonly localizationRepository: Repository<Localization>,
  ) {
    super(localizationRepository);
  }

  async findByLanguage(language: string): Promise<Localization[]> {
    return this.localizationRepository.find({ where: { language } });
  }

  async findByKey(key: string): Promise<Localization[]> {
    return this.localizationRepository.find({ where: { key } });
  }
} 