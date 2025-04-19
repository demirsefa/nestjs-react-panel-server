import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { Localization } from './localization.entity';
import { BaseController } from '../../controllers/base.controller';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('localization')
export class LocalizationController extends BaseController<Localization> {
  constructor(private readonly localizationService: LocalizationService) {
    super(localizationService);
  }

  @Get('language')
  findByLanguage(@Query('language') language: string) {
    return this.localizationService.findByLanguage(language);
  }

  @Get('key')
  findByKey(@Query('key') key: string) {
    return this.localizationService.findByKey(key);
  }
} 