// Path: src/webhook/dto/event-data-response.dto.ts
// DESC: event-data-response dto
'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class EventDataResponseDTO {
  // Define the response data associated with triggering an event

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
    description: 'Event data',
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

export default EventDataResponseDTO;
