// Path: src/graphql/factory/graphql-client/graphql-client.service.ts
// DESC: This is the main entry point for the graphql-client application.
'use strict';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphqlClientInterface } from './graphql-client.interface';

@Injectable()
export class GraphqlClientService implements GraphqlClientInterface {
  private logger: Logger = new Logger(GraphqlClientService.name);
  // private readonly graphqlServerUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger.log('graphql Client initialized');

    // Initialize graphql server URL
    // this.graphqlServerUrl = this.initializegraphqlServerUrl();
    // this.logger.log(`graphql Server URL: ${this.graphqlServerUrl}`);

    // Register graphql
    // const graphqlData: graphqlInfoDTO = {};

    // Initialize graphql server URL
    // this.registergraphql(graphqlData);
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
