import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleSeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { VehicleEntity } from '../entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  providers: [VehicleSeedService],
  controllers: [SeedController],
  exports: [VehicleSeedService],
})
export class SeedModule {} 