// Path: src/webpush/factory/webpush-client/webpush-client.service.ts
// DESC: This is the main entry point for the webpush-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WebpushClientService {
  private logger: Logger = new Logger(WebpushClientService.name);
  // private readonly webpushServerUrl: string;
  constructor(
    private readonly configService: ConfigService
  ) {
    this.logger.log('Webpush Client initialized');

    // Initialize webpush server URL
    // this.webpushServerUrl = this.initializeWebpushServerUrl();
    // this.logger.log(`Webpush Server URL: ${this.webpushServerUrl}`);

    // Register webpush
    // const webpushData: WebpushInfoDTO = {};

    // Initialize webpush server URL
    // this.registerWebpush(webpushData);
  }

  private initializeWebpushServerUrl(): string {
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
    return `http://${SERVER_HOST}:${SERVER_PORT}/webpush/`;
  }
}
