// Path: src/common/interface/registration-service.interface.ts
// DESC: This is the main entry point for the registration-service application.
'use strict';

import { RegistrationDTO, RegistrationResponseDTO } from '../dto';

// interface RegistrationInterface {
//   id: string;
//   registration: string;
//   timestamp: Date;
// }

interface RegistrationControllerInterface {
  register(registration: RegistrationDTO): Promise<RegistrationResponseDTO>; // Register with the server
  unregister(registrationID: string): Promise<void>; // Unregister from the server
  listRegistrations(): Promise<RegistrationDTO[]>; // List registrations with the server
  updateRegistration(
    registrationID: string,
    registration: RegistrationDTO,
  ): Promise<RegistrationResponseDTO>; // Update registration with the server
}

interface RegistrationServiceInterface {
  register(registration: RegistrationDTO): Promise<RegistrationResponseDTO>; // Register with the server
  unregister(registrationID: string): Promise<void>; // Unregister from the server
  listRegistrations(): Promise<RegistrationDTO[]>; // List registrations with the server
  updateRegistration(
    registrationID: string,
    registration: RegistrationDTO,
  ): Promise<RegistrationResponseDTO>; // Update registration with the server
}

interface RegistrationClientInterface {}

interface RegistrationServerInterface {}

export {
  RegistrationControllerInterface,
  RegistrationServiceInterface,
  RegistrationClientInterface,
  RegistrationServerInterface,
};
