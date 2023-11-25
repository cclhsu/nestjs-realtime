// Path: src/kafka/factory/kafka-server/kafka-server.service.ts
// DESC: This is the main entry point for the kafka-server application.
'use strict';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, logLevel, Producer } from 'kafkajs';
import { MessageDTO } from './../../../common/dto';

@Injectable()
export class KafkaServerService {
  private logger: Logger = new Logger(KafkaServerService.name);
  private kafka: Kafka;
  private broker: string;
  private producer: Producer;
  private topics: string[] = [];

  constructor(private readonly configService: ConfigService) {
    this.logger.log('Kafka Server initialized');
    this.broker = this.initializeKafkaServerUrl();
    this.kafka = new Kafka({
      logLevel: logLevel.INFO,
      brokers: [this.broker],
    });
    this.producer = this.kafka.producer();
    this.topics = ['tasks'];
    this.logger.log('Kafka producer is running');
  }

  private initializeKafkaServerUrl(): string {
    const KAFKA_HOST: string =
      this.configService.get<string>('KAFKA_HOST') || process.env.KAFKA_HOST || 'localhost';
    const KAFKA_PORT: number =
      this.configService.get<number>('KAFKA_PORT') || Number(process.env.KAFKA_PORT) || 9092;
    return `${KAFKA_HOST}:${KAFKA_PORT}`;
  }

  async produce(message: MessageDTO): Promise<void> {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: this.topics[0],
        messages: [{ value: JSON.stringify(message) }],
      });
      this.logger.log('Sent message to Kafka:', message);
    } catch (error) {
      this.logger.error('Error producing message:', error);
    }
    // } finally {
    //   await this.producer.disconnect();
    // }
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }
}
