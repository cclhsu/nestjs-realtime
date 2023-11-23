// Path: src/common/interface/message-service.interfaces.ts
// DESC: This is the main entry point for the message-service application.
'use strict';

import { MessageDTO } from '../dto';

// interface MessageInterface {
//   id: string;
//   message: string;
//   timestamp: Date;
// }

interface MessageControllerInterface {
  send(message: MessageDTO): Promise<void>; // Send a message to the server
  receive(message: MessageDTO): Promise<void>; // Receive a message from the server
  listMessages(): Promise<MessageDTO[]>; // List messages
}

interface MessageServiceInterface {
  send(message: MessageDTO): Promise<void>; // Send a message to the server
  receive(message: MessageDTO): Promise<void>; // Receive a message from the server
  listMessages(): Promise<MessageDTO[]>; // List messages
}

interface MessageClientInterface {}

interface MessageServerInterface {}

export {
  MessageControllerInterface,
  MessageServiceInterface,
  MessageClientInterface,
  MessageServerInterface,
};
