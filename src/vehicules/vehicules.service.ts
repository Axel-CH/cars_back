import { Injectable } from '@nestjs/common';
import { Vehicle, VehicleType, FuelType } from './types/vehicle.types';

@Injectable()
export class VehiculesService {
  private vehicles: Vehicle[] = [
    {
      id: '1',
      manufacturer: 'Toyota',
      model: 'RAV4',
      year: 2023,
      type: VehicleType.SUV,
      price: 32000,
      fuelType: FuelType.HYBRID,
      transmission: 'Automatic',
      mileage: 0,
      features: ['Backup Camera', 'Bluetooth', 'Navigation'],
      images: ['rav4-1.jpg', 'rav4-2.jpg'],
      description: 'Brand new Toyota RAV4 Hybrid',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      manufacturer: 'Tesla',
      model: 'Model 3',
      year: 2023,
      type: VehicleType.ELECTRIC,
      price: 45000,
      fuelType: FuelType.ELECTRIC,
      transmission: 'Automatic',
      features: ['Autopilot', 'Premium Sound', 'Glass Roof'],
      images: ['model3-1.jpg', 'model3-2.jpg'],
      description: 'Tesla Model 3 Long Range',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  listVehicules(filters: { manufacturer?: string; type?: string; page: number; limit: number }) {
    const { manufacturer, type, page, limit } = filters;
    let filteredVehicules = this.vehicles;

    if (manufacturer) {
      filteredVehicules = filteredVehicules.filter(vehicle => vehicle.manufacturer === manufacturer);
    }

    if (type) {
      filteredVehicules = filteredVehicules.filter(vehicle => vehicle.type === type);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: filteredVehicules.slice(startIndex, endIndex),
      total: filteredVehicules.length,
      page,
      limit,
    };
  }

  getVehicleDetails(id: string): Vehicle | undefined {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  getManufacturers(): string[] {
    const manufacturers = this.vehicles.map(vehicle => vehicle.manufacturer);
    return Array.from(new Set(manufacturers));
  }

  getVehicleTypes(): VehicleType[] {
    return Object.values(VehicleType);
  }
}