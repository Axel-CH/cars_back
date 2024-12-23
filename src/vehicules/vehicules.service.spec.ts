import { Test, TestingModule } from '@nestjs/testing';
import { VehiculesService } from './vehicules.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicule.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InvalidUUIDException } from '../common/exceptions/invalid-uuid.exception';
import { VehiculeType, FuelType } from './types/vehicule.types';

describe('VehiculesService', () => {
  let service: VehiculesService;
  let repository: Repository<VehicleEntity>;

  const mockVehicle = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2023,
    type: VehiculeType.SEDAN,
    price: 25000,
    fuelType: FuelType.GASOLINE,
    transmission: 'Automatic',
    features: ['GPS', 'Bluetooth'],
    images: ['image1.jpg'],
    description: 'A reliable sedan',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[mockVehicle], 1]),
      getRawMany: jest.fn().mockResolvedValue([{ manufacturer: 'Toyota' }]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiculesService,
        {
          provide: getRepositoryToken(VehicleEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<VehiculesService>(VehiculesService);
    repository = module.get<Repository<VehicleEntity>>(getRepositoryToken(VehicleEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getVehicleDetails', () => {
    it('should return a vehicle when found', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockVehicle);
      const result = await service.getVehicleDetails(mockVehicle.id);
      expect(result).toEqual(mockVehicle);
    });

    it('should throw InvalidUUIDException for invalid UUID', async () => {
      await expect(service.getVehicleDetails('invalid-uuid')).rejects.toThrow(InvalidUUIDException);
    });

    it('should throw NotFoundException when vehicle is not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      const uuid = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      await expect(service.getVehicleDetails(uuid)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getManufacturers', () => {
    it('should return list of manufacturers', async () => {
      const result = await service.getManufacturers();
      expect(result).toEqual(['Toyota']);
    });
  });

  describe('getVehiculeTypes', () => {
    it('should return all vehicle types', () => {
      const result = service.getVehiculeTypes();
      expect(result).toEqual(Object.values(VehiculeType));
    });
  });

  describe('listVehicules', () => {
    it('should return paginated vehicles', async () => {
      const result = await service.listVehicules({ page: 1, limit: 10 });
      expect(result).toEqual({
        data: [mockVehicle],
        total: 1,
        page: 1,
        limit: 10,
      });
    });
  });
}); 