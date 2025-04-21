import { Body, Controller, Get, NotFoundException, Param, Put, UseGuards } from '@nestjs/common';
import { LocalizationService } from './localization.service';
import { Localization } from './entities/localization.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DeepPartial } from 'typeorm';

@UseGuards(JwtAuthGuard)
@Controller('localizationAll')
export class LocalizationAllController {
  constructor(private readonly localizationService: LocalizationService) {}

  @Get(':language')
  async getOne(@Param('language') language: string): Promise<{ keys: Localization[],language:string }> {
    const item = await this.localizationService.findByLanguage(language);
    if (item === null) {
      throw new NotFoundException('Not Found');
    }
    return { keys: item,language:language };
  }

  @Put()
  async updateByKey(
    @Body() data: { keys: Localization[] }
  ): Promise<Localization[]> {
    return this.localizationService.updateByKey(data.keys);
  }
} 