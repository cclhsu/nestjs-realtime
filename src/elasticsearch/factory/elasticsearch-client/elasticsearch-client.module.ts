// Path: src/elasticsearch/factory/elasticsearch-client/elasticsearch-client.module.ts
// DESC: This is the main entry point for the elasticsearch-client application.
'use strict';
import { Module } from '@nestjs/common';
import { ElasticsearchClientService } from './elasticsearch-client.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ElasticsearchClientService],
  exports: [ElasticsearchClientService],
})
export class ElasticsearchClientModule {}
