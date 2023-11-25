import { MessageDTO } from '../dto/message.dto';
// Path: src/common/interface/producer-service.interfaces.ts
// DESC: This is the main entry point for the producer-service application.
('use strict');

// interface ProducerInterface {
//   id: string;
//   producer: string;
//   timestamp: Date;
// }

interface ProducerControllerInterface {
//   CreateTopic(): Promise<void>;
//   DeleteTopic(): Promise<void>;
  Produce(messageDTO: MessageDTO): Promise<void>;
}

interface ProducerServiceInterface {
//   CreateTopic(topic: string): Promise<void>;
//   DeleteTopic(topic: string): Promise<void>;
  Produce(messageDTO: MessageDTO): Promise<void>;
}

export { ProducerControllerInterface, ProducerServiceInterface };
