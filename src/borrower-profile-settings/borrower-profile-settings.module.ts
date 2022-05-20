import { Module } from '@nestjs/common';
import { BorrowerProfileSettingsService } from './borrower-profile-settings.service';
import { BorrowerProfileSettingsController } from './borrower-profile-settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerProfileSettingsRepository } from './borrower-profile-settings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowerProfileSettingsRepository])],
  controllers: [BorrowerProfileSettingsController],
  providers: [BorrowerProfileSettingsService]
})
export class BorrowerProfileSettingsModule { }
