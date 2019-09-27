# Heros Inc

This is only an exercise in applied system design.

## About

Imagine we're creating an ERP platform for super heroes. Our business model is focused on providing municipalities with next-gen tools for emergency response. The platform will have LOB functionality for intake and dispatch, and will use use sophisticated mixed integer algorithms to optimize the scheduling preferences of teams of heroes.

## Technical Objectives

Explore:

- using [`Nx`](https://nx.dev) for managing TypeScript monorepos
- using [`TypeORM`](https://typeorm.io) with [`PostgreSQL`](https://www.postgresql.org/)
- using [`mosquitto`](https://mosquitto.org/) (MQTT broker) over websockets

Expand:

- React `lazy` + `suspense` patterns
- custom `hooks`
- use `cypress` for system testing

### Dev Quick Start

Clone the repo:

```sh
git clone https://github.com/eckdanny/heroes-inc.git && cd $_
```

Start backing services:

```sh
docker-compose up -d
```

Start the apps:

```sh
nx serve api
nx serve event-listener --port 0
nx serve dispatch
```

Direct your browser to [`http://localhost:4200/`](http://localhost:4200/)
