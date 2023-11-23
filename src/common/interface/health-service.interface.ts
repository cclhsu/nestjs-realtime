// Path: src/common/interface/health-service.interface.ts
// DESC: This is the main entry point for the health-service application.
'use strict';

import { HealthResponseDTO } from '../dto/health-response.dto';

interface HealthControllerInterface {
  health(): Promise<HealthResponseDTO>; // Get the health/status of the server
}

interface HealthServiceInterface {
  health(): Promise<HealthResponseDTO>; // Get the health/status of the server
}

export { HealthControllerInterface, HealthServiceInterface };
