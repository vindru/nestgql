import { Module } from '@nestjs/common';
import { BorrowerProfileSettingsModule } from './borrower-profile-settings/borrower-profile-settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowerProfileSetting } from './borrower-profile-settings/borrower-profile-setting.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

//Todo: Add ormconfig from db/ormconfig.ts, its causing error right now.
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: '',
    password: '',
    database: 'demo_app_pg',
    synchronize: false,
    entities: [BorrowerProfileSetting],
    cli: {
      migrationsDir: 'src/db/migration',
    }
  }), GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), BorrowerProfileSettingsModule,]
})
export class AppModule { }
