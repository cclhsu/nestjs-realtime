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

## Intreface

```typescript
// WebRTCClientControllerInterface.ts
interface WebRTCClientControllerInterface {
    createPeerConnection(config: RTCConfiguration): void;
    createDataChannel(label: string, options?: RTCDataChannelInit): void;
    addIceCandidate(candidate: RTCIceCandidateInit): void;
    setLocalDescription(description: RTCSessionDescriptionInit): void;
    setRemoteDescription(description: RTCSessionDescriptionInit): void;
    closeConnection(): void;
}

export default WebRTCClientControllerInterface;
```

```typescript
// WebRTCClientServiceInterface.ts
interface WebRTCClientServiceInterface {
    initialize(): void;
    onDataChannelCreated(callback: (channel: RTCDataChannel) => void): void;
    onIceCandidate(callback: (candidate: RTCIceCandidate) => void): void;
    onConnectionClosed(callback: () => void): void;
}

export default WebRTCClientServiceInterface;
```

```typescript
// WebRTCServerControllerInterface.ts
interface WebRTCServerControllerInterface {
    startServer(port: number): void;
    stopServer(): void;
    createPeerConnection(config: RTCConfiguration): void;
    addIceCandidate(clientId: string, candidate: RTCIceCandidateInit): void;
    setLocalDescription(clientId: string, description: RTCSessionDescriptionInit): void;
    setRemoteDescription(clientId: string, description: RTCSessionDescriptionInit): void;
}

export default WebRTCServerControllerInterface;
```

```typescript
// WebRTCServerServiceInterface.ts
interface WebRTCServerServiceInterface {
    initialize(): void;
    onClientConnected(callback: (clientId: string) => void): void;
    onClientDisconnected(callback: (clientId: string) => void): void;
    onDataChannelCreated(callback: (clientId: string, channel: RTCDataChannel) => void): void;
    onIceCandidate(callback: (clientId: string, candidate: RTCIceCandidate) => void): void;
    onConnectionClosed(callback: (clientId: string) => void): void;
}

export default WebRTCServerServiceInterface;
```

---

## Reference

- [](<URL>)
- [Company/Project](<https://{{ GITHUB_PROJECT }}.io/>)
- [Documentation](<https://{{ GITHUB_PROJECT }}.io/doc>)
- [Github](<https://github.com/{{ GITHUB_USER }}/{{ GITHUB_PROJECT }}>)
- [Wikipedia](<https://en.wikipedia.org/wiki/{{ TOPIC }}>)

---
