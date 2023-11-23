// Path: src/common/interface/conection-service.interface.ts
// DESC: This is the main entry point for the connection-service application.
'use strict';

import { ConnectionDTO } from '../dto';
import { ConnectionResponseDTO } from '../dto/connection-response.dto';

// interface ConnectionInterface {
//   id: string;
//   name: string;
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
//   type: string;
//   status: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

interface ConnectionControllerInterface {
  connect(connection: ConnectionDTO): Promise<ConnectionResponseDTO>; // Connect to the server
  disconnect(connectionID: string): Promise<void>; // Disconnect from the server
  listConnections(): Promise<ConnectionDTO[]>; // List all connections
}

interface ConnectionServiceInterface {
  connect(connection: ConnectionDTO): Promise<ConnectionResponseDTO>; // Connect to the server
  disconnect(connectionID: string): Promise<void>; // Disconnect from the server
  listConnections(): Promise<ConnectionDTO[]>; // List all connections
}

interface ConnectionClientInterface {}

interface ConnectionServerInterface {}

export {
  ConnectionControllerInterface,
  ConnectionServiceInterface,
  ConnectionClientInterface,
  ConnectionServerInterface,
};
