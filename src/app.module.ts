import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { BorrowerModule } from './borrower/borrower.module';

@Module({
  imports: [DatabaseModule, GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: true,
    debug: false,
    playground: false,
    typePaths: ['./**/*.graphql'],
  }), BorrowerModule,],
})
export class AppModule { }
