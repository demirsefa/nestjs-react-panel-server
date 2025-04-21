import { Controller, UseGuards, Body, Param, Put, Post } from '@nestjs/common';
import { LanguageService } from './language.service';
import { BaseController } from '../../controllers/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LanguageEntity } from './entities/language.entity';
import { DeepPartial } from 'typeorm';

@UseGuards(JwtAuthGuard)
@Controller('languages')
export class LanguageController extends BaseController<LanguageEntity> {
  constructor(private readonly languageService: LanguageService) {
    super(languageService);
  }

  @Post()
  override async create(@Body() data: DeepPartial<LanguageEntity>): Promise<LanguageEntity> {
    return super.create(data);
  }

  @Put(':id')
  override async update(
    @Param('id') id: string | number,
    @Body() data: DeepPartial<LanguageEntity>,
  ): Promise<LanguageEntity> {
    return super.update(id, data);
  }
} 