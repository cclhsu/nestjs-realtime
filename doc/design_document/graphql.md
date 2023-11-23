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
// GraphQLClientControllerInterface.ts
interface GraphQLClientControllerInterface {
    query(query: string, variables: any): void;
    mutate(mutation: string, variables: any): void;
    setEndpoint(endpoint: string): void;
}

export default GraphQLClientControllerInterface;
```

```typescript
// GraphQLClientServiceInterface.ts
interface GraphQLClientServiceInterface {
    initialize(): void;
    onResponseReceived(callback: (response: any) => void): void;
}

export default GraphQLClientServiceInterface;
```

```typescript
// GraphQLServerControllerInterface.ts
interface GraphQLServerControllerInterface {
    startServer(port: number): void;
    stopServer(): void;
    setSchema(schema: any): void;
}

export default GraphQLServerControllerInterface;
```

```typescript
// GraphQLServerServiceInterface.ts
interface GraphQLServerServiceInterface {
    initialize(): void;
    onRequestReceived(callback: (request: any) => void): void;
}

export default GraphQLServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
