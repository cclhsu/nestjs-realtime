// Path: src/elasticsearch/factory/elasticsearch-server/elasticsearch-server.module.ts
// DESC: This is the main entry point for the elasticsearch-server application.
'use strict';
import { Module } from '@nestjs/common';
import { ElasticsearchServerService } from './elasticsearch-server.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ElasticsearchServerService],
  exports: [ElasticsearchServerService],
})
export class ElasticsearchServerModule {}
