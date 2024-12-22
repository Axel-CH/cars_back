import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculesModule } from './vehicules/vehicules.module';
import { VehicleEntity } from './vehicules/entities/vehicle.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'vehicles_db',
      entities: [VehicleEntity],
      synchronize: process.env.NODE_ENV !== 'production', // Don't use synchronize in production
      logging: process.env.NODE_ENV !== 'production',
    }),
    VehiculesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
