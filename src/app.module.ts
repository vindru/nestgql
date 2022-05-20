import { Module } from '@nestjs/common';
import { BorrowerProfileSettingsModule } from './borrower-profile-settings/borrower-profile-settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerProfileSetting } from './borrower-profile-settings/borrower-profile-setting.entity';

//Todo: Add ormconfig from db/ormconfig.ts, its causing error right now.
@Module({
  imports: [BorrowerProfileSettingsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: '',
    database: 'demo_app_db',
    synchronize: false,
    entities: [BorrowerProfileSetting],
    cli: {
      migrationsDir: 'src/db/migration',
    }
  })]
})
export class AppModule { }
