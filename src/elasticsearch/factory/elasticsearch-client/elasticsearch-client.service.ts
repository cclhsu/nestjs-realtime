// Path: src/elasticsearch/factory/elasticsearch-client/elasticsearch-client.service.ts
// DESC: This is the main entry point for the elasticsearch-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchClientInterface } from './elasticsearch-client.interface';

@Injectable()
export class ElasticsearchClientService implements ElasticsearchClientInterface {
  private logger: Logger = new Logger(ElasticsearchClientService.name);
  // private readonly ElasticsearchServerUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.logger.log('elasticsearch Client initialized');

    // Initialize elasticsearch server URL
    // this.ElasticsearchServerUrl = this.initializeElasticsearchServerUrl();
    // this.logger.log(`elasticsearch Server URL: ${this.ElasticsearchServerUrl}`);

    // Register elasticsearch
    // const elasticsearchData: elasticsearchInfoDTO = {};

    // Initialize elasticsearch server URL
    // this.registerelasticsearch(elasticsearchData);
  }

  private initializeElasticsearchServerUrl(): string {
    const SERVER_HOST: string =
      this.configService.get<string>('SERVER_HOST') ||
      process.env.SERVER_HOST ||
      this.configService.get<string>('SERVICE_HOST') ||
      'localhost';
    const SERVER_PORT: number =
      this.configService.get<number>('SERVER_PORT') ||
      Number(process.env.SERVER_PORT) ||
      this.configService.get<number>('SERVICE_PORT') ||
      3001;
    return `http://${SERVER_HOST}:${SERVER_PORT}/elasticsearch/`;
  }
}
