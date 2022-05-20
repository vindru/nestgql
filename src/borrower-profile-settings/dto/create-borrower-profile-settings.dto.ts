import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateBorrowerProfileSettingsDto {
	@IsNotEmpty()
	borrowerId: string;

	@IsBoolean()
	@IsNotEmpty()
	autoSave: boolean;
}
