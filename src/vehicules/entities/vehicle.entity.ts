import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { VehiculeType, FuelType } from '../types/vehicule.types';

@Entity('vehicles')
export class VehicleEntity {
  @ApiProperty({ description: 'The unique identifier of the vehicle' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Vehicle manufacturer' })
  @Column()
  manufacturer: string;

  @ApiProperty({ description: 'Vehicle model' })
  @Column()
  model: string;

  @ApiProperty({ description: 'Manufacturing year' })
  @Column()
  year: number;

  @ApiProperty({ enum: VehiculeType, description: 'Type of vehicle' })
  @Column({
    type: 'enum',
    enum: VehiculeType,
  })
  type: VehiculeType;

  @ApiProperty({ description: 'Vehicle price' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ enum: FuelType, description: 'Type of fuel' })
  @Column({
    type: 'enum',
    enum: FuelType,
  })
  fuelType: FuelType;

  @ApiProperty({ description: 'Transmission type' })
  @Column()
  transmission: string;

  @ApiProperty({ required: false, description: 'Vehicle mileage' })
  @Column({ nullable: true })
  mileage?: number;

  @ApiProperty({ type: [String], description: 'Vehicle features' })
  @Column('simple-array', { default: [] })
  features: string[];

  @ApiProperty({ type: [String], description: 'Vehicle images URLs' })
  @Column('text', { array: true, default: [] })
  images: string[];

  @ApiProperty({ description: 'Vehicle description' })
  @Column('text')
  description: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
} 