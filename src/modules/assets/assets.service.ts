import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEntity } from './assets.entity';
import { BaseService } from '../../providers/base.service';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AssetsService extends BaseService<AssetEntity> {
  constructor(
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
  ) {
    super(assetRepository);
  }

  async createAssets(
    file: Express.Multer.File,
    data: DeepPartial<AssetEntity>,
  ): Promise<AssetEntity> {
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
    data: DeepPartial<AssetEntity>,
  ): Promise<AssetEntity> {
    const filename = file.filename;
    const url = `/uploads/${filename}`;
    return super.update(id, {
      ...data,
      filename,
      url,
    });
  }
}
