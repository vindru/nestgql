import { BorrowerProfileSetting } from "src/borrower-profile-settings/borrower-profile-setting.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: '',
  password: '',
  database: 'demo_2',
  synchronize: false,
  entities: [BorrowerProfileSetting],
  cli: {
    migrationsDir: 'src/db/migration',
  }
}
export default config;
