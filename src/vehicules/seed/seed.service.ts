import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../entities/vehicle.entity';
import { seedVehicles } from './seed.data';

@Injectable()
export class VehicleSeedService {
  private readonly logger = new Logger(VehicleSeedService.name);

  constructor(
    @InjectRepository(VehicleEntity)
    private vehiculeRepository: Repository<VehicleEntity>,
  ) {}

  async seed() {
    try {
      this.logger.log('Starting database seed...');
      
      const count = await this.vehiculeRepository.count();
      this.logger.log(`Current vehicle count: ${count}`);
      
      if (count === 0) {
        this.logger.log('Database is empty, starting seed process...');
        
        for (const vehicleData of seedVehicles) {
          try {
            const vehicle = this.vehiculeRepository.create({
              ...vehicleData,
              features: vehicleData.features || [],
              images: vehicleData.images || [],
            });
            await this.vehiculeRepository.save(vehicle);
            this.logger.log(`Seeded vehicle: ${vehicle.manufacturer} ${vehicle.model}`);
          } catch (error) {
            this.logger.error(`Error seeding vehicle ${vehicleData.manufacturer} ${vehicleData.model}:`, error);
          }
        }
        
        const newCount = await this.vehiculeRepository.count();
        this.logger.log(`Seeding complete. New vehicle count: ${newCount}`);
      } else {
        this.logger.log('Database already contains data, skipping seed');
      }
    } catch (error) {
      this.logger.error('Error in seed process:', error);
      throw error;
    }
  }
} 