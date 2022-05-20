import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: '',
  database: 'demo_app_pg',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migration/*.ts'],
  cli: {
    migrationsDir: 'src/db/migration',
  }
}
export default ormConfig;
