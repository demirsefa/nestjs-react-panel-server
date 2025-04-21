import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localization } from './entities/localization.entity';
import { Translation } from './entities/Translation.entity';
import { LocalizationService } from './localization.service';
import { LocalizationController } from './localization.controller';
import { LocalizationAllController } from './localizationAllController';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Localization, Translation]), AuthModule],
  providers: [LocalizationService],
  controllers: [LocalizationController, LocalizationAllController],
  exports: [LocalizationService],
})
export class LocalizationModule {}
