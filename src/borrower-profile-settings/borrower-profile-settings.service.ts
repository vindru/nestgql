import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BorrowerProfileSetting } from './borrower-profile-setting.entity';
import { BorrowerProfileSettingsRepository } from './borrower-profile-settings.repository';
import { CreateBorrowerProfileSettingsDto } from './dto/create-borrower-profile-settings.dto';
import { UpdateBorrowerProfileSettingsDto } from './dto/update-borrower-profile-settings.dto';

@Injectable()
export class BorrowerProfileSettingsService {

  constructor(
    @InjectRepository(BorrowerProfileSettingsRepository)
    private borrowerProfileSettingsRepository: BorrowerProfileSettingsRepository) { }

  async create(createBorrowerProfileSettingsDto: CreateBorrowerProfileSettingsDto): Promise<BorrowerProfileSetting> {
    let borrowerProfileSetting: BorrowerProfileSetting = await this.borrowerProfileSettingsRepository.findOne({ borrowerId: createBorrowerProfileSettingsDto.borrowerId });
    if (!borrowerProfileSetting) {
      borrowerProfileSetting = this.borrowerProfileSettingsRepository.create(createBorrowerProfileSettingsDto);
      const now = new Date();
      borrowerProfileSetting.createdAt = now;
      borrowerProfileSetting.updatedAt = now;
      await this.borrowerProfileSettingsRepository.save(borrowerProfileSetting);
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

  async updateAutoSaveByBorrowerId(borrowerId: string, updateBorrowerProfileSettingsDto: UpdateBorrowerProfileSettingsDto): Promise<BorrowerProfileSetting> {
    const borrowerProfileSetting: BorrowerProfileSetting = await this.findByBorrowerId(borrowerId);
    borrowerProfileSetting.autoSave = updateBorrowerProfileSettingsDto.autoSave;
    const now = new Date();
    borrowerProfileSetting.updatedAt = now;
    const updatedBorrowerProfileSetting = await this.borrowerProfileSettingsRepository.save(borrowerProfileSetting);
    return updatedBorrowerProfileSetting;
  }
}
