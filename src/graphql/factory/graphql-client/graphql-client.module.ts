// Path: src/graphql/factory/graphql-client/graphql-client.module.ts
// DESC: This is the main entry point for the graphql-client application.
'use strict';
import { Module } from '@nestjs/common';
import { GraphQLClientService } from './graphql-client.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GraphQLClientService],
  exports: [GraphQLClientService],
})
export class GraphQLClientModule {}
