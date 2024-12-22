import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsArray, IsOptional } from 'class-validator';
import { VehiculeType, FuelType } from '../types/vehicule.types';

export class CreateVehicleDto {
  @ApiProperty({ description: 'Vehicle manufacturer' })
  @IsString()
  manufacturer: string;

  @ApiProperty({ description: 'Vehicle model' })
  @IsString()
  model: string;

  @ApiProperty({ description: 'Manufacturing year' })
  @IsNumber()
  year: number;

  @ApiProperty({ enum: VehiculeType, description: 'Type of vehicle' })
  @IsEnum(VehiculeType)
  type: VehiculeType;

  @ApiProperty({ description: 'Vehicle price' })
  @IsNumber()
  price: number;

  @ApiProperty({ enum: FuelType, description: 'Type of fuel' })
  @IsEnum(FuelType)
  fuelType: FuelType;

  @ApiProperty({ description: 'Transmission type' })
  @IsString()
  transmission: string;

  @ApiProperty({ required: false, description: 'Vehicle mileage' })
  @IsOptional()
  @IsNumber()
  mileage?: number;

  @ApiProperty({ type: [String], description: 'Vehicle features' })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty({ type: [String], description: 'Vehicle images URLs' })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ description: 'Vehicle description' })
  @IsString()
  description: string;
} 