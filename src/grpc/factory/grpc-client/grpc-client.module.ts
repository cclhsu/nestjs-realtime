// Path: src/grpc/factory/grpc-client/grpc-client.module.ts
// DESC: This is the main entry point for the grpc-client application.
'use strict';
import { Module } from '@nestjs/common';
import { GrpcClientService } from './grpc-client.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GrpcClientService],
  exports: [GrpcClientService],
})
export class GrpcClientModule {}
