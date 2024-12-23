import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { VehicleEntity } from './entities/vehicule.entity';
import { VehiculeType } from './types/vehicule.types';

@ApiTags('vehicules')
@Controller('vehicules')
export class VehiculesController {
  constructor(private readonly vehiculesService: VehiculesService) {}

  @Get('types')
  @ApiOperation({ summary: 'Get all vehicle types' })
  @ApiResponse({ status: 200, description: 'Return all vehicle types.', type: [String] })
  getVehiculeTypes(): VehiculeType[] {
    return this.vehiculesService.getVehiculeTypes();
  }

  @Get('manufacturers')
  @ApiOperation({ summary: 'Get all manufacturers' })
  @ApiResponse({ status: 200, description: 'Return all manufacturers.', type: [String] })
  getManufacturers(): Promise<string[]> {
    return this.vehiculesService.getManufacturers();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({ status: 201, description: 'The vehicle has been successfully created.', type: VehicleEntity })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiculesService.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({ status: 200, description: 'Return all vehicles.', type: [VehicleEntity] })
  findAll() {
    return this.vehiculesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by id' })
  @ApiParam({ name: 'id', description: 'Vehicle ID' })
  @ApiResponse({ status: 200, description: 'Return the vehicle.', type: VehicleEntity })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  findOne(@Param('id') id: string) {
    return this.vehiculesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiParam({ name: 'id', description: 'Vehicle ID' })
  @ApiResponse({ status: 200, description: 'The vehicle has been successfully updated.', type: VehicleEntity })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehiculesService.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiParam({ name: 'id', description: 'Vehicle ID' })
  @ApiResponse({ status: 200, description: 'The vehicle has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  remove(@Param('id') id: string) {
    return this.vehiculesService.remove(id);
  }
}