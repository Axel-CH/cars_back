import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './vehicules/seed/seed.module';
import { VehiculesModule } from './vehicules/vehicules.module';
import databaseConfig from './config/database.config';
import { VehicleEntity } from './vehicules/entities/vehicle.entity';
import { UpdateNullImages1703330436000 } from './migrations/UpdateNullImages';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [VehicleEntity],
        synchronize: configService.get('database.synchronize'),
        migrations: [UpdateNullImages1703330436000],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    SeedModule,
    VehiculesModule,
  ],
})
export class AppModule {}
