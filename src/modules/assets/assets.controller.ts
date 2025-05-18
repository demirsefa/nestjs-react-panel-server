import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetsService } from './assets.service';
import { AssetEntity } from './assets.entity';
import { BaseController } from '../../controllers/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { format } from 'date-fns';
import { DeepPartial } from 'typeorm';
import * as fs from 'fs';

@Controller('assets')
@UseGuards(JwtAuthGuard)
export class AssetsController extends BaseController<AssetEntity> {
  constructor(private readonly assetsService: AssetsService) {
    super(assetsService);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          console.log(file);
          const timestamp = format(new Date(), 'yyyy.MM.dd.HH.mm');
          const filename = `${timestamp}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        console.log(file);
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: DeepPartial<AssetEntity>,
  ): Promise<AssetEntity> {
    return this.assetsService.createAssets(file, data);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const timestamp = format(new Date(), 'yyyy.MM.dd.HH.mm');
          const filename = `${timestamp}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  )
  async updateFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: DeepPartial<AssetEntity>,
  ): Promise<AssetEntity> {
    return this.assetsService.updateAssets(id, file, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    // Get the asset details before deletion
    const asset = await this.assetsService.findOne(id);
    if (asset && asset.filename) {
      // Construct the full path to the file
      const filePath = join(process.cwd(), 'uploads', asset.filename);

      // Delete the physical file if it exists
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete the database record
    await this.assetsService.delete(id);
  }
}
