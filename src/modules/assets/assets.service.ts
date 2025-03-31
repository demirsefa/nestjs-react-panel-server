import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from './assets.entity';
import { BaseService } from '../../providers/base.service';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { DeepPartial } from 'typeorm';

@Injectable()
export class AssetsService extends BaseService<Asset> {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {
    super(assetRepository);
  }

  async createAssets(file: Express.Multer.File, data: DeepPartial<Asset>): Promise<Asset> {
    const filename = `${uuidv4()}${extname(file.originalname)}`;
    return super.create({
      ...data,
      filename,
    });
  }

  async updateAssets(id: number, file: Express.Multer.File, data: DeepPartial<Asset>): Promise<Asset> {
    const filename = `${uuidv4()}${extname(file.originalname)}`;
    const asset = await this.findOne(id);
    return super.update(id, {
      ...data,
      filename,
    });
  }
} 