import { IsNotEmpty } from 'class-validator';

export class UpdateParamBorrowerProfileSettingsDto {
  @IsNotEmpty()
  borrowerId: string;
}
