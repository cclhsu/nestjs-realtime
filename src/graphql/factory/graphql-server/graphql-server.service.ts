// Path: src/graphql/factory/graphql-server/graphql-server.service.ts
// DESC: This is the main entry point for the graphql-server application.
'use strict';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphqlServerInterface } from './graphql-server.interface';

@Injectable()
export class GraphqlServerService implements GraphqlServerInterface {
  private logger: Logger = new Logger(GraphqlServerService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger.log('graphql Server initialized');
  }

  private initializegraphqlServerUrl(): string {
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
    return `http://${SERVER_HOST}:${SERVER_PORT}/graphql/`;
  }
}
