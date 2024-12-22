import { Test, TestingModule } from '@nestjs/testing';
import { VehiculesService } from './vehicules.service';
import { Vehicle, VehiculeType, FuelType } from './types/vehicule.types';
import { NotFoundException } from '@nestjs/common';
import { VehicleSeedService } from './seed/seed.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicule.entity';
import { Repository } from 'typeorm';

describe('VehiculesService', () => {
  let service: VehiculesService;
  let seedService: VehicleSeedService;

  const mockVehicle: Vehicle = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    manufacturer: 'Toyota',
    model: 'RAV4',
    year: 2023,
    type: VehiculeType.SUV,
    price: 32000.00,
    fuelType: FuelType.HYBRID,
    transmission: 'Automatic',
    mileage: 0,
    features: ['Bluetooth', 'Backup Camera'],
    images: ['rav4-front.jpg'],
    description: 'New Toyota RAV4',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiculesService,
        VehicleSeedService,
        {
          provide: getRepositoryToken(VehicleEntity),
          useValue: {
            createQueryBuilder: jest.fn(() => ({
              andWhere: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              take: jest.fn().mockReturnThis(),
              getManyAndCount: jest.fn().mockResolvedValue([[mockVehicle], 1]),
              select: jest.fn().mockReturnThis(),
              getRawMany: jest.fn().mockResolvedValue([{ manufacturer: 'Toyota' }])
            })),
            findOne: jest.fn().mockResolvedValue(mockVehicle)
          }
        },
      ],
    }).compile();

    service = module.get<VehiculesService>(VehiculesService);
    seedService = module.get<VehicleSeedService>(VehicleSeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listVehicules', () => {
    it('should return paginated vehicles', async () => {
      const result = await service.listVehicules({ page: 1, limit: 10 });
      expect(result.data).toEqual([mockVehicle]);
      expect(result.total).toBe(1);
    });
  });

  describe('getVehicleDetails', () => {
    it('should return a vehicle by id', async () => {
      const uuid = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      const result = await service.getVehicleDetails(uuid);
      expect(result).toEqual(mockVehicle);
    });

    it('should throw NotFoundException when vehicle is not found', async () => {
      jest.spyOn(service['vehiclesRepository'], 'findOne').mockResolvedValue(null);
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
    it('should return list of vehicle types', () => {
      const result = service.getVehiculeTypes();
      expect(result).toEqual(Object.values(VehiculeType));
    });
  });
}); 