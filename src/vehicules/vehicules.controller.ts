import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';

@Controller('vehicules')
export class VehiculesController {
  constructor(private readonly vehiculesService: VehiculesService) {}

  @Get('manufacturers')
  getManufacturers() {
    return this.vehiculesService.getManufacturers(); 
  }

  @Get('types')
  getVehicleTypes() {
    return this.vehiculesService.getVehicleTypes();
  }

  @Get(':id')
  getVehicleDetails(@Param('id') id: string) {
    return this.vehiculesService.getVehicleDetails(id);
  }

  @Get()
  listVehicules(@Query('manufacturer') manufacturer?: string, @Query('type') type?: string, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.vehiculesService.listVehicules({ manufacturer, type, page, limit });
  }
}