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
// IftttClientControllerInterface.ts
interface IftttClientControllerInterface {
    send(event: string, data: any): void;
    setWebhookKey(apiKey: string): void;
}

export default IftttClientControllerInterface;
```

```typescript
// IftttClientServiceInterface.ts
interface IftttClientServiceInterface {
    initialize(): void;
    onEventTriggered(callback: (response: any) => void): void;
}

export default IftttClientServiceInterface;
```

```typescript
// IftttServerControllerInterface.ts
interface IftttServerControllerInterface {
    startServer(port: number): void;
    stopServer(): void;
    setEventHandler(handler: (event: string, data: any) => void): void;
}

export default IftttServerControllerInterface;
```

```typescript
// IftttServerServiceInterface.ts
interface IftttServerServiceInterface {
    initialize(): void;
}

export default IftttServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
