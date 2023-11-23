// Path: src/graphql/factory/graphql-client/graphql-client.controller.ts
// DESC: This is the main entry point for the graphql-client application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GraphQLClientService } from './graphql-client.service';

@ApiTags('graphql')
@Controller('graphql')
export class GraphQLClientController {
  private logger: Logger = new Logger(GraphQLClientController.name);
  constructor(private readonly graphqlClientService: GraphQLClientService) {}
}
