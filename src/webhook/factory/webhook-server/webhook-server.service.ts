// Path: src/webhook/factory/webhook-server/webhook-server.service.ts
// DESC: This is the main entry point for the webhook-server application.
'use strict';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { EventDataDTO, WebhookInfoDTO, WebhookRegistrationResponseDTO } from '../../dto';
import { WebhookServerInterface } from './webhook-server.interface';
import WebhookType from 'src/webhook/enum/webhook-type.enum';

@Injectable()
export class WebhookServerService implements WebhookServerInterface {
  private logger: Logger = new Logger(WebhookServerService.name);
  private webhookConfigs: Map<string, WebhookInfoDTO>;
  private eventDataDTOs: Map<string, EventDataDTO>;
  private webhookConnections: Map<string, boolean>;
  private webhookDisconnections: Map<string, boolean>;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.logger.log('Webhook Server initialized');

    // Create storage for webhook configurations
    this.webhookConfigs = new Map<string, WebhookInfoDTO>();

    // Create storage for webhook payloads
    this.eventDataDTOs = new Map<string, EventDataDTO>();

    // Create storage for webhook connections
    this.webhookConnections = new Map<string, boolean>();

    // Create storage for webhook disconnections
    this.webhookDisconnections = new Map<string, boolean>();
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

  private initializeWebhookId(): string {
    return this.configService.get<string>('WEBHOOK_ID') || '1234567890';
  }

  registerWebhook(request: WebhookInfoDTO): Promise<WebhookRegistrationResponseDTO> {
    this.logger.log(`Received webhook registration request: ${JSON.stringify(request)}`);
    // Implement webhook registration logic here in the webhook server
    // const webhookUrl = this.initializeWebhookServerUrl();
    // const webhookId = this.initializeWebhookId();

    // Register webhook
    this.webhookConfigs.set(request.id, request);
    this.webhookConnections.set(request.id, true);
    this.webhookDisconnections.set(request.id, false);
    return Promise.resolve(
      new WebhookRegistrationResponseDTO(
        true,
        `Webhook ${request.id} registered successfully`,
        request,
      ),
    );
  }

  async handleWebhookEvent(payload: EventDataDTO): Promise<WebhookRegistrationResponseDTO> {
    this.logger.log(`Received webhook event: ${JSON.stringify(payload)}`);

    // Implement webhook event handling logic here in the webhook server
    this.eventDataDTOs.set(payload.id, payload);

    const postRequests: Promise<void>[] = [];

    // Loop through webhookConfigs and create an array of promises
    this.webhookConfigs.forEach((webhookConfigInfo) => {
      if (webhookConfigInfo.config.type === WebhookType.Exclusive) {
        if (webhookConfigInfo.config.isActive === false) {
          return;
        }
        if (webhookConfigInfo.id !== payload.id) {
          return;
        }
        if (this.webhookDisconnections.get(webhookConfigInfo.id)) {
          return;
        }
      }

      const webhookUrl = webhookConfigInfo.url;
      this.logger.log(
        `Sending webhook event to: ${webhookUrl} with payload: ${JSON.stringify(payload)}`,
      );

      // Define a function to send the request and handle retries
      const sendRequest = async (
        url: string,
        payload: EventDataDTO,
        retries: number = 3,
      ): Promise<void> => {
        try {
          await axios.post(url, payload, { timeout: 5000 });
        } catch (error) {
          if (retries > 0) {
            // Retry the request after a delay
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await sendRequest(url, payload, retries - 1);
          } else {
            // No more retries, log the error
            const axiosError = error as AxiosError;
            this.logger.error(`Error sending webhook event: ${axiosError.message}`);
          }
        }
      };

      // Create a promise for each post request using sendRequest
      const postPromise = sendRequest(webhookUrl, payload);
      postRequests.push(postPromise);
    });

    // Wait for all post requests to complete
    await Promise.all(postRequests);

    return new WebhookRegistrationResponseDTO(
      true,
      `Webhook event ${payload.id} received successfully`,
      null,
    );
  }

  unregisterWebhook(webhookId: string): Promise<WebhookRegistrationResponseDTO> {
    this.logger.log(`Received webhook unregistration request: ${webhookId}`);

    // Implement webhook unregistration logic here in the webhook server
    this.webhookConfigs.delete(webhookId);
    this.webhookConnections.delete(webhookId);
    this.webhookDisconnections.delete(webhookId);
    return Promise.resolve(
      new WebhookRegistrationResponseDTO(
        true,
        `Webhook ${webhookId} unregistered successfully`,
        null,
      ),
    );
  }

  listRegisteredWebhooks(): Promise<WebhookInfoDTO[]> {
    this.logger.log(`Received webhook list request`);

    // Implement webhook list logic here in the webhook server
    const webhookList: WebhookInfoDTO[] = [];
    this.webhookConfigs.forEach((config) => {
      webhookList.push({
        id: config.id,
        url: config.url,
        expiryDate: config.expiryDate,
        config: config.config,
      });
    });
    return Promise.resolve(webhookList);
  }

  updateWebhook(
    webhookId: string,
    request: WebhookInfoDTO,
  ): Promise<WebhookRegistrationResponseDTO> {
    this.logger.log(`Received webhook update request: ${webhookId}`);

    // Implement webhook update logic here in the webhook server
    this.webhookConfigs.set(webhookId, request);
    return Promise.resolve(
      new WebhookRegistrationResponseDTO(true, `Webhook ${webhookId} updated successfully`, null),
    );
  }
}
