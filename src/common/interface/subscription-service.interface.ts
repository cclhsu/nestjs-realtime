// Path: src/common/interface/subscription-service.interface.ts
// DESC: This is the main entry point for the subscription-service application.
'use strict';

import { SubscriptionDTO, SubscriptionResponseDTO } from '../dto';

// interface SubscriptionInterface {
//   id: string;
//   subscription: string;
//   timestamp: Date;
// }

interface SubscriptionControllerInterface {
  subscribe(subscription: SubscriptionDTO): Promise<SubscriptionResponseDTO>; // Subscribe to receive messages
  unsubscribe(subscriptionID: string): Promise<void>; // Unsubscribe from receiving messages
  listSubscriptions(): Promise<SubscriptionDTO[]>; // List subscriptions to receive messages
  updateSubscription(
    subscriptionID: string,
    subscription: SubscriptionDTO,
  ): Promise<SubscriptionResponseDTO>; // Update subscription to receive messages
}

interface SubscriptionServiceInterface {
  subscribe(subscription: SubscriptionDTO): Promise<SubscriptionResponseDTO>; // Subscribe to receive messages
  unsubscribe(subscriptionID: string): Promise<void>; // Unsubscribe from receiving messages
  listSubscriptions(): Promise<SubscriptionDTO[]>; // List subscriptions to receive messages
  updateSubscription(
    subscriptionID: string,
    subscription: SubscriptionDTO,
  ): Promise<SubscriptionResponseDTO>; // Update subscription to receive messages
}

export { SubscriptionControllerInterface, SubscriptionServiceInterface };
