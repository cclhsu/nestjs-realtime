// Path: src/webhook/factory/webhook-server/webhook-server.service.ts
// DESC: This is the main entry point for the webhook-server application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { postRequest } from 'src/utils/api';
import { MESSAGE_TYPES } from './../../../common/constant';
import { MessageDTO, RegistrationDTO, RegistrationResponseDTO } from './../../../common/dto';
import { MessageServiceInterface, RegistrationServiceInterface } from './../../../common/interface';

@Injectable()
export class WebhookServerService implements RegistrationServiceInterface, MessageServiceInterface {
  private logger: Logger = new Logger(WebhookServerService.name);
  private webhookConfigs: Map<string, RegistrationDTO>;
  private MessageDTOs: Map<string, MessageDTO>;
  private webhookConnections: Map<string, boolean>;
  private webhookDisconnections: Map<string, boolean>;
  constructor(private readonly configService: ConfigService) {
    this.logger.log('Webhook Server initialized');

    // Create storage for webhook configurations
    this.webhookConfigs = new Map<string, RegistrationDTO>();

    // Create storage for webhook payloads
    this.MessageDTOs = new Map<string, MessageDTO>();

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
    return `http://${CLIENT_HOST}:${CLIENT_PORT}/webhook-client/receive`;
  }

  private initializeWebhookId(): string {
    return this.configService.get<string>('WEBHOOK_ID') || '1234567890';
  }

  async register(registration: RegistrationDTO): Promise<RegistrationResponseDTO> {
    this.logger.log(`Received webhook registration request: ${JSON.stringify(registration)}`);
    // throw new Error('Method not implemented.');
    try {
      if (!registration.UUID || !registration.callbackURL || !registration.type) {
        this.logger.error('Invalid registration request');
        throw new Error('Invalid registration request');
      }

      // Check if webhook already registered
      if (this.webhookConfigs.has(registration.UUID)) {
        this.logger.error(`Webhook ${registration.UUID} already registered`);
        throw new Error(`Webhook ${registration.UUID} already registered`);
      }

      // Register webhook
      this.webhookConfigs.set(registration.UUID, registration);
      this.webhookConnections.set(registration.UUID, true);
      this.webhookDisconnections.set(registration.UUID, false);
      const successResponse = new RegistrationResponseDTO(
        'success',
        '200',
        `Webhook ${registration.UUID} registered successfully`,
        registration,
      );
      return Promise.resolve(successResponse);
    } catch (error: any) {
      this.logger.error(`Webhook registration error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  unregister(registrationID: string): Promise<void> {
    try {
      this.logger.log(`Received webhook unregistration request: ${registrationID}`);

      // Check if webhook already registered
      if (!this.webhookConfigs.has(registrationID)) {
        this.logger.error(`Webhook ${registrationID} not registered`);
        throw new Error(`Webhook ${registrationID} not registered`);
      }

      // Unregister webhook
      this.webhookConfigs.delete(registrationID);
      this.webhookConnections.delete(registrationID);
      this.webhookDisconnections.delete(registrationID);
      return Promise.resolve();
    } catch (error: any) {
      this.logger.error(`Webhook unregistration error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  listRegistrations(): Promise<RegistrationDTO[]> {
    this.logger.log(`Received webhook list request`);
    // throw new Error('Method not implemented.');

    // Implement webhook list logic here in the webhook server
    const webhookList: RegistrationDTO[] = [];
    this.webhookConfigs.forEach((config) => {
      webhookList.push(config);
    });
    this.logger.log(`Webhook list: ${JSON.stringify(webhookList)}`);
    return Promise.resolve(webhookList);
  }

  updateRegistration(
    registrationID: string,
    registration: RegistrationDTO,
  ): Promise<RegistrationResponseDTO> {
    try {
      this.logger.log(`Received webhook update request: ${registrationID}`);

      // Check if webhook already registered
      if (!this.webhookConfigs.has(registrationID)) {
        this.logger.error(`Webhook ${registrationID} not registered`);
        throw new Error(`Webhook ${registrationID} not registered`);
      }

      // Update webhook
      this.webhookConfigs.set(registrationID, registration);
      const successResponse = new RegistrationResponseDTO(
        'success',
        '200',
        `Webhook ${registrationID} updated successfully`,
        registration,
      );
      return Promise.resolve(successResponse);
    } catch (error: any) {
      this.logger.error(`Webhook update error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  send(message: MessageDTO): Promise<void> {
    try {
      this.logger.log(`Received webhook send request: ${JSON.stringify(message)}`);

      // // Check if webhook already registered
      // if (!this.webhookConfigs.has(message.UUID)) {
      //   this.logger.error(`Webhook ${message.UUID} not registered`);
      //   throw new Error(`Webhook ${message.UUID} not registered`);
      // }

      // // Check if webhook is connected
      // if (!this.webhookConnections.get(message.UUID)) {
      //   this.logger.error(`Webhook ${message.UUID} not connected`);
      //   throw new Error(`Webhook ${message.UUID} not connected`);
      // }

      switch (message.type) {
        case MESSAGE_TYPES.MESSAGE_TYPES_BROADCAST:
          return this.broadcast(message);
          break;
        case MESSAGE_TYPES.MESSAGE_TYPES_ECHO:
          return this.echo(message);
          break;
        case MESSAGE_TYPES.MESSAGE_TYPES_UNICAST:
          return this.unicast(message);
          break;
        default:
          this.logger.error(`Invalid message type: ${message.type}`);
          break;
      }
      return Promise.resolve();
    } catch (error: any) {
      this.logger.error(`Webhook send error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  receive(message: MessageDTO): Promise<void> {
    this.logger.log(`Received webhook receive request: ${JSON.stringify(message)}`);
    throw new Error('Method not implemented.');
  }

  listMessages(): Promise<MessageDTO[]> {
    this.logger.log(`Listing messages`);
    throw new Error('Method not implemented.');
  }

  private async broadcast(message: MessageDTO): Promise<void> {
    try {
      // Implement webhook event handling logic here in the webhook server
      this.MessageDTOs.set(message.UUID, message);

      // Use map to create an array of promises
      const postRequests = Array.from(this.webhookConfigs.values()).map((webhookConfig) => {
        const webhookUrl = webhookConfig.callbackURL;
        this.logger.verbose(
          `[broadcast] Sending webhook event to: ${webhookUrl} with payload: ${JSON.stringify(
            message,
          )}`,
        );

        // Use sendRequest directly instead of creating a separate promise
        const response = postRequest<MessageDTO, MessageDTO>(webhookUrl, message);
        Promise.resolve(response);
        return response;
      });

      // Wait for all post requests to complete
      await Promise.all(postRequests);
    } catch (error: any) {
      this.logger.error(`[broadcast] Webhook error: ${JSON.stringify(error)}`);
      throw new Error(`[broadcast] Webhook error: ${error.message}`);
    }
  }

  private echo(message: MessageDTO): Promise<void> {
    try {
      const webhookUrl = this.webhookConfigs.get(message.sender)?.callbackURL;
      if (!webhookUrl) {
        this.logger.error(`Webhook ${message.sender} not registered`);
        throw new Error(`Webhook ${message.sender} not registered`);
      }
      this.logger.verbose(
        `[echo] Sending webhook event to: ${webhookUrl} with payload: ${JSON.stringify(message)}`,
      );
      const response = postRequest<void, MessageDTO>(webhookUrl, message);
      Promise.resolve(response);
      return Promise.resolve();
    } catch (error: any) {
      this.logger.error(`[echo] Webhook error: ${JSON.stringify(error)}`);
      throw new Error(`[echo] Webhook error: ${error.message}`);
    }
  }

  private unicast(message: MessageDTO): Promise<void> {
    try {
      const webhookUrl = this.webhookConfigs.get(message.recipient)?.callbackURL;
      if (!webhookUrl) {
        this.logger.error(`Webhook ${message.recipient} not registered`);
        throw new Error(`Webhook ${message.recipient} not registered`);
      }
      this.logger.verbose(
        `[unicast] Sending webhook event to: ${webhookUrl} with payload: ${JSON.stringify(
          message,
        )}`,
      );
      const response = postRequest<MessageDTO, MessageDTO>(webhookUrl, message);
      Promise.resolve(response);
      return Promise.resolve();
    } catch (error: any) {
      this.logger.error(`[unicast] Webhook error: ${JSON.stringify(error)}`);
      throw new Error(`[unicast] Webhook error: ${error.message}`);
    }
  }
}
