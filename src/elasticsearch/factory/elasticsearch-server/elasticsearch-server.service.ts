// Path: src/elasticsearch/factory/elasticsearch-server/elasticsearch-server.service.ts
// DESC: This is the main entry point for the elasticsearch-server application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchServerInterface } from './elasticsearch-server.interface';

@Injectable()
export class ElasticsearchServerService implements ElasticsearchServerInterface {
  private logger: Logger = new Logger(ElasticsearchServerService.name);
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('elasticsearch Server initialized');
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
