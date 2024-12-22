import { Test, TestingModule } from '@nestjs/testing';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './vehicules.service';
import { Vehicle, VehiculeType, FuelType } from './types/vehicule.types';

describe('VehiculesController', () => {
  let controller: VehiculesController;
  let service: VehiculesService;

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

  const mockVehiculesService = {
    listVehicules: jest.fn().mockResolvedValue({ 
      data: [mockVehicle], 
      total: 1, 
      page: 1, 
      limit: 10 
    }),
    getVehicleDetails: jest.fn().mockResolvedValue(mockVehicle),
    getManufacturers: jest.fn().mockResolvedValue(['Toyota', 'Honda']),
    getVehiculeTypes: jest.fn().mockReturnValue(Object.values(VehiculeType))
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

  describe('listVehicules', () => {
    it('should return paginated vehicles', async () => {
      const result = await controller.listVehicules();
      expect(result.data).toEqual([mockVehicle]);
      expect(service.listVehicules).toHaveBeenCalledWith({ 
        page: 1, 
        limit: 10 
      });
    });
  });

  describe('getVehicleDetails', () => {
    it('should return a single vehicle', async () => {
      const uuid = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';
      const result = await controller.getVehicleDetails(uuid);
      expect(result).toEqual(mockVehicle);
      expect(service.getVehicleDetails).toHaveBeenCalledWith(uuid);
    });
  });

  describe('getManufacturers', () => {
    it('should return list of manufacturers', async () => {
      const result = await controller.getManufacturers();
      expect(result).toEqual(['Toyota', 'Honda']);
      expect(service.getManufacturers).toHaveBeenCalled();
    });
  });

  describe('getVehiculeTypes', () => {
    it('should return list of vehicle types', () => {
      const result = controller.getVehiculeTypes();
      expect(result).toEqual(Object.values(VehiculeType));
      expect(service.getVehiculeTypes).toHaveBeenCalled();
    });
  });
}); 