// Path: src/websocket/factory/websocket-client/websocket-client.interface.ts
// DESC: This is the interface for the websocket-client application.
'use strict';

// import { MessageDTO } from 'src/websocket/dto/message.dto';

// import { } from '../../dto';

interface WebsocketClientInterface {
  sendMessage(message: string): void;
  sendEvent(event: string): void;
  sendHealth(): void;
}

export { WebsocketClientInterface };
