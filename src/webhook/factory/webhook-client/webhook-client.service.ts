// Path: src/webhook/factory/webhook-client/webhook-client.service.ts
// DESC: This is the main entry point for the webhook-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidV4 } from 'uuid';
import { ENVIRONMENT_TYPES, STAGE_TYPES } from './../../../common/constant';
import { MessageDTO, RegistrationDTO, RegistrationResponseDTO } from './../../../common/dto';
import { MessageServiceInterface, RegistrationServiceInterface } from './../../../common/interface';
import { deleteRequest, getRequest, postRequest, putRequest } from './../../../utils/api';

@Injectable()
export class WebhookClientService implements RegistrationServiceInterface, MessageServiceInterface {
  private logger: Logger = new Logger(WebhookClientService.name);
  private readonly webhookServerUrl: string;
  private readonly UUID: string;

  constructor(private readonly configService: ConfigService) {
    this.logger.log('Webhook Client initialized');
    this.UUID = uuidV4();

    // Initialize webhook server URL
    this.webhookServerUrl = this.initializeWebhookServerUrl();
    this.logger.log(`Webhook Server URL: ${this.webhookServerUrl}`);

    // Register webhook
    const data: RegistrationDTO = {
      UUID: this.UUID,
      type: 'webhook',
      stage: STAGE_TYPES.STAGE_TYPES_DEVELOPMENT,
      environment: ENVIRONMENT_TYPES.ENVIRONMENT_TYPES_LOCAL,
      sender: this.UUID,
      timestamp: new Date(),
      callbackURL: this.initializeWebhookClientUrl(),
      subscriptions: [],
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000 * 24), // 1 day
      secret: '1234567890',
      state: 'active',
    };

    // Initialize webhook server URL
    this.register(data);
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
    return `http://${SERVER_HOST}:${SERVER_PORT}/webhook`;
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
    return `http://${CLIENT_HOST}:${CLIENT_PORT}/webhook-client/message/receive`;
  }

  async register(registration: RegistrationDTO): Promise<RegistrationResponseDTO> {
    this.logger.log(`Registering webhook: ${JSON.stringify(registration)}`);
    this.logger.log(`Server URL: ${this.webhookServerUrl}/registration`);
    try {
      const response = postRequest<RegistrationResponseDTO, RegistrationDTO>(
        `${this.webhookServerUrl}/registration`,
        registration,
      );

      await Promise.resolve(response);

      this.logger.log(`Webhook registration response: ${JSON.stringify(response)}`);

      return {
        status: 'success',
        code: '200',
        message: `Webhook ${registration.UUID} registered successfully`,
        data: response,
      }; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Webhook registration error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async unregister(registrationID: string): Promise<void> {
    this.logger.log(`Disconnecting webhook: ${registrationID}`);
    try {
      const response = deleteRequest<RegistrationResponseDTO>(
        `${this.webhookServerUrl}/registration/${registrationID}`,
      );

      await Promise.resolve(response);

      this.logger.log(`Webhook disconnection response: ${JSON.stringify(response)}`);

      // return {
      //   status: 'success',
      //   code: '200',
      //   message: `Webhook ${registrationID} disconnected successfully`,
      //   data: null,
      // }; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Webhook disconnection error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async listRegistrations(): Promise<RegistrationDTO[]> {
    this.logger.log(`Listing webhooks`);
    // throw new Error('Method not implemented.');
    try {
      const response = getRequest<RegistrationDTO[]>(`${this.webhookServerUrl}/registration`);

      await Promise.resolve(response);

      this.logger.log(`Webhook registration list response: ${JSON.stringify(response)}`);

      return response as unknown as RegistrationDTO[];
      // return response as RegistrationDTO[]; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Webhook registration list error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async updateRegistration(
    registrationID: string,
    registration: RegistrationDTO,
  ): Promise<RegistrationResponseDTO> {
    this.logger.log(`Updating webhook: ${registrationID}`);

    try {
      const response = putRequest<RegistrationResponseDTO, RegistrationDTO>(
        `${this.webhookServerUrl}/registration/${registrationID}`,
        registration,
      );

      await Promise.resolve(response);

      this.logger.log(`Webhook registration update response: ${JSON.stringify(response)}`);

      return {
        status: 'success',
        code: '200',
        message: `Webhook ${registrationID} updated successfully`,
        data: response,
      }; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Webhook registration update error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async send(message: MessageDTO): Promise<void> {
    this.logger.log(`Sending message: ${JSON.stringify(message)}`);

    try {
      const response = postRequest<MessageDTO, MessageDTO>(
        `${this.webhookServerUrl}/message/send`,
        message,
      );

      await Promise.resolve(response);

      this.logger.log(`Message sending response: ${JSON.stringify(response)}`);

      // return {
      //   status: 'success',
      //   code: '200',
      //   message: `Message sent successfully`,
      //   data: response,
      // }; // Assuming the response contains the registration data
    } catch (error: any) {
      this.logger.error(`Message sending error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async receive(message: MessageDTO): Promise<void> {
    try {
      this.logger.log(`Handling message: ${JSON.stringify(message)}`);
      return Promise.resolve();
    } catch (error: any) {
      this.logger.error(`Message handling error: ${JSON.stringify(error)}`);
      throw error; // Re-throw the error to handle it at the caller level if needed
    }
  }

  async listMessages(): Promise<MessageDTO[]> {
    this.logger.log(`Listing messages`);
    throw new Error('Method not implemented.');

    // try {
    //   const response = getRequest<MessageDTO[]>(`${this.webhookServerUrl}/message`);

    //   await Promise.resolve(response);

    //   this.logger.log(`Message list response: ${JSON.stringify(response)}`);

    //   // return {
    //   //   status: 'success',
    //   //   code: '200',
    //   //   message: `Messages listed successfully`,
    //   //   data: response,
    //   // }; // Assuming the response contains the registration data
    // } catch (error: any) {
    //   this.logger.error(`Message list error: ${JSON.stringify(error)}`);
    //   throw error; // Re-throw the error to handle it at the caller level if needed
    // }
  }
}
