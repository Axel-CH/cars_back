import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './vehicules.service';
import { VehicleSeedService } from './seed/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  controllers: [VehiculesController],
  providers: [VehiculesService, VehicleSeedService],
})
export class VehiculesModule {}
