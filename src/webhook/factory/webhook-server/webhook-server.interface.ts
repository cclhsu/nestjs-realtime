// Path: src/webhook/factory/webhook-%20server/webhook-server.interface.ts
// DESC: This is the main entry point for the webhook application.
'use strict';

import { EventDataDTO, WebhookInfoDTO, WebhookRegistrationResponseDTO } from '../../dto';

interface WebhookServerInterface {
  // Defines the operations that a Webhook Server should support.
  /**
   * Register a new webhook.
   * @param request The webhook registration request.
   * @returns A response indicating the success of the registration.
   */
  registerWebhook(request: WebhookInfoDTO): Promise<WebhookRegistrationResponseDTO>;

  /**
   * Handle incoming webhook events.
   * @param payload The payload received from the webhook client.
   * @returns A response indicating the success of payload handling.
   */
  handleWebhookEvent(payload: EventDataDTO): Promise<WebhookRegistrationResponseDTO>;

  /**
   * Unregister a webhook using its identifier.
   * @param webhookId The identifier of the webhook to unregister.
   * @returns A response indicating the success of the unregistration.
   */
  unregisterWebhook(webhookId: string): Promise<WebhookRegistrationResponseDTO>;

  /**
   * List all registered webhooks.
   * @returns An array of webhook information.
   */
  listRegisteredWebhooks(): Promise<WebhookInfoDTO[]>;

  /**
   * Update the configuration of a registered webhook.
   * @param webhookId The identifier of the webhook to update.
   * @param request The updated webhook registration request.
   * @returns A response indicating the success of the update.
   */
  updateWebhook(
    webhookId: string,
    request: WebhookInfoDTO,
  ): Promise<WebhookRegistrationResponseDTO>;
}

export { WebhookServerInterface };
