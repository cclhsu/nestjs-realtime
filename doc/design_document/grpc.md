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
// GrpcClientControllerInterface.ts
interface GrpcClientControllerInterface {
    callMethod(methodName: string, request: any): void;
    setEndpoint(endpoint: string): void;
}

export default GrpcClientControllerInterface;
```

```typescript
// GrpcClientServiceInterface.ts
interface GrpcClientServiceInterface {
    initialize(): void;
    onResponseReceived(callback: (response: any) => void): void;
}

export default GrpcClientServiceInterface;
```

```typescript
// GrpcServerControllerInterface.ts
interface GrpcServerControllerInterface {
    startServer(port: number): void;
    stopServer(): void;
    addService(service: any): void;
}

export default GrpcServerControllerInterface;
```

```typescript
// GrpcServerServiceInterface.ts
interface GrpcServerServiceInterface {
    initialize(): void;
    onRequestReceived(callback: (request: any) => void): void;
}

export default GrpcServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
