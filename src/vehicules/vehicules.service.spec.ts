import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculesService } from './vehicules.service';
import { VehicleEntity } from './entities/vehicle.entity';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { VehiculeType, FuelType } from './types/vehicule.types';

describe('VehiculesService', () => {
  let service: VehiculesService;
  let repository: Repository<VehicleEntity>;

  const mockVehicle: VehicleEntity = {
    id: uuid(),
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2023,
    type: VehiculeType.SEDAN,
    price: 25000,
    fuelType: FuelType.GASOLINE,
    transmission: 'AUTOMATIC',
    mileage: 0,
    features: ['GPS', 'Bluetooth'],
    images: ['image1.jpg'],
    description: 'A reliable sedan',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn().mockReturnValue(mockVehicle),
    save: jest.fn().mockResolvedValue(mockVehicle),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[mockVehicle], 1]),
      select: jest.fn().mockReturnThis(),
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

  describe('findAll', () => {
    it('should return paginated results with filters and sorting', async () => {
      const options = {
        filters: {
          manufacturer: 'Toyota',
          type: VehiculeType.SEDAN,
          year: 2023,
        },
        sort: {
          field: 'price' as const,
          order: 'ASC' as const,
        },
        pagination: {
          page: 1,
          limit: 10,
        },
      };

      const result = await service.findAll(options);

      expect(result).toEqual({
        items: [mockVehicle],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a vehicle when found', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockVehicle);
      const result = await service.findOne(mockVehicle.id);
      expect(result).toEqual(mockVehicle);
    });

    it('should return null when vehicle not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      const result = await service.findOne(uuid());
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new vehicle', async () => {
      const createDto = {
        manufacturer: 'Toyota',
        model: 'Camry',
        year: 2023,
        type: VehiculeType.SEDAN,
        price: 25000,
        fuelType: FuelType.GASOLINE,
        transmission: 'AUTOMATIC',
        features: ['GPS', 'Bluetooth'],
        images: ['image1.jpg'],
        description: 'A reliable sedan',
      };

      const result = await service.create(createDto);
      expect(result).toEqual(mockVehicle);
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const updateDto = { price: 26000 };
      mockRepository.update.mockResolvedValue({ affected: 1 });
      
      await service.update(mockVehicle.id, updateDto);
      
      expect(repository.update).toHaveBeenCalledWith(mockVehicle.id, updateDto);
    });
  });

  describe('remove', () => {
    it('should delete a vehicle', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });
      
      await service.remove(mockVehicle.id);
      
      expect(repository.delete).toHaveBeenCalledWith(mockVehicle.id);
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
}); 