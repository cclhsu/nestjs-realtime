// Path: src/graphql/factory/graphql-client/graphql-client.module.ts
// DESC: This is the main entry point for the graphql-client application.
'use strict';
import { Module } from '@nestjs/common';
import { GraphqlClientService } from './graphql-client.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [GraphqlClientService],
  exports: [GraphqlClientService],
})
export class GraphqlClientModule {}
