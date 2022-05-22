import { Module } from '@nestjs/common';
import { BorrowerProfileSettingsModule } from './borrower-profile-settings/borrower-profile-settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import config from './db/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), BorrowerProfileSettingsModule,]
})
export class AppModule { }
