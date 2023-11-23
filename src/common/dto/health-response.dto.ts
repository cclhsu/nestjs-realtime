// Path: src/models/common/health.dto.ts
// DESC: common health dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

// interface HealthResponseInterface {
//   status: string; // Status of the health (success, failure)
//   code: number; // Status code for the health
//   message: string; // Message for the health
//   data: HealthInterface; // Data for the health
// }

export class HealthResponseDTO {
  @ApiProperty({
    description: 'The status of the health',
    example: 'e.g. success',
  })
  @Expose({ name: 'status', toPlainOnly: true })
  @IsNotEmpty({ message: 'Status cannot be empty' })
  @IsString({ message: 'Status must be a string' })
  status: string;

  @ApiProperty({
    description: 'The code of the health',
    example: 'e.g. 200',
  })
  @Expose({ name: 'code', toPlainOnly: true })
  @IsNotEmpty({ message: 'Code cannot be empty' })
  @IsString({ message: 'Code must be a string' })
  code: string;

  @ApiProperty({
    description: 'The message of the health',
    example: 'e.g. Health successful',
  })
  @Expose({ name: 'message', toPlainOnly: true })
  @IsNotEmpty({ message: 'Message cannot be empty' })
  @IsString({ message: 'Message must be a string' })
  message: string;

  @ApiProperty({
    description: 'The data of the health',
    example: 'e.g. Health data',
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
