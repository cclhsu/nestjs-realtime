// Path: src/websocket/dto/message.dto.ts
// DESC: This is the message dto for the websocket application.
'use strict';
import { ApiProperty } from '@nestjs/swagger';

class MessageDTO {
  @ApiProperty({
    name: 'message',
    description: 'The message to send.',
    type: String,
    required: true,
    example: 'Hello World!',
  })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export { MessageDTO };
