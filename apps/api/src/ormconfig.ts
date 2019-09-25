import { ConnectionOptions } from 'typeorm';
import { Hero } from './entity/hero.entity';
import { User } from './entity/user.entity';
import { Skill } from './entity/skill.entity';
import { Incident } from './entity/incident.entity';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Hero, User, Skill, Incident],
  synchronize: true
};

export default config;
