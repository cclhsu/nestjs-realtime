// Path: src/models/common/connection.dto.ts
// DESC: common connection dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ENVIRONMENT_TYPE_ARRAY, STAGE_TYPE_ARRAY } from '../constant';

// // Connection interface
// interface ConnectionInterface {
//   UUID: string; // Unique identifier for the connection
//   clientId: string; // ID of the connected client
//   host: string; // Host of the connected client
//   port: number; // Port of the connected client
//   connection: any; // Client's connection object
//   endpoint: string; // Client's endpoint
//   secret: string; // Client's secret for secure communication
//   connected: boolean; // Indicates if the client is connected
//   registered: boolean; // Indicates if the client is registered
//   subscribed: boolean; // Indicates if the client is subscribed
//   expiration: Date; // Date when the connection is expected to expire
//   // Additional properties
//   // trigger: string;
//   // action: string;
//   // Any other connection-specific properties
// }

export class ConnectionDTO {
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
      ConnectionDTO.name,
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
    description: 'Type of connection',
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
    description: 'Sender of the connection',
    example: 'e.g. john.doe',
  })
  @Expose({ name: 'sender', toPlainOnly: true })
  @IsNotEmpty({ message: 'Sender cannot be empty' })
  @IsString({ message: 'Sender must be a string' })
  sender: string;

  @ApiProperty({
    description: 'Timestamp when the connection was established',
    example: '2023-08-15T12:00:00Z',
  })
  @Expose({ name: 'timestamp', toPlainOnly: true })
  @IsNotEmpty({ message: 'Timestamp cannot be empty' })
  @IsDateString()
  timestamp: Date;

  constructor(
    UUID: string,
    type: string,
    stage: string,
    environment: string,
    sender: string,
    timestamp: Date,
  ) {
    this.UUID = UUID;
    this.type = type;
    this.stage = stage;
    this.environment = environment;
    this.sender = sender;
    this.timestamp = timestamp;
  }
}
