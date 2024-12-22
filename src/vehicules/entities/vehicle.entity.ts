import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { VehicleType, FuelType } from '../types/vehicle.types';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({
    type: 'enum',
    enum: VehicleType
  })
  type: VehicleType;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: FuelType
  })
  fuelType: FuelType;

  @Column()
  transmission: string;

  @Column({ nullable: true })
  mileage: number;

  @Column('simple-array')
  features: string[];

  @Column('simple-array')
  images: string[];

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 