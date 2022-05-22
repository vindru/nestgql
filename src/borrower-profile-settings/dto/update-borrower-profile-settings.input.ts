import { CreateBorrowerProfileSettingsInput } from './create-borrower-profile-settings.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBorrowerProfileSettingsInput extends PartialType(CreateBorrowerProfileSettingsInput) { }
