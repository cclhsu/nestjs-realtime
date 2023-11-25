// Path: src/kafka/factory/kafka-client/kafka-client.service.ts
// DESC: This is the main entry point for the kafka-client application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, logLevel, Consumer } from 'kafkajs';
import { MessageDTO } from './../../../common/dto';

@Injectable()
export class KafkaClientService {
  private logger: Logger = new Logger(KafkaClientService.name);
  // private readonly KafkaServerUrl: string;
  private kafka: Kafka;
  private broker: string;
  private groupId: string;
  private consumer: Consumer;
  private topics: string[] = [];

  constructor(private readonly configService: ConfigService) {
    this.logger.log('Kafka Client initialized');

    this.broker = this.initializeKafkaServerUrl();
    this.kafka = new Kafka({
      logLevel: logLevel.INFO,
      brokers: [this.broker],
    });
    this.groupId = this.initializeKafkaGroupId();
    this.consumer = this.kafka.consumer({ groupId: this.groupId });
    this.topics = ['tasks'];
    this.logger.log('Kafka consumer is running');

    this.consume(async (message) => {
      await this.logger.log(`Received message from Kafka: ${JSON.stringify(message)}`);
    });
  }

  private initializeKafkaServerUrl(): string {
    const KAFKA_HOST: string =
      this.configService.get<string>('KAFKA_HOST') || process.env.KAFKA_HOST || 'localhost';
    const KAFKA_PORT: number =
      this.configService.get<number>('KAFKA_PORT') || Number(process.env.KAFKA_PORT) || 9092;
    return `${KAFKA_HOST}:${KAFKA_PORT}`;
  }

  private initializeKafkaGroupId(): string {
    const KAFKA_GROUP_ID: string =
      this.configService.get<string>('KAFKA_GROUP_ID') ||
      process.env.KAFKA_GROUP_ID ||
      'kafka-group';
    return `${KAFKA_GROUP_ID}`;
  }

  async consume(handleMessage: (msg: MessageDTO) => void) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: this.topics[0], fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          if (message.value === null) {
            return;
          }

          const parsedMessage: MessageDTO = JSON.parse(message.value.toString());
          console.log('Received message from Kafka:', {
            topic,
            partition,
            key: message.key?.toString(),
            value: message.value?.toString(),
          });

          handleMessage(parsedMessage);
        },
      });
    } catch (error) {
      console.error('Error consuming messages:', error);
      // Handle the error appropriately, e.g., reconnect, stop the consumer, etc.
    }
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }
}
