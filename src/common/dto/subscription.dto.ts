// Path: src/models/common/subscription.dto.ts
// DESC: common subscription dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

// interface SubscriptionInterface {
//   UUID: string; // Unique identifier for the subscription
//   type: string; // Type of subscription
//   stage: string; // The stage of the application
//   environment: string; // The environment of the application
//   sender: string; // Sender of the subscription
//   timestamp: Date; // Timestamp when the subscription was established
// }

// // Subscription interface
// interface SubscriptionInterface {
//   UUID: string; // Unique identifier for the subscription
//   clientId: string; // ID of the subscribing client
//   topic: string; // The topic to which the client is subscribed
//   callback: (from: string, message: string) => void; // Function to handle incoming messages
//   endpoint: string; // Client's endpoint
//   secret: string; // Client's secret for secure communication
//   active: boolean; // Indicates if the subscription is active
//   expiration: Date; // Date when the subscription expires
//   // Additional properties
//   // trigger: string;
//   // action: string;
//   // Any other subscription-specific properties
// }

export class SubscriptionDTO {
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
      SubscriptionDTO.name,
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
    description: 'ID of the subscribing client',
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'clientId', toPlainOnly: true })
  @IsNotEmpty({ message: 'clientId cannot be empty' })
  @IsString({ message: 'clientId must be a string' })
  clientId: string;

  @ApiProperty({
    description: 'The topic to which the client is subscribed',
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'topic', toPlainOnly: true })
  @IsNotEmpty({ message: 'topic cannot be empty' })
  @IsString({ message: 'topic must be a string' })
  topic: string;

  @ApiProperty({
    description: 'Function to handle incoming messages',
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'callback', toPlainOnly: true })
  @IsNotEmpty({ message: 'callback cannot be empty' })
  @IsString({ message: 'callback must be a string' })
  callback: (from: string, message: string) => void;

  @ApiProperty({
    description: "Client's endpoint",
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'endpoint', toPlainOnly: true })
  @IsNotEmpty({ message: 'endpoint cannot be empty' })
  @IsString({ message: 'endpoint must be a string' })
  endpoint: string;

  @ApiProperty({
    description: "Client's secret for secure communication",
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'secret', toPlainOnly: true })
  @IsNotEmpty({ message: 'secret cannot be empty' })
  @IsString({ message: 'secret must be a string' })
  secret: string;

  @ApiProperty({
    description: 'Indicates if the subscription is active',
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'active', toPlainOnly: true })
  @IsNotEmpty({ message: 'active cannot be empty' })
  @IsString({ message: 'active must be a string' })
  active: boolean;

  @ApiProperty({
    description: 'Date when the subscription expires',
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'expiration', toPlainOnly: true })
  @IsNotEmpty({ message: 'expiration cannot be empty' })
  @IsString({ message: 'expiration must be a string' })
  expiration: Date;

  constructor(
    UUID: string,
    clientId: string,
    topic: string,
    callback: (from: string, message: string) => void,
    endpoint: string,
    secret: string,
    active: boolean,
    expiration: Date,
  ) {
    this.UUID = UUID;
    this.clientId = clientId;
    this.topic = topic;
    this.callback = callback;
    this.endpoint = endpoint;
    this.secret = secret;
    this.active = active;
    this.expiration = expiration;
  }
}
