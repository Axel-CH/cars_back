import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { VehiculesService } from './vehicules.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { VehicleEntity } from './entities/vehicule.entity';
import { VehiculeType } from './types/vehicule.types';

class PaginatedVehicleResponse {
  items: VehicleEntity[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

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
  @ApiOperation({
    summary: 'Get all vehicles with filtering, sorting, and pagination',
    description: `
    Retrieve a list of vehicles with optional filtering, sorting, and pagination.
    
    Examples:
    - Filter by manufacturer: /vehicules?manufacturer=Toyota
    - Filter by type and year: /vehicules?type=SEDAN&year=2023
    - Sort by price descending: /vehicules?sortBy=price&sortOrder=DESC
    - Paginate results: /vehicules?page=1&limit=10
    
    All parameters are optional and can be combined.
    `
  })
  @ApiResponse({
    status: 200,
    description: 'Return filtered, sorted and paginated vehicles.',
    type: PaginatedVehicleResponse
  })
  @ApiQuery({
    name: 'manufacturer',
    required: false,
    description: 'Filter vehicles by manufacturer name',
    example: 'Toyota'
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filter vehicles by type',
    enum: VehiculeType,
    example: VehiculeType.SEDAN
  })
  @ApiQuery({
    name: 'year',
    required: false,
    description: 'Filter vehicles by manufacturing year',
    type: Number,
    example: 2023
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Field to sort by',
    enum: ['price', 'year'],
    example: 'price'
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sort order (ascending or descending)',
    enum: ['ASC', 'DESC'],
    example: 'DESC'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number for pagination',
    type: Number,
    example: 1,
    minimum: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
    example: 10,
    minimum: 1,
    maximum: 100
  })
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