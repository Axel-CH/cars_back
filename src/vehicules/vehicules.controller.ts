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
  @ApiOperation({ summary: 'Get all vehicles with filtering, sorting, and pagination' })
  @ApiResponse({ status: 200, description: 'Return filtered, sorted and paginated vehicles.', type: [VehicleEntity] })
  @ApiQuery({ name: 'manufacturer', required: false, description: 'Filter by manufacturer' })
  @ApiQuery({ name: 'type', required: false, description: 'Filter by vehicle type' })
  @ApiQuery({ name: 'year', required: false, description: 'Filter by year' })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['price', 'year'], description: 'Sort by field' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], description: 'Sort order' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 10)' })
  findAll(
    @Query('manufacturer') manufacturer?: string,
    @Query('type') type?: string,
    @Query('year') year?: number,
    @Query('sortBy') sortBy?: 'price' | 'year',
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.vehiculesService.findAll({
      filters: {
        manufacturer,
        type,
        year: year ? Number(year) : undefined,
      },
      sort: {
        field: sortBy,
        order: sortOrder,
      },
      pagination: {
        page: Number(page),
        limit: Number(limit),
      },
    });
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