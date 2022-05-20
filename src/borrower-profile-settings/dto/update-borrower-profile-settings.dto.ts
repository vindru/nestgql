import { PartialType } from '@nestjs/mapped-types';
import { CreateBorrowerProfileSettingsDto } from './create-borrower-profile-settings.dto';

export class UpdateBorrowerProfileSettingsDto extends PartialType(CreateBorrowerProfileSettingsDto) { }
