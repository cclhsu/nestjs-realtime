// Path: src/graphql/factory/graphql-server/graphql-server.module.ts
// DESC: This is the main entry point for the graphql-server application.
'use strict';
import { Module } from '@nestjs/common';
import { GraphQLServerService } from './graphql-server.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GraphQLServerService],
  exports: [GraphQLServerService],
})
export class GraphQLServerModule {}
