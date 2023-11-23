// Path: src/websocket/factory/websocket-client/websocket-client.module.ts
// DESC: This is the main entry point for the websocket-client application.
'use strict';
import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  MessageDTO,
  MessageResponseDTO,
  ConnectionDTO,
  ConnectionResponseDTO,
} from './../../../common/dto';
import {
  MessageControllerInterface,
  ConnectionControllerInterface,
} from './../../../common/interface';
import { WebsocketClientService } from './websocket-client.service';

@ApiTags('websocket-client')
@Controller('websocket-client')
export class WebsocketClientController {
  private logger: Logger = new Logger(WebsocketClientController.name);
  constructor(private readonly websocketClientService: WebsocketClientService) {}

  // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/websocket-client/'
  @ApiOperation({ summary: 'Send a message to a websocket' })
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Message Data',
    type: MessageDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Message Data Response',
    type: MessageResponseDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    content: { 'application/json': {} },
  })
  @Post('message/send')
  send(@Body() message: MessageDTO): Promise<void> {
    this.logger.log(`Sending message: ${JSON.stringify(message)}`);
    return this.websocketClientService.send(message);
  }

  // // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/websocket-client/message/receive' -d '{"id": "1234567890", "type": "test", "data": {"message": "Hello, World!"}}' | jq
  // @ApiOperation({ summary: 'Receive a message from a websocket' })
  // @ApiProduces('application/json')
  // @ApiBody({
  //   description: 'Message Data',
  //   type: MessageDTO,
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Message Data Response',
  //   type: MessageResponseDTO,
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal Server Error',
  //   content: { 'application/json': {} },
  // })
  // @Post('message/receive')
  // receive(@Body() message: MessageDTO): Promise<void> {
  //   this.logger.log(`Receiving message: ${JSON.stringify(message)}`);
  //   return this.websocketClientService.receive(message);
  // }

  // // curl -s -X 'GET' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3002/websocket-client/'
  // @ApiOperation({ summary: 'List messages' })
  // @ApiProduces('application/json')
  // @ApiResponse({
  //   status: 200,
  //   description: 'List of Message Response',
  //   type: MessageDTO,
  //   isArray: true,
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Internal Server Error',
  //   content: { 'application/json': {} },
  // })
  // @Get('message') // Differentiating the path
  // listMessages(): Promise<MessageDTO[]> {
  //   this.logger.log(`Listing messages`);
  //   return this.websocketClientService.listMessages();
  // }
}
