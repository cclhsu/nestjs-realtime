// Path: src/models/common/connection.dto.ts
// DESC: common connection dto
'use strict';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsIn, IsNotEmpty, IsString, IsUUID } from 'class-validator';

// interface HealthInterface {
//   status: string; // The health/status of the server
//   code: number; // The status code for the health/status
//   timestamp: Date; // The timestamp when the health/status was updated
// }

export class HealthDTO {}
