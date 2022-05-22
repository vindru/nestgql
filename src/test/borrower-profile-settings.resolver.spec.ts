import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BorrowerProfileSettingsRepository } from '../borrower-profile-settings/borrower-profile-settings.repository';
import { BorrowerProfileSettingsResolver } from '../borrower-profile-settings/borrower-profile-settings.resolver';
import { BorrowerProfileSettingsService } from '../borrower-profile-settings/borrower-profile-settings.service';

const mockBorrowerProfileSettingsRepository = () => ({
  findOne: jest.fn(),
  create: jest.fn().mockImplementation(dto => dto),
  save: jest.fn().mockImplementation(user => Promise.resolve({ id: Date.now(), ...user })),
});

describe('BorrowerProfileSettingsResolver', () => {
  let resolver: BorrowerProfileSettingsResolver;
  let borrowerProfileSettingsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BorrowerProfileSettingsResolver, BorrowerProfileSettingsService, { provide: BorrowerProfileSettingsRepository, useFactory: mockBorrowerProfileSettingsRepository },],
    }).compile();

    resolver = module.get<BorrowerProfileSettingsResolver>(BorrowerProfileSettingsResolver);
    borrowerProfileSettingsRepository = module.get(BorrowerProfileSettingsRepository);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createBorrowerProfileSettings', () => {
    it('should create new entity', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };

      const result = await resolver.createBorrowerProfileSettings(
        mockBorrowerProfileSettings
      );
      expect(result).toEqual({ ...mockBorrowerProfileSettings, id: expect.anything(), });
    })

    it('should returns existing entity if it already exists', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(null);

      const result = await resolver.createBorrowerProfileSettings(mockBorrowerProfileSettings);
      expect(result).toEqual({ ...mockBorrowerProfileSettings, id: expect.anything(), });
    });
  })

  describe('findByBorrowerId', () => {
    it('should find existing entity', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };

      borrowerProfileSettingsRepository.findOne.mockResolvedValue(mockBorrowerProfileSettings);

      const result = await resolver.findByBorrowerId(
        "someBorrowerId"
      );
      expect(result).toEqual(mockBorrowerProfileSettings);
    })

    it('should throw exception if entity is not found', async () => {
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(null);

      expect(resolver.findByBorrowerId("someBorrowerId")).rejects.toThrow(
        NotFoundException,
      );
    })
  })

  describe('updateBorrowerProfileSettings', () => {
    it('should update the entity if entity exists', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };

      const updatedValue = {
        borrowerId: "someBorrowerId",
        autoSave: true
      };
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(mockBorrowerProfileSettings);

      const result = await resolver.updateBorrowerProfileSettings(updatedValue);
      expect(result).toEqual({
        ...updatedValue,
        id: expect.anything(),
        updatedAt: expect.anything()
      });
    });

    it('should handle exception if the entity do not exists', async () => {
      const mockBorrowerProfileSettings = {
        borrowerId: "someBorrowerId",
        autoSave: false
      };
      borrowerProfileSettingsRepository.findOne.mockResolvedValue(null);

      expect(resolver.updateBorrowerProfileSettings(mockBorrowerProfileSettings)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
