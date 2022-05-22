import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BorrowerProfileSettingsService } from './borrower-profile-settings.service';
import { BorrowerProfileSetting } from './borrower-profile-setting.entity';
import { CreateBorrowerProfileSettingsInput } from './dto/create-borrower-profile-settings.input';
import { UpdateBorrowerProfileSettingsInput } from './dto/update-borrower-profile-settings.input';

@Resolver(() => BorrowerProfileSetting)
export class BorrowerProfileSettingsResolver {
  constructor(private readonly borrowerProfileSettingsService: BorrowerProfileSettingsService) { }

  @Mutation(() => BorrowerProfileSetting)
  createBorrowerProfileSettings(@Args('createBorrowerProfileSettingsInput') createBorrowerProfileSettingsInput: CreateBorrowerProfileSettingsInput) {
    return this.borrowerProfileSettingsService.create(createBorrowerProfileSettingsInput);
  }

  @Query(() => BorrowerProfileSetting, { name: 'BorrowerProfileSettings' })
  findByBorrowerId(@Args('borrowerId', { type: () => String }) borrowerId: string) {
    return this.borrowerProfileSettingsService.findByBorrowerId(borrowerId);
  }

  @Mutation(() => BorrowerProfileSetting)
  updateBorrowerProfileSettings(@Args('updateBorrowerProfileSettingsInput') updateBorrowerProfileSettingsInput: UpdateBorrowerProfileSettingsInput) {
    return this.borrowerProfileSettingsService.updateAutoSaveByBorrowerId(updateBorrowerProfileSettingsInput.borrowerId, updateBorrowerProfileSettingsInput);
  }
}
