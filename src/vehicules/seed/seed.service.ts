import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../entities/vehicule.entity';
import { seedVehicles } from './seed.data';

@Injectable()
export class VehicleSeedService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehiclesRepository: Repository<VehicleEntity>,
  ) {}

  async seed(): Promise<void> {
    await this.vehiclesRepository.clear();
    const vehicles = seedVehicles.map(vehicle => 
      this.vehiclesRepository.create(vehicle)
    );
    await this.vehiclesRepository.save(vehicles);
  }
} 