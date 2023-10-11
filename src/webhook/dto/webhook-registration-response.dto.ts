// Path: src/webhook/dto/webhook-registration-response.dto.ts
// DESC: webhook-registration-response dto
'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class WebhookRegistrationResponseDTO {
  // Define the response data for webhook registration

  @ApiProperty({
    description: 'Success',
    type: Boolean,
    required: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Message',
    type: String,
    required: true,
  })
  message: string;

  @ApiProperty({
    description: 'Webhook data',
    type: Object,
    required: true,
  })
  data: any;

  constructor(success: boolean, message: string, data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export default WebhookRegistrationResponseDTO;
