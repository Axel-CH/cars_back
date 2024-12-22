import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { Vehicle, VehicleType } from './types/vehicle.types';

@Injectable()
export class VehiculesService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehiclesRepository: Repository<VehicleEntity>,
  ) {}

  async listVehicules(filters: { manufacturer?: string; type?: string; page: number; limit: number }) {
    const { manufacturer, type, page, limit } = filters;
    
    const queryBuilder = this.vehiclesRepository.createQueryBuilder('vehicle');

    if (manufacturer) {
      queryBuilder.andWhere('vehicle.manufacturer = :manufacturer', { manufacturer });
    }

    if (type) {
      queryBuilder.andWhere('vehicle.type = :type', { type });
    }

    const [vehicles, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data: vehicles,
      total,
      page,
      limit,
    };
  }

  async getVehicleDetails(id: string): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return vehicle;
  }

  async getManufacturers(): Promise<string[]> {
    const manufacturers = await this.vehiclesRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.manufacturer', 'manufacturer')
      .getRawMany();
    
    return manufacturers.map(m => m.manufacturer);
  }

  getVehicleTypes(): VehicleType[] {
    return Object.values(VehicleType);
  }

  async create(vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = this.vehiclesRepository.create(vehicleData);
    return await this.vehiclesRepository.save(vehicle);
  }

  async update(id: string, vehicleData: Partial<Vehicle>): Promise<Vehicle> {
    const vehicle = await this.getVehicleDetails(id);
    Object.assign(vehicle, vehicleData);
    return await this.vehiclesRepository.save(vehicle);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const result = await this.vehiclesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    return { deleted: true };
  }
}