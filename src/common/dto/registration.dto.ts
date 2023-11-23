// Path: src/models/common/registration.dto.ts
// DESC: common registration dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsIn, IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';
import { ENVIRONMENT_TYPE_ARRAY, STAGE_TYPE_ARRAY } from '../constant';

// interface RegistrationInterface {
//   UUID: string; // Unique identifier for the registration
//   type: string; // Type of registration
//   stage: string; // The stage of the application
//   environment: string; // The environment of the application
//   sender: string; // Sender of the registration (client, server, etc.)
//   timestamp: Date; // Timestamp when the registration was established
//   callbackURL: string; // Callback URL for the registration
//   subscriptions: string[]; // List of subscriptions for the registration
//   expires: Date; // Timestamp when the registration expires
//   secret: string; // Secret for the registration
//   state: string; // State of the registration (active, inactive, expired)
// }

export class RegistrationDTO {
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
      RegistrationDTO.name,
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
    description: 'Type of registration',
    example: 'e.g. TCP',
  })
  @Expose({ name: 'type', toPlainOnly: true })
  @IsNotEmpty({ message: 'Type cannot be empty' })
  @IsString({ message: 'Type must be a string' })
  type: string;

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
    description: 'Sender of the registration',
    example: 'e.g. john.doe',
  })
  @Expose({ name: 'sender', toPlainOnly: true })
  @IsNotEmpty({ message: 'Sender cannot be empty' })
  @IsString({ message: 'Sender must be a string' })
  sender: string;

  @ApiProperty({
    description: 'Timestamp when the registration was established',
    example: 'e.g. 2021-01-01T00:00:00.000Z',
  })
  @Expose({ name: 'timestamp', toPlainOnly: true })
  @IsNotEmpty({ message: 'Timestamp cannot be empty' })
  @IsDateString()
  timestamp: Date;

  @ApiProperty({
    description: 'Callback URL for the registration',
    example: 'e.g. https://example.com/callback',
  })
  @Expose({ name: 'callbackURL', toPlainOnly: true })
  @IsNotEmpty({ message: 'Callback URL cannot be empty' })
  @IsString({ message: 'Callback URL must be a string' })
  @IsUrl({ require_protocol: true }, { message: 'Callback URL must be a valid URL' })
  callbackURL: string;

  @ApiProperty({
    description: 'List of subscriptions for the registration',
    example: 'e.g. ["00000000-0000-0000-0000-000000000000"]',
  })
  @Expose({ name: 'subscriptions', toPlainOnly: true })
  @IsNotEmpty({ message: 'Subscriptions cannot be empty' })
  @IsString({ message: 'Subscriptions must be a string' })
  subscriptions: string[];

  @ApiProperty({
    description: 'Timestamp when the registration expires',
    example: 'e.g. 2021-01-01T00:00:00.000Z',
  })
  @Expose({ name: 'expires', toPlainOnly: true })
  @IsNotEmpty({ message: 'Expires cannot be empty' })
  @IsDateString()
  expires: Date;

  @ApiProperty({
    description: 'Secret for the registration',
    example: 'e.g. 00000000-0000-0000-0000-000000000000',
  })
  @Expose({ name: 'secret', toPlainOnly: true })
  @IsNotEmpty({ message: 'Secret cannot be empty' })
  @IsString({ message: 'Secret must be a string' })
  secret: string;

  @ApiProperty({
    description: 'State of the registration',
    example: 'e.g. active',
  })
  @Expose({ name: 'state', toPlainOnly: true })
  @IsNotEmpty({ message: 'State cannot be empty' })
  @IsString({ message: 'State must be a string' })
  state: string;

  constructor(
    UUID: string,
    type: string,
    stage: string,
    environment: string,
    sender: string,
    timestamp: Date,
    callbackURL: string,
    subscriptions: string[],
    expires: Date,
    secret: string,
    state: string,
  ) {
    this.UUID = UUID;
    this.type = type;
    this.stage = stage;
    this.environment = environment;
    this.sender = sender;
    this.timestamp = timestamp;
    this.callbackURL = callbackURL;
    this.subscriptions = subscriptions;
    this.expires = expires;
    this.secret = secret;
    this.state = state;
  }
}
