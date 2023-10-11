// path: src/webhook/dto/webhook-info.dto.ts
// DESC: webhook-info dto
'use strict';

import { ApiProperty } from '@nestjs/swagger';
import WebhookConfigDTO from './webhook-config.dto';

export class WebhookInfoDTO {
  @ApiProperty({
    description: 'Webhook ID',
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Webhook URL',
    type: String,
    required: true,
  })
  url: string;

  @ApiProperty({
    description: 'Webhook expiry date',
    type: Date,
    required: true,
  })
  expiryDate: Date;

  @ApiProperty({
    description: 'Webhook config',
    type: WebhookConfigDTO,
    required: true,
  })
  config: WebhookConfigDTO;

  constructor(id: string, url: string, expiryDate: Date, config: WebhookConfigDTO) {
    this.id = id;
    this.url = url;
    this.expiryDate = expiryDate;
    this.config = config;
  }
}

export default WebhookInfoDTO;
