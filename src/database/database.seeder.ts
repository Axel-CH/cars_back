import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { VehicleSeedService } from '../vehicules/seed/seed.service';

@Injectable()
export class DatabaseSeeder implements OnApplicationBootstrap {
  constructor(private readonly vehicleSeedService: VehicleSeedService) {}

  async onApplicationBootstrap() {
    if (process.env.NODE_ENV !== 'production') {
      console.log('🌱 Seeding database...');
      await this.vehicleSeedService.seed();
      console.log('✅ Database seeded successfully');
    }
  }
} 