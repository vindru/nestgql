import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BorrowerProfileSetting } from './borrower-profile-setting.entity';
import { BorrowerProfileSettingsService } from './borrower-profile-settings.service';
import { CreateBorrowerProfileSettingsDto } from './dto/create-borrower-profile-settings.dto';
import { FindOneParamBorrowerProfileSettingsDto } from './dto/find-one-param-borrower-profile-settings.dto';
import { UpdateBorrowerProfileSettingsDto } from './dto/update-borrower-profile-settings.dto';
import { UpdateParamBorrowerProfileSettingsDto } from './dto/update-param-borrower-profile-settings.dto';

@Controller('borrower-profile-settings')
export class BorrowerProfileSettingsController {
  constructor(private readonly borrowerProfileSettingsService: BorrowerProfileSettingsService) { }

  @Post()
  create(@Body() createBorrowerProfileSettingsDto: CreateBorrowerProfileSettingsDto): Promise<BorrowerProfileSetting> {
    return this.borrowerProfileSettingsService.create(createBorrowerProfileSettingsDto);
  }

  @Get(':borrowerId')
  findByBorrowerId(@Param() params: FindOneParamBorrowerProfileSettingsDto): Promise<BorrowerProfileSetting> {
    return this.borrowerProfileSettingsService.findByBorrowerId(params.borrowerId);
  }

  @Put(':borrowerId')
  update(@Param() params: UpdateParamBorrowerProfileSettingsDto, @Body() updateBorrowerProfileSettingsDto: UpdateBorrowerProfileSettingsDto): Promise<BorrowerProfileSetting> {
    return this.borrowerProfileSettingsService.updateAutoSaveByBorrowerId(params.borrowerId, updateBorrowerProfileSettingsDto);
  }
}
