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
// ServerSentEventClientControllerInterface.ts
interface ServerSentEventClientControllerInterface {
    connectToServer(url: string): void;
    subscribeToEvent(event: string): void;
    unsubscribeFromEvent(event: string): void;
    disconnect(): void;
}

export default ServerSentEventClientControllerInterface;
```

```typescript
// ServerSentEventClientServiceInterface.ts
interface ServerSentEventClientServiceInterface {
    initialize(): void;
    onEventReceived(event: string, callback: (data: any) => void): void;
    onClose(callback: () => void): void;
}

export default ServerSentEventClientServiceInterface;
```

```typescript
// ServerSentEventServerControllerInterface.ts
interface ServerSentEventServerControllerInterface {
    startServer(port: number): void;
    stopServer(): void;
    broadcastEvent(event: string, data: any): void;
}

export default ServerSentEventServerControllerInterface;
```

```typescript
// ServerSentEventServerServiceInterface.ts
interface ServerSentEventServerServiceInterface {
    initialize(): void;
    onClientConnected(callback: (client: any) => void): void;
    onClientDisconnected(callback: (client: any) => void): void;
}

export default ServerSentEventServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
