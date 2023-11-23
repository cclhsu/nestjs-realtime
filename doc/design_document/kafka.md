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
npm install @nestjs/microservices kafkajs class-validator class-transformer
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
// KafkaClientControllerInterface.ts
interface KafkaClientControllerInterface {
    produceMessage(topic: string, message: string): void;
    consumeFromTopic(topic: string): void;
    closeConnection(): void;
}

export default KafkaClientControllerInterface;
```

```typescript
// KafkaClientServiceInterface.ts
interface KafkaClientServiceInterface {
    initialize(): void;
    onMessageReceived(callback: (message: string) => void): void;
    onClose(callback: () => void): void;
}

export default KafkaClientServiceInterface;
```

```typescript
// KafkaServerControllerInterface.ts
interface KafkaServerControllerInterface {
    startServer(): void;
    stopServer(): void;
    createTopic(topic: string): void;
}

export default KafkaServerControllerInterface;
```

```typescript
// KafkaServerServiceInterface.ts
interface KafkaServerServiceInterface {
    initialize(): void;
    onMessageReceived(callback: (topic: string, message: string) => void): void;
    onTopicCreated(callback: (topic: string) => void): void;
}

export default KafkaServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
