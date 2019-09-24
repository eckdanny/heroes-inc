import { ConnectionOptions } from 'typeorm';
import { Hero } from './entity/hero.entity';
import { User } from './entity/user.entity';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Hero],
  synchronize: true
};

export default config;
