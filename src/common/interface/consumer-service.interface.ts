// Path: src/common/interface/consumer-service.interfaces.ts
// DESC: This is the main entry point for the consumer-service application.
'use strict';

// interface ConsumerInterface {
//   id: string;
//   consumer: string;
//   timestamp: Date;
// }

interface ConsumerControllerInterface {}

interface ConsumerServiceInterface {
  Consume(): Promise<void>;
}

export { ConsumerControllerInterface, ConsumerServiceInterface };
