import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowerProfileSetting } from './borrower-profile-setting.entity';
import { BorrowerProfileSettingsRepository } from './borrower-profile-settings.repository';
import { CreateBorrowerProfileSettingsInput } from './dto/create-borrower-profile-settings.input';
import { UpdateBorrowerProfileSettingsInput } from './dto/update-borrower-profile-settings.input';

@Injectable()
export class BorrowerProfileSettingsService {

  constructor(
    @InjectRepository(BorrowerProfileSettingsRepository)
    private borrowerProfileSettingsRepository: BorrowerProfileSettingsRepository) { }

  async create(createBorrowerProfileSettingsInput: CreateBorrowerProfileSettingsInput): Promise<BorrowerProfileSetting> {
    let borrowerProfileSetting: BorrowerProfileSetting = await this.borrowerProfileSettingsRepository.findOne({ borrowerId: createBorrowerProfileSettingsInput.borrowerId });
    if (!borrowerProfileSetting) {
      borrowerProfileSetting = this.borrowerProfileSettingsRepository.create(createBorrowerProfileSettingsInput);
      const now = new Date();
      borrowerProfileSetting.createdAt = now;
      borrowerProfileSetting.updatedAt = now;
      borrowerProfileSetting = await this.borrowerProfileSettingsRepository.save(borrowerProfileSetting);
    }
    return borrowerProfileSetting;
  }

  async findByBorrowerId(borrowerId: string): Promise<BorrowerProfileSetting> {
    const borrowerProfileSetting: BorrowerProfileSetting = await this.borrowerProfileSettingsRepository.findOne({ borrowerId: borrowerId });
    if (!borrowerProfileSetting) {
      throw new NotFoundException(`Profile settings with borrowerId ${borrowerId} not found!`);
    }
    return borrowerProfileSetting;
  }

  async updateAutoSaveByBorrowerId(borrowerId: string, updateBorrowerProfileSettingsInput: UpdateBorrowerProfileSettingsInput): Promise<BorrowerProfileSetting> {
    const borrowerProfileSetting: BorrowerProfileSetting = await this.findByBorrowerId(borrowerId);
    borrowerProfileSetting.autoSave = updateBorrowerProfileSettingsInput.autoSave;
    const now = new Date();
    borrowerProfileSetting.updatedAt = now;
    const updatedBorrowerProfileSetting = await this.borrowerProfileSettingsRepository.save(borrowerProfileSetting);
    return updatedBorrowerProfileSetting;
  }
}
