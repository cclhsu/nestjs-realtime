---
title: '[MyLabel] <MyTitle>'
description: '<MyTemplate> for <MY_PROJECT>'
labels: 'kind/MyLabel'
priority: ''
assignees: ''
status: ''
date: 2022-01-01T00:00:00+08:00
url: ''
doc: ''
github: ''
ticket:
draft: true
---

# {{ TOPIC }} <!-- omit in toc -->

- [](#)
- [Install](#install)
- [Build service](#build-service)
- [Run service](#run-service)
- [Intreface](#intreface)
- [Reference](#reference)

---

## [](<URL>)

## Install

```bash

```

## Build service

```bash

```

## Run service

```bash

```

---

## Intreface

```typescript
// WebsocketClientControllerInterface.ts
interface WebsocketClientControllerInterface {
    connect(url: string): void;
    sendMessage(message: string): void;
    closeConnection(): void;
}

export default WebsocketClientControllerInterface;
```

```typescript
// WebsocketClientServiceInterface.ts
interface WebsocketClientServiceInterface {
    initialize(): void;
    onMessageReceived(callback: (message: string) => void): void;
    onClose(callback: () => void): void;
}

export default WebsocketClientServiceInterface;
```

```typescript
// WebsocketServerControllerInterface.ts
interface WebsocketServerControllerInterface {
    startServer(port: number): void;
    broadcastMessage(message: string): void;
    stopServer(): void;
}

export default WebsocketServerControllerInterface;
```

```typescript
// WebsocketServerServiceInterface.ts
interface WebsocketServerServiceInterface {
    initialize(): void;
    onClientConnect(callback: (client: WebSocket) => void): void;
    onClientDisconnect(callback: (client: WebSocket) => void): void;
    onMessageReceived(callback: (client: WebSocket, message: string) => void): void;
}

export default WebsocketServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)
- https://github.com/mokuteki225/nest-websockets-chat-boilerplate
- https://github.com/makeuseofcode/nestjs-chat-app
- https://docs.nestjs.com/websockets/gateways
- https://github.com/nestjs/nest/tree/master/sample/02-gateways
- https://github.com/nestjs/nest/tree/master/sample/16-gateways-ws
- https://github.com/idirnaitali/chat-server-with-nestjs-and-websocket
- https://dev.to/jfrancai/demystifying-nestjs-websocket-gateways-a-step-by-step-guide-to-effective-testing-1a1f

---
