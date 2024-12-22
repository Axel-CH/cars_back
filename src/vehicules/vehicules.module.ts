import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculesController } from './vehicules.controller';
import { VehiculesService } from './vehicules.service';
import { VehicleEntity } from './entities/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  controllers: [VehiculesController],
  providers: [VehiculesService],
})
export class VehiculesModule {}
