import { ApiProperty } from '@nestjs/swagger';

export type UUID = string;

export enum VehiculeType {
  SUV = 'SUV',
  SEDAN = 'SEDAN',
  TRUCK = 'TRUCK',
  SPORTS = 'SPORTS',
  LUXURY = 'LUXURY',
  ELECTRIC = 'ELECTRIC'
}

export enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  PLUGIN_HYBRID = 'PLUGIN_HYBRID'
}

// Add schema for enums
export class VehiculeTypeSchema {
  @ApiProperty({ enum: VehiculeType, enumName: 'VehiculeType' })
  type: VehiculeType;
}

export class FuelTypeSchema {
  @ApiProperty({ enum: FuelType, enumName: 'FuelType' })
  type: FuelType;
}

export interface Vehicle {
  id: UUID;
  manufacturer: string;
  model: string;
  year: number;
  type: VehiculeType;
  price: number;
  fuelType: FuelType;
  transmission: string;
  mileage?: number;
  features: string[];
  images: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
} 