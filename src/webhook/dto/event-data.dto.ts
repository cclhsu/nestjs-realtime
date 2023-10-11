// Path: src/webhook/dto/event-data.dto.ts
// DESC: event-data dto
'use strict';

import { ApiProperty } from '@nestjs/swagger';

export class EventDataDTO {
  // Define the data associated with triggering an event

  @ApiProperty({
    description: 'Event ID',
    type: String,
    required: true,
  })
  id: string;

  @ApiProperty({
    description: 'Event type',
    type: String,
    required: true,
  })
  type: string;

  @ApiProperty({
    description: 'Event data',
    type: Object,
    required: true,
  })
  data: any;

  constructor(id: string, type: string, data: any) {
    this.id = id;
    this.type = type;
    this.data = data;
  }
}

export default EventDataDTO;
