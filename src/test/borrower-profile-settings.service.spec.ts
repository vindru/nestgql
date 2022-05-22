import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BorrowerProfileSettingsRepository } from '../borrower-profile-settings/borrower-profile-settings.repository';
import { BorrowerProfileSettingsService } from '../borrower-profile-settings/borrower-profile-settings.service';

const mockBorrowerProfileSettingsRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockImplementation(user => Promise.resolve({ id: Date.now(), ...user })),
});

describe('BorrowerProfileSettingsService', () => {
  let borrowerProfileSettingsService: BorrowerProfileSettingsService;
  let borrowerProfileSettingsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BorrowerProfileSettingsService,
        { provide: BorrowerProfileSettingsRepository, useFactory: mockBorrowerProfileSettingsRepository },
      ],
    }).compile();

    borrowerProfileSettingsService = module.get(BorrowerProfileSettingsService);
    borrowerProfileSettingsRepository = module.get(BorrowerProfileSettingsRepository);
  });

  describe('create', () => {

    it('should create a new entity and returns a new entity if it already does not exist', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(null);

      const result = await borrowerProfileSettingsService.create(mockBorrowerProfileSettings);
      expect(result).toEqual({ ...mockBorrowerProfileSettings, id: expect.anything(), });
    });

    it('should returns existing entity if it already exists', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(null);

      const result = await borrowerProfileSettingsService.create(mockBorrowerProfileSettings);
      expect(result).toEqual({ ...mockBorrowerProfileSettings, id: expect.anything(), });
    });

  });

  describe('findByBorrowerId', () => {
    it('calls BorrowerProfileSettingsRepository.findOne and returns the result', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(mockBorrowerProfileSettings);

      const result = await borrowerProfileSettingsService.findByBorrowerId('someBorrowerId');
      expect(result).toEqual(mockBorrowerProfileSettings);
    });

    it('calls BorrowerProfileSettingsRepository.findOne and handles an exception', async () => {
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(null);

      expect(borrowerProfileSettingsService.findByBorrowerId('someId')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateAutoSaveByBorrowerId', () => {
    it('calls BorrowerProfileSettingsRepository.update and returns the result if entity exists', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };

      const updatedValue = {
        borrowerId: "someBorrowerId",
        autoSave: true
      };
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(mockBorrowerProfileSettings);

      const result = await borrowerProfileSettingsService.updateAutoSaveByBorrowerId('someBorrowerId', updatedValue);
      expect(result).toEqual({
        ...updatedValue,
        id: expect.anything(),
        updatedAt: expect.anything()
      });
    });

    it('calls BorrowerProfileSettingsRepository.update and handles an exception if entity does not exist', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(null);

      expect(borrowerProfileSettingsService.updateAutoSaveByBorrowerId('someBorrowerId', mockBorrowerProfileSettings)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
