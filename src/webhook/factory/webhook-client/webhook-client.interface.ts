// Path: src/webhook/factory/webhook-client/webhook-client.interface.ts
// DESC: This is the interface for the webhook-client application.
'use strict';

import {
  EventDataDTO,
  EventDataResponseDTO,
  WebhookInfoDTO,
  WebhookRegistrationResponseDTO,
} from '../../dto';

interface WebhookClientInterface {
  // Defines the operations that a Webhook Client should support.
  /**
   * Registers a new webhook with the specified URL.
   * @param webhookData The data for webhook registration.
   * @returns A response indicating the success of the registration.
   */
  registerWebhook(webhookData: WebhookInfoDTO): Promise<WebhookRegistrationResponseDTO>;

  /**
   * Triggers an event with the specified data.
   * @param eventDataDTO The data for event triggering.
   * @returns A response indicating the success of the event triggering.
   */
  triggerEvent(eventDataDTO: EventDataDTO): Promise<EventDataResponseDTO>;

  /**
   * Handles a triggered event with the specified data.
   * @param eventDataDTO The data for event triggering.
   * @returns A response indicating the success of the event triggering.
   */
  handleTriggeredEvent(eventDataDTO: EventDataDTO): Promise<EventDataResponseDTO>;

  /**
   * Disconnects a webhook using its identifier.
   * @param webhookId The identifier of the webhook to disconnect.
   * @returns A response indicating the success of the disconnection.
   */
  disconnectWebhook(webhookId: string): Promise<WebhookRegistrationResponseDTO>;
}

export { WebhookClientInterface };
