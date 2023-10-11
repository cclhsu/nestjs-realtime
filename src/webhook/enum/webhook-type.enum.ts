// Path: src/webhook/enum/webhook-type.enum.ts
// DESC: This is the main entry point for the webhook application.
'use strict';

enum WebhookType {
  Test = 'test',
  Dev = 'dev',
  Prod = 'prod',
  Broadcast = 'broadcast',
  System = 'system',
  Exclusive = 'exclusive',
}

export default WebhookType;
