import { Test, TestingModule } from '@nestjs/testing';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './vehicules.service';
import { VehiculeType, FuelType } from './types/vehicule.types';
import { NotFoundException } from '@nestjs/common';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

describe('VehiculesController', () => {
  let controller: VehiculesController;
  let service: VehiculesService;

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

  const mockVehiculesService = {
    findAll: jest.fn().mockResolvedValue([mockVehicle]),
    findOne: jest.fn().mockResolvedValue(mockVehicle),
    create: jest.fn().mockResolvedValue(mockVehicle),
    update: jest.fn().mockResolvedValue(mockVehicle),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
    getManufacturers: jest.fn().mockResolvedValue(['Toyota']),
    getVehiculeTypes: jest.fn().mockReturnValue(Object.values(VehiculeType)),
    listVehicules: jest.fn().mockResolvedValue({
      data: [mockVehicle],
      total: 1,
      page: 1,
      limit: 10,
    }),
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
    it('should return a vehicle by id', async () => {
      const result = await controller.findOne(mockVehicle.id);
      expect(result).toEqual(mockVehicle);
      expect(service.findOne).toHaveBeenCalledWith(mockVehicle.id);
    });
  });

  describe('create', () => {
    it('should create a new vehicle', async () => {
      const createVehicleDto = {
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
      };

      const result = await controller.create(createVehicleDto);
      expect(result).toEqual(mockVehicle);
      expect(service.create).toHaveBeenCalledWith(createVehicleDto);
    });
  });

  describe('update', () => {
    it('should update a vehicle', async () => {
      const updateVehicleDto: UpdateVehicleDto = {
        manufacturer: 'Toyota',
        model: 'Camry',
        year: 2023,
        type: VehiculeType.SEDAN,
        price: 26000,
        fuelType: FuelType.GASOLINE,
        transmission: 'Automatic',
        features: ['GPS', 'Bluetooth'],
        images: ['image1.jpg'],
        description: 'An updated reliable sedan',
      };

      const result = await controller.update(mockVehicle.id, updateVehicleDto);
      expect(result).toEqual(mockVehicle);
      expect(service.update).toHaveBeenCalledWith(mockVehicle.id, updateVehicleDto);
    });

    it('should update a vehicle with partial data', async () => {
      const partialUpdateDto: UpdateVehicleDto = {
        price: 26000,
      };

      const result = await controller.update(mockVehicle.id, partialUpdateDto);
      expect(result).toEqual(mockVehicle);
      expect(service.update).toHaveBeenCalledWith(mockVehicle.id, partialUpdateDto);
    });
  });

  describe('remove', () => {
    it('should remove a vehicle', async () => {
      const result = await controller.remove(mockVehicle.id);
      expect(result).toEqual({ deleted: true });
      expect(service.remove).toHaveBeenCalledWith(mockVehicle.id);
    });
  });

  describe('getManufacturers', () => {
    it('should return list of manufacturers', async () => {
      const result = await controller.getManufacturers();
      expect(result).toEqual(['Toyota']);
      expect(service.getManufacturers).toHaveBeenCalled();
    });
  });

  describe('getVehiculeTypes', () => {
    it('should return all vehicle types', () => {
      const result = controller.getVehiculeTypes();
      expect(result).toEqual(Object.values(VehiculeType));
      expect(service.getVehiculeTypes).toHaveBeenCalled();
    });
  });
}); 