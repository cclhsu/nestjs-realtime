// Path: src/grpc/factory/grpc-client/grpc-client.service.ts
// DESC: This is the main entry point for the grpc-client application.
'use strict';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientInterface } from './grpc-client.interface';

@Injectable()
export class GrpcClientService implements GrpcClientInterface {
  private logger: Logger = new Logger(GrpcClientService.name);
  // private readonly grpcServerUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger.log('Grpc Client initialized');

    // Initialize grpc server URL
    // this.grpcServerUrl = this.initializeGrpcServerUrl();
    // this.logger.log(`Grpc Server URL: ${this.grpcServerUrl}`);

    // Register grpc
    // const grpcData: GrpcInfoDTO = {};

    // Initialize grpc server URL
    // this.registerGrpc(grpcData);
  }

  private initializeGrpcServerUrl(): string {
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
    return `http://${SERVER_HOST}:${SERVER_PORT}/grpc/`;
  }
}
