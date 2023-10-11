// Path: src/webhook/dto/webhook-config.dto.ts
// DESC: webhook-config dto
'use strict';

import { ApiProperty } from '@nestjs/swagger';
import WebhookType from '../enum/webhook-type.enum';

export class WebhookConfigDTO {
  @ApiProperty({
    description: 'Webhook secret',
    type: String,
    required: true,
  })
  secret: string;

  @ApiProperty({
    description: 'Webhook is active',
    type: Boolean,
    required: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Webhook type',
    // type: WebhookType,
    required: true,
  })
  type: WebhookType;

  constructor(secret: string, isActive: boolean, type: WebhookType) {
    this.secret = secret;
    this.isActive = isActive;
    this.type = type;
  }
}

export default WebhookConfigDTO;
