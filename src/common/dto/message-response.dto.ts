// Path: src/models/common/message.dto.ts
// DESC: common message dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

// interface BaseResponseInterface {
//   status: boolean;
//   code: number;
//   message: string;
//   data: any;
// }

// interface MessageResponseInterface extends BaseResponseInterface {
//   data: MessageInterface;
// }

export class MessageResponseDTO {
  @ApiProperty({
    description: 'The status of the message',
    example: 'e.g. success',
  })
  @Expose({ name: 'status', toPlainOnly: true })
  @IsNotEmpty({ message: 'Status cannot be empty' })
  @IsString({ message: 'Status must be a string' })
  // @IsIn(['success', 'error'], { message: 'Status must be either success or error' })
  status: string;

  @ApiProperty({
    description: 'The code of the message',
    example: 'e.g. 200',
  })
  @Expose({ name: 'code', toPlainOnly: true })
  @IsNotEmpty({ message: 'Code cannot be empty' })
  @IsString({ message: 'Code must be a string' })
  code: string;

  @ApiProperty({
    description: 'The message of the message',
    example: 'e.g. Message successful',
  })
  @Expose({ name: 'message', toPlainOnly: true })
  @IsNotEmpty({ message: 'Message cannot be empty' })
  @IsString({ message: 'Message must be a string' })
  message: string;

  @ApiProperty({
    description: 'The data of the message',
    example: 'e.g. Message data',
  })
  @Expose({ name: 'data', toPlainOnly: true })
  // data: string | Record<string, any> | Record<string, any>[] | null;
  data: Record<string, any> | null;

  constructor(status: string, code: string, message: string, data: Record<string, any>) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
