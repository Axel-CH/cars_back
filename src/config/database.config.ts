import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'cars_db_user',
  password: process.env.DB_PASSWORD || 'local_pwd_pkzx',
  database: process.env.DB_NAME || 'vehicles_db',
  synchronize: process.env.NODE_ENV !== 'production',
})); 