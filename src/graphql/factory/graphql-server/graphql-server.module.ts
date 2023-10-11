// Path: src/graphql/factory/graphql-server/graphql-server.module.ts
// DESC: This is the main entry point for the graphql-server application.
'use strict';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphqlServerService } from './graphql-server.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [GraphqlServerService],
  exports: [GraphqlServerService],
})
export class GraphqlServerModule {}
