import { Injectable } from '@nestjs/common';

@Injectable()
export class VehiculesService {
  private Vehicules = [
    { id: '1', name: 'Car A', manufacturer: 'Toyota', type: 'SUV' },
    { id: '2', name: 'Car B', manufacturer: 'Ford', type: 'Sedan' },
    { id: '3', name: 'Car C', manufacturer: 'Tesla', type: 'Electric' },
  ];

  listVehicules(filters: { manufacturer?: string; type?: string; page: number; limit: number }) {
    const { manufacturer, type, page, limit } = filters;
    let filteredVehicules = this.Vehicules;

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

  getVehicleDetails(id: string) {
    return this.Vehicules.find(vehicle => vehicle.id === id);
  }

  getManufacturers() {
    const manufacturers = this.Vehicules.map(vehicle => vehicle.manufacturer);
    return Array.from(new Set(manufacturers));
  }

  getVehicleTypes() {
    const types = this.Vehicules.map(vehicle => vehicle.type);
    return Array.from(new Set(types));
  }
}