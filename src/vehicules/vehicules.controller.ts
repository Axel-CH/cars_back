import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { Vehicle, VehicleType } from './types/vehicle.types';

@Controller('vehicules')
export class VehiculesController {
  constructor(private readonly vehiculesService: VehiculesService) {}

  @Get('manufacturers')
  async getManufacturers(): Promise<string[]> {
    return this.vehiculesService.getManufacturers(); 
  }

  @Get('types')
  getVehicleTypes(): VehicleType[] {
    return this.vehiculesService.getVehicleTypes();
  }

  @Get(':id')
  getVehicleDetails(@Param('id') id: string): Promise<Vehicle | undefined> {
    return this.vehiculesService.getVehicleDetails(id);
  }

  @Get()
  listVehicules(
    @Query('manufacturer') manufacturer?: string,
    @Query('type') type?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    return this.vehiculesService.listVehicules({ manufacturer, type, page: +page, limit: +limit });
  }
}