// Path: src/graphql/factory/graphql-server/graphql-server.controller.ts
// DESC: This is the main entry point for the graphql-server application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GraphQLServerService } from './graphql-server.service';

@ApiTags('graphql')
@Controller('graphql')
export class GraphQLServerController {
  private logger: Logger = new Logger(GraphQLServerController.name);
  constructor(private readonly graphqlServerService: GraphQLServerService) {}
}
