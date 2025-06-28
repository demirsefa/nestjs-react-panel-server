import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Localization } from './entities/localization.entity';
import { Translation } from './entities/Translation.entity';
import { BaseService } from '../../providers/base.service';

@Injectable()
export class LocalizationService extends BaseService<Localization> {
  constructor(
    @InjectRepository(Localization)
    private readonly localizationRepository: Repository<Localization>,
    @InjectRepository(Translation)
    private readonly translationRepository: Repository<Translation>,
  ) {
    super(localizationRepository);
  }

  async findAll({
    skip,
    limit,
    language,
  }: {
    skip: number;
    limit: number;
    language: string;
  }) {
    const res = await this.localizationRepository.findAndCount({
      skip,
      take: limit,
      where: {
        translations: {
          language,
        },
      },
      relations: ['translations'],
    });
    const list = res[0];
    const total = res[1];

    return {
      total,
      data: list,
    };
  }

  async findByLanguage(language: string): Promise<Localization[]> {
    console.log(language);
    return (
      await this.localizationRepository
        .createQueryBuilder('localization')
        .leftJoinAndSelect(
          'localization.translations',
          'translation',
          'translation.language = :language',
          { language },
        )
        .getMany()
    ).map((item) => {
      item.language = item.language || language;
      return item;
    });
  }

  async findByKey(key: string): Promise<Localization[]> {
    return this.localizationRepository.find({ where: { id: key } });
  }

  async updateByKey(keys: Localization[]): Promise<Localization[]> {
    for (const key of keys) {
      //sıfırlamamsı için
      delete key.translations;
      await this.localizationRepository.save(key);
      const translation = await this.translationRepository.findOne({
        where: { localization: { id: key.id }, language: key.language },
      });
      if (translation) {
        const updatedVersion = this.translationRepository.create({
          ...translation,
          text: key.text,
        });
        await this.translationRepository.save({
          ...updatedVersion,
          clientVersion: updatedVersion.clientVersion,
        });
      } else {
        const res = this.translationRepository.create({
          text: key.text,
          language: key.language,
          localizationId: key.id,
          clientVersion: 1,
        });
        await this.translationRepository.save(res);
      }
    }
    return keys;
  }

  public override async create(
    data: DeepPartial<Localization>,
  ): Promise<Localization> {
    if (data.translations?.[0]) {
      data.translations[0].localizationId = dat a.id;
    }
    const idExists = await this.localizationRepository.findOne({
      where: { id: data.id },
      withDeleted: true,
    });
    if (idExists) {
      throw new BadRequestException(
        `Entity with id ${data.id} already exists. It might be deleted.`,
      );
    }
    const entity = this.localizationRepository.create(data);

    return this.localizationRepository.save(entity);
  }

  public override async update(
    id: string | number,
    data: DeepPartial<Localization>,
  ): Promise<Localization> {
    if (data.translations?.[0]) {
      data.translations[0].localizationId = data.id;
    }
    const existingEntity = await this.findOne(id);
    if (!existingEntity) {
      throw new Error(`Entity with id ${id} not found`);
    }

    const updatedEntity = this.localizationRepository.merge(
      existingEntity,
      data,
    );
    return this.localizationRepository.save(updatedEntity); // Save merged entity
  }
}
