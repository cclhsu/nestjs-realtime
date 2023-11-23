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
// WebhookClientControllerInterface.ts
interface WebhookClientControllerInterface {
    sendRequest(url: string, data: any): void;
    setHeaders(headers: Record<string, string>): void;
    setTimeout(timeout: number): void;
    closeConnection(): void;
}

export default WebhookClientControllerInterface;
```

```typescript
// WebhookClientServiceInterface.ts
interface WebhookClientServiceInterface {
    initialize(): void;
    onRequestSent(callback: (response: any) => void): void;
    onClose(callback: () => void): void;
}

export default WebhookClientServiceInterface;
```

```typescript
// WebhookServerControllerInterface.ts
interface WebhookServerControllerInterface {
    startServer(port: number): void;
    stopServer(): void;
    setRequestHandler(handler: (request: any) => void): void;
}

export default WebhookServerControllerInterface;
```

```typescript
// WebhookServerServiceInterface.ts
interface WebhookServerServiceInterface {
    initialize(): void;
    onRequestReceived(callback: (request: any) => void): void;
}

export default WebhookServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
