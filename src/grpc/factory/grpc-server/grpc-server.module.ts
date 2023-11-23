// Path: src/grpc/factory/grpc-server/grpc-server.module.ts
// DESC: This is the main entry point for the grpc-server application.
'use strict';
import { Module } from '@nestjs/common';
import { GrpcServerService } from './grpc-server.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GrpcServerService],
  exports: [GrpcServerService],
})
export class GrpcServerModule {}
