import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './vehicules.service';
import { VehicleEntity } from './entities/vehicule.entity';
import { VehicleSeedService } from './seed/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  controllers: [VehiculesController],
  providers: [VehiculesService, VehicleSeedService],
  exports: [VehicleSeedService],
})
export class VehiculesModule {}
