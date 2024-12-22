import { Test, TestingModule } from '@nestjs/testing';
import { VehiculesService } from './vehicules.service';
import { Vehicle } from './types/vehicule.types';
import { NotFoundException } from '@nestjs/common';
import { VehicleSeedService } from './seed/seed.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicule.entity';
import { Repository } from 'typeorm';

describe('VehiculesService', () => {
  let service: VehiculesService;
  let seedService: VehicleSeedService;

  const mockVehicle: Vehicle = {
    id: '1',
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 25000,
    mileage: 30000,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiculesService,
        VehicleSeedService,
        {
          provide: getRepositoryToken(VehicleEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VehiculesService>(VehiculesService);
    seedService = module.get<VehicleSeedService>(VehicleSeedService);

    // Seed the database before each test
    await seedService.seed();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const result = await service.listVehicules();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a vehicle by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockVehicle);
      const result = await service.findOne('1');
      expect(result).toEqual(mockVehicle);
    });

    it('should throw NotFoundException when vehicle is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());
      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a new vehicle', async () => {
      const newVehicle = {
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        price: 25000,
        mileage: 30000,
      };
      jest.spyOn(service, 'create').mockResolvedValue({ ...newVehicle, id: '1' });
      const result = await service.create(newVehicle);
      expect(result).toHaveProperty('id');
      expect(result.brand).toBe(newVehicle.brand);
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const updateVehicle = {
        year: 2021,
      };
      jest.spyOn(service, 'update').mockResolvedValue({ ...mockVehicle, ...updateVehicle });
      const result = await service.update('1', updateVehicle);
      expect(result.year).toBe(updateVehicle.year);
    });

    it('should throw NotFoundException when updating non-existent vehicle', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());
      await expect(service.update('999', { year: 2021 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue({ deleted: true });
      const result = await service.remove('1');
      expect(result).toEqual({ deleted: true });
    });

    it('should throw NotFoundException when removing non-existent vehicle', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
      await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
}); 