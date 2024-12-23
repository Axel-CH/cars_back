import { Controller, Post } from '@nestjs/common';
import { VehicleSeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: VehicleSeedService) {}

  @Post()
  async seed() {
    return await this.seedService.seed();
  }
} 