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
// WebpushClientControllerInterface.ts
interface WebpushClientControllerInterface {
    subscribeUser(endpoint: string, keys: any): void;
    unsubscribeUser(endpoint: string): void;
    sendNotification(subscription: any, payload: any): void;
}

export default WebpushClientControllerInterface;
```

```typescript
// WebpushClientServiceInterface.ts
interface WebpushClientServiceInterface {
    initialize(): void;
    onNotificationReceived(callback: (notification: any) => void): void;
}

export default WebpushClientServiceInterface;
```

```typescript
// WebpushServerControllerInterface.ts
interface WebpushServerControllerInterface {
    startServer(port: number): void;
    stopServer(): void;
}

export default WebpushServerControllerInterface;
```

```typescript
// WebpushServerServiceInterface.ts
interface WebpushServerServiceInterface {
    initialize(): void;
    onUserSubscribed(callback: (subscription: any) => void): void;
    onUserUnsubscribed(callback: (endpoint: string) => void): void;
}

export default WebpushServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
