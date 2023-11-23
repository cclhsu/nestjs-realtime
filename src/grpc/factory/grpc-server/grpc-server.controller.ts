// Path: src/grpc/factory/grpc-server/grpc-server.controller.ts
// DESC: This is the main entry point for the grpc-server application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GrpcServerService } from './grpc-server.service';

@ApiTags('grpc')
@Controller('grpc')
export class GrpcServerController {
  private logger: Logger = new Logger(GrpcServerController.name);
  constructor(private readonly grpcServerService: GrpcServerService) {}
}
