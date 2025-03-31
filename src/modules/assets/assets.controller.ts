import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetsService } from './assets.service';
import { Asset } from './assets.entity';
import { BaseController } from '../../controllers/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { DeepPartial } from 'typeorm';

@Controller('assets')
export class AssetsController extends BaseController<Asset> {
  constructor(private readonly assetsService: AssetsService) {
    super(assetsService);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          const filename = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: DeepPartial<Asset>,
  ): Promise<Asset> {
    return this.assetsService.createAssets(file, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          const filename = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async updateFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: DeepPartial<Asset>,
  ): Promise<Asset> {
    return this.assetsService.updateAssets(id, file, data);
  }
}
