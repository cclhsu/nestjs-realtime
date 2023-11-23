// Path: src/models/common/message.dto.ts
// DESC: common message dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ENVIRONMENT_TYPE_ARRAY, STAGE_TYPE_ARRAY } from '../constant';

// // Common base interface
// interface BaseInterface {
//   UUID: string; // Unique identifier for the message
//   type: MESSAGE_TYPES; // Type of message
//   action: ACTION_TYPES; // Action to be performed
//   // stage: STAGE_TYPES; // The stage of the application
//   // environment: ENVIRONMENT_TYPES; // The environment of the application
//   sender: string; // Sender of the message
//   recipient: string; // Intended recipient (relevant for unicast messages)
//   // recipients: string[]; // Intended recipients (relevant for broadcast messages)
//   recipientType: RECIPIENT_TYPES; // Type of recipient (relevant for unicast messages)
//   timestamp?: Date; // Timestamp when the message was sent (optional but useful)
// }

// // Message interface
// interface MessageInterface extends BaseInterface {
//   data: string | Record<string, any>; // Message data
//   // Additional properties
//   // metadata?: Record<string, any>;
//   // Any other message-specific properties
// }

export class MessageDTO {
  // @ApiProperty({
  //   description: UUID_MSG.message,
  //   example: UUID_MSG.example,
  // })
  // @Expose({ name: 'UUID', toPlainOnly: true })
  // @IsNotEmpty({ message: UUID_MSG.requiredMessage })
  // @IsString({ message: UUID_MSG.typeMessage })
  // @IsUUID('all', { message: UUID_MSG.errorMessage })
  @ApiProperty({
    description:
      'UUID is Unique identifier in the format "00000000-0000-0000-0000-000000000000"' +
      ' for  ' +
      MessageDTO.name,
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
    // example: UUID_MSG.example,
  })
  @Expose({ name: 'UUID', toPlainOnly: true })
  @IsNotEmpty({ message: 'UUID cannot be empty' })
  @IsString({ message: 'UUID must be a string' })
  @IsUUID('all', {
    message: 'Please enter a valid UUID format (e.g. 00000000-0000-0000-0000-000000000000)',
  })
  UUID: string;

  @ApiProperty({
    description: 'Type of message',
    example: 'e.g. TCP',
  })
  @Expose({ name: 'type', toPlainOnly: true })
  @IsNotEmpty({ message: 'Type cannot be empty' })
  @IsString({ message: 'Type must be a string' })
  type: string;

  @ApiProperty({
    description: 'The action of the message',
    example: 'e.g. send',
  })
  @Expose({ name: 'action', toPlainOnly: true })
  @IsNotEmpty({ message: 'Action cannot be empty' })
  @IsString({ message: 'Action must be a string' })
  action: string;

  @ApiProperty({
    description: 'The stage of the application',
    example: 'e.g. dev',
  })
  @Expose({ name: 'stage', toPlainOnly: true })
  @IsNotEmpty({ message: 'Stage cannot be empty' })
  @IsString({ message: 'Stage must be a string' })
  @IsIn(ENVIRONMENT_TYPE_ARRAY, { message: 'Stage must be a valid environment type' })
  stage: string;

  @ApiProperty({
    description: 'The environment of the application',
    example: 'e.g. dev',
  })
  @Expose({ name: 'environment', toPlainOnly: true })
  @IsNotEmpty({ message: 'Environment cannot be empty' })
  @IsString({ message: 'Environment must be a string' })
  @IsIn(STAGE_TYPE_ARRAY, { message: 'Environment must be a valid environment type' })
  environment: string;

  @ApiProperty({
    description: 'The sender of the message',
    example: 'e.g. user',
  })
  @Expose({ name: 'sender', toPlainOnly: true })
  @IsNotEmpty({ message: 'Sender cannot be empty' })
  @IsString({ message: 'Sender must be a string' })
  sender: string;

  @ApiProperty({
    description: 'The recipient of the message',
    example: 'e.g. user',
  })
  @Expose({ name: 'recipient', toPlainOnly: true })
  @IsNotEmpty({ message: 'Recipient cannot be empty' })
  @IsString({ message: 'Recipient must be a string' })
  recipient: string;

  @ApiProperty({
    description: 'The recipients of the message',
    example: 'e.g. user',
  })
  @Expose({ name: 'recipients', toPlainOnly: true })
  @IsNotEmpty({ message: 'Recipients cannot be empty' })
  @IsString({ message: 'Recipients must be a string' })
  recipients: string;

  @ApiProperty({
    description: 'The recipient type of the message',
    example: 'e.g. user',
  })
  @Expose({ name: 'recipientType', toPlainOnly: true })
  @IsNotEmpty({ message: 'Recipient type cannot be empty' })
  @IsString({ message: 'Recipient type must be a string' })
  recipientType: string;

  @ApiProperty({
    description: 'The timestamp of the message',
    example: 'e.g. 2021-01-01T00:00:00.000Z',
  })
  @Expose({ name: 'timestamp', toPlainOnly: true })
  @IsNotEmpty({ message: 'Timestamp cannot be empty' })
  @IsDateString()
  timestamp: Date;

  @ApiProperty({
    description: 'The data of the message',
    example: 'e.g. Hello, World!',
  })
  @Expose({ name: 'data', toPlainOnly: true })
  @IsNotEmpty({ message: 'Data cannot be empty' })
  @IsString({ message: 'Data must be a string' })
  // data: string | Record<string, any> | Record<string, any>[] | null;
  data: Record<string, any> | null;

  @ApiProperty({
    description: 'The metadata of the message',
    example: 'e.g. Hello, World!',
  })
  @Expose({ name: 'metadata', toPlainOnly: true })
  @IsNotEmpty({ message: 'Metadata cannot be empty' })
  @IsString({ message: 'Metadata must be a string' })
  metadata: Record<string, any>;

  constructor(
    UUID: string,
    type: string,
    action: string,
    stage: string,
    environment: string,
    sender: string,
    recipient: string,
    recipients: string,
    recipientType: string,
    timestamp: Date,
    data: Record<string, any>,
    metadata: Record<string, any>,
  ) {
    this.UUID = UUID;
    this.type = type;
    this.action = action;
    this.stage = stage;
    this.environment = environment;
    this.sender = sender;
    this.recipient = recipient;
    this.recipients = recipients;
    this.recipientType = recipientType;
    this.timestamp = timestamp;
    this.data = data;
    this.metadata = metadata;
  }
}
