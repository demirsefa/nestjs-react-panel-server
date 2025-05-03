import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { Localization } from './entities/localization.entity';
import { BaseController } from '../../controllers/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('localization')
export class LocalizationController extends BaseController<Localization> {
  constructor(private readonly localizationService: LocalizationService) {
    super(localizationService);
  }

  @Get()
  async getAllFiltered(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('language') language: string="tr",
  ) {
    const skip = (page - 1) * limit;
    return this.localizationService.findAll({ skip, limit, language });
  }
} 