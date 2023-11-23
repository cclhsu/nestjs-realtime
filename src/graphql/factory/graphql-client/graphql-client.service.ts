// Path: src/graphql/factory/graphql-client/graphql-client.service.ts
// DESC: This is the main entry point for the graphql-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GraphQLClientService {
  private logger: Logger = new Logger(GraphQLClientService.name);
  // private readonly graphQLServerUrl: string;
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('graphql Client initialized');

    // Initialize graphql server URL
    // this.graphQLServerUrl = this.initializeGraphQLServerUrl();
    // this.logger.log(`graphql Server URL: ${this.graphQLServerUrl}`);

    // Register graphql
    // const graphqlData: graphqlInfoDTO = {};

    // Initialize graphql server URL
    // this.registergraphql(graphqlData);
  }

  private initializeGraphQLServerUrl(): string {
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
