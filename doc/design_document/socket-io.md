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
// SockIOClientControllerInterface.ts
interface SocketIOClientControllerInterface {
    connectToServer(serverURL: string): void;
    emitEvent(event: string, data: any): void;
    onEvent(event: string, callback: (data: any) => void): void;
    disconnect(): void;
}

export default SocketIOClientControllerInterface;
```

```typescript
// SockIOClientServiceInterface.ts
interface SocketIOClientServiceInterface {
    initialize(): void;
    onConnected(callback: () => void): void;
    onDisconnected(callback: () => void): void;
    onEventReceived(event: string, callback: (data: any) => void): void;
}

export default SocketIOClientServiceInterface;
```

```typescript
// SockIOServerControllerInterface.ts
interface SocketIOServerControllerInterface {
    startServer(port: number): void;
    stopServer(): void;
    onConnection(callback: (socket: any) => void): void;
}

export default SocketIOServerControllerInterface;
```

```typescript
// SockIOServerServiceInterface.ts
interface SocketIOServerServiceInterface {
    initialize(): void;
    onClientConnected(callback: (socket: any) => void): void;
    onClientDisconnected(callback: (socket: any) => void): void;
    onEventReceived(event: string, callback: (socket: any, data: any) => void): void;
}

export default SocketIOServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
