// Path: src/webhook/factory/webhook-client/webhook-client.service.ts
// DESC: This is the main entry point for the webhook-client application.
'use strict';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventDataDTO, WebhookInfoDTO, WebhookRegistrationResponseDTO } from '../../dto';
import WebhookType from '../../enum/webhook-type.enum';
import { WebhookClientInterface } from './webhook-client.interface';

@Injectable()
export class WebhookClientService implements WebhookClientInterface {
  private logger: Logger = new Logger(WebhookClientService.name);
  private readonly webhookServerUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger.log('Webhook Client initialized');

    // Initialize webhook server URL
    this.webhookServerUrl = this.initializeWebhookServerUrl();
    this.logger.log(`Webhook Server URL: ${this.webhookServerUrl}`);

    // Register webhook
    const webhookData: WebhookInfoDTO = {
      id: '1234567890',
      url: this.initializeWebhookClientUrl(),
      expiryDate: new Date(),
      config: {
        secret: '1234567890',
        isActive: true,
        type: WebhookType.Test,
      },
    };

    // Initialize webhook server URL
    this.registerWebhook(webhookData);
  }

  private initializeWebhookServerUrl(): string {
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
    return `http://${SERVER_HOST}:${SERVER_PORT}/webhook/`;
  }

  private initializeWebhookClientUrl(): string {
    const CLIENT_HOST: string =
      this.configService.get<string>('CLIENT_HOST') ||
      process.env.CLIENT_HOST ||
      this.configService.get<string>('SERVICE_HOST') ||
      'localhost';
    const CLIENT_PORT: number =
      this.configService.get<number>('CLIENT_PORT') ||
      Number(process.env.CLIENT_PORT) ||
      this.configService.get<number>('SERVICE_PORT') ||
      3002;
    return `http://${CLIENT_HOST}:${CLIENT_PORT}/webhook-client/handle-payload`;
  }

  async registerWebhook(webhookData: WebhookInfoDTO): Promise<WebhookRegistrationResponseDTO> {
    this.logger.log(`Registering webhook: ${JSON.stringify(webhookData)}`);

    try {
      const response = await this.httpService.post(
        `${this.webhookServerUrl}/register`,
        webhookData,
      );

      this.logger.log(`Webhook registration response: ${JSON.stringify(response)}`);

      return {
        success: true,
        message: `Webhook ${webhookData.id} registered successfully`,
        data: response,
      }; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Webhook registration error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async triggerEvent(eventDataDTO: EventDataDTO): Promise<WebhookRegistrationResponseDTO> {
    this.logger.log(`Triggering event: ${JSON.stringify(eventDataDTO)}`);

    try {
      const response = await this.httpService.post(
        `${this.webhookServerUrl}/trigger-event`,
        eventDataDTO,
      );

      this.logger.log(`Event triggering response: ${JSON.stringify(response)}`);

      return {
        success: true,
        message: `Webhook ${eventDataDTO.id} event triggered successfully`,
        data: response,
      }; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Event triggering error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async handleTriggeredEvent(eventDataDTO: EventDataDTO): Promise<WebhookRegistrationResponseDTO> {
    this.logger.log(`Handling triggered event: ${JSON.stringify(eventDataDTO)}`);

    try {
      return {
        success: true,
        message: `Webhook ${eventDataDTO.id} event handled successfully`,
        data: null,
      };
    } catch (error: any) {
      this.logger.error(`Event handling error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async disconnectWebhook(webhookId: string): Promise<WebhookRegistrationResponseDTO> {
    this.logger.log(`Disconnecting webhook: ${webhookId}`);
    try {
      const response = await this.httpService.delete(
        `${this.webhookServerUrl}/unregister/${webhookId}`,
      );

      this.logger.log(`Webhook disconnection response: ${JSON.stringify(response)}`);

      return {
        success: true,
        message: `Webhook ${webhookId} disconnected successfully`,
        data: null,
      }; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Webhook disconnection error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }
}
