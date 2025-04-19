import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localization } from './localization.entity';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Localization]), AuthModule],
  providers: [LocalizationService],
  controllers: [LocalizationController],
  exports: [LocalizationService],
})
export class LocalizationModule {} 