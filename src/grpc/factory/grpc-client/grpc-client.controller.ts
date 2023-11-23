// Path: src/grpc/factory/grpc-client/grpc-client.controller.ts
// DESC: This is the main entry point for the grpc-client application.
'use strict';
import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GrpcClientService } from './grpc-client.service';

@ApiTags('grpc')
@Controller('grpc')
export class GrpcClientController {
  private logger: Logger = new Logger(GrpcClientController.name);
  constructor(private readonly grpcClientService: GrpcClientService) {}
}
