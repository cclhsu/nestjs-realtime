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
// RedisClientControllerInterface.ts
interface RedisClientControllerInterface {
    set(key: string, value: string): void;
    get(key: string): void;
    del(key: string): void;
    disconnect(): void;
}

export default RedisClientControllerInterface;
```

```typescript
// RedisClientServiceInterface.ts
interface RedisClientServiceInterface {
    connect(): void;
    onValueReceived(callback: (key: string, value: string) => void): void;
    onDisconnected(callback: () => void): void;
}

export default RedisClientServiceInterface;
```

```typescript
// RedisServerControllerInterface.ts
interface RedisServerControllerInterface {
    startServer(): void;
    stopServer(): void;
    set(key: string, value: string): void;
    get(key: string): void;
    del(key: string): void;
}

export default RedisServerControllerInterface;
```

```typescript
// RedisServerServiceInterface.ts
interface RedisServerServiceInterface {
    initialize(): void;
    onValueSet(callback: (key: string, value: string) => void): void;
    onValueDeleted(callback: (key: string) => void): void;
}

export default RedisServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
