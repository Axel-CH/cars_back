import { Test, TestingModule } from '@nestjs/testing';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './vehicules.service';
import { Vehicle } from './types/vehicle.types';

describe('VehiculesController', () => {
  let controller: VehiculesController;
  let service: VehiculesService;

  const mockVehicle: Vehicle = {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 25000,
    mileage: 30000,
  };

  const mockVehiculesService = {
    findAll: jest.fn().mockResolvedValue([mockVehicle]),
    findOne: jest.fn().mockResolvedValue(mockVehicle),
    create: jest.fn().mockResolvedValue(mockVehicle),
    update: jest.fn().mockResolvedValue(mockVehicle),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiculesController],
      providers: [
        {
          provide: VehiculesService,
          useValue: mockVehiculesService,
        },
      ],
    }).compile();

    controller = module.get<VehiculesController>(VehiculesController);
    service = module.get<VehiculesService>(VehiculesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vehicles', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockVehicle]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single vehicle', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockVehicle);
      expect(service.findOne).toHaveBeenCalledWith('1');
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
      const result = await controller.create(newVehicle);
      expect(result).toEqual(mockVehicle);
      expect(service.create).toHaveBeenCalledWith(newVehicle);
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const updateVehicle = {
        brand: 'Toyota',
        model: 'Camry',
        year: 2021,
      };
      const result = await controller.update('1', updateVehicle);
      expect(result).toEqual(mockVehicle);
      expect(service.update).toHaveBeenCalledWith('1', updateVehicle);
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
}); 