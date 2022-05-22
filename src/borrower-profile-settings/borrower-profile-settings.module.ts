import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerProfileSettingsService } from './borrower-profile-settings.service';
import { BorrowerProfileSettingsRepository } from './borrower-profile-settings.repository';
import { BorrowerProfileSettingsResolver } from './borrower-profile-settings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowerProfileSettingsRepository])],
  providers: [BorrowerProfileSettingsResolver, BorrowerProfileSettingsService]
})
export class BorrowerProfileSettingsModule { }
