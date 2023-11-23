// Path: src/websocket/factory/websocket-server/websocket-server.controller.ts
// DESC: This is the main entry point for the websocket-server application.
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
import { WebsocketServerService } from './websocket-server.service';

@ApiTags('websocket')
@Controller('websocket')
export class WebsocketServerController {
  private logger: Logger = new Logger(WebsocketServerController.name);
  constructor(private readonly websocketServerService: WebsocketServerService) {}

  // // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/websocket/'
  // @ApiOperation({ summary: 'Send a message to a websocket' })
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
  // @Post('message/send')
  // send(@Body() message: MessageDTO): Promise<void> {
  //   this.logger.log(`Sending message: ${JSON.stringify(message)}`);
  //   return this.websocketServerService.send(message);
  // }

  // // curl -s -X 'POST' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/websocket/'
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
  //   return this.websocketServerService.receive(message);
  // }

  // // curl -s -X 'GET' -H 'Content-Type: application/json' -H 'accept: application/json' 'http://0.0.0.0:3001/websocket/'
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
  //   return this.websocketServerService.listMessages();
  // }
}
