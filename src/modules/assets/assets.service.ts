import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './assets.entity';
import { BaseService } from '../../providers/base.service';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AssetsService extends BaseService<Asset> {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {
    super(assetRepository);
  }

  async createAssets(
    file: Express.Multer.File,
    data: DeepPartial<Asset>,
  ): Promise<Asset> {
    console.log(file);
    const filename = file.filename;
    const url = `/uploads/${filename}`;
    return super.create({
      ...data,
      filename,
      url,
    });
  }

  async updateAssets(
    id: number,
    file: Express.Multer.File,
    data: DeepPartial<Asset>,
  ): Promise<Asset> {
    const filename = file.filename;
    const url = `/uploads/${filename}`;
    return super.update(id, {
      ...data,
      filename,
      url,
    });
  }
}
