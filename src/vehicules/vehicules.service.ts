import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehiculeType } from './types/vehicule.types';

interface QueryOptions {
  filters: {
    manufacturer?: string;
    type?: string;
    year?: number;
  };
  sort: {
    field?: 'price' | 'year';
    order?: 'ASC' | 'DESC';
  };
  pagination: {
    page: number;
    limit: number;
  };
}

@Injectable()
export class VehiculesService {
  constructor(
    @InjectRepository(VehicleEntity)
    private vehiculesRepository: Repository<VehicleEntity>,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    const vehicle = this.vehiculesRepository.create(createVehicleDto);
    return this.vehiculesRepository.save(vehicle);
  }

  async findAll(options: QueryOptions) {
    const query = this.vehiculesRepository.createQueryBuilder('vehicle');

    // Apply filters
    if (options.filters.manufacturer) {
      query.andWhere('vehicle.manufacturer = :manufacturer', {
        manufacturer: options.filters.manufacturer,
      });
    }

    if (options.filters.type) {
      query.andWhere('vehicle.type = :type', {
        type: options.filters.type,
      });
    }

    if (options.filters.year) {
      query.andWhere('vehicle.year = :year', {
        year: options.filters.year,
      });
    }

    // Apply sorting
    if (options.sort.field) {
      query.orderBy(`vehicle.${options.sort.field}`, options.sort.order || 'ASC');
    }

    // Apply pagination
    const skip = (options.pagination.page - 1) * options.pagination.limit;
    query.skip(skip).take(options.pagination.limit);

    // Get total count for pagination
    const [items, total] = await query.getManyAndCount();

    return {
      items,
      meta: {
        total,
        page: options.pagination.page,
        limit: options.pagination.limit,
        totalPages: Math.ceil(total / options.pagination.limit),
      },
    };
  }

  findOne(id: string) {
    return this.vehiculesRepository.findOneBy({ id });
  }

  update(id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.vehiculesRepository.update(id, updateVehicleDto);
  }

  remove(id: string) {
    return this.vehiculesRepository.delete(id);
  }

  getVehiculeTypes(): VehiculeType[] {
    return Object.values(VehiculeType);
  }

  async getManufacturers(): Promise<string[]> {
    const manufacturers = await this.vehiculesRepository
      .createQueryBuilder('vehicle')
      .select('DISTINCT vehicle.manufacturer', 'manufacturer')
      .getRawMany();
    
    return manufacturers.map(m => m.manufacturer);
  }
}