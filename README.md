## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Migration
[Guide](https://wanago.io/2022/07/25/api-nestjs-database-migrations-typeorm/)
```bash
./node_modules/.bin/typeorm migration:create ./migrations/Init 

npx ts-node ./node_modules/typeorm/cli migration:generate ./migrations/Init -d ./typeOrm.config.ts
./node_modules/.bin/typeorm migration:generate ./src/migrations/Init -d ./typeOrm.config.ts
npx typeorm migration:generate ./src/migrations/Init -d ./typeOrm.config.ts

./node_modules/.bin/typeorm -d ./typeOrm.config.ts migration:run
npx ts-node ./node_modules/typeorm/cli -d ./typeOrm.config.ts migration:run

node_modules/.bin/typeorm migration:revert
npx ts-node ./node_modules/typeorm/cli -d ./typeOrm.config.ts migration:revert

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev
$ npm run start:dev

# production mode
$ npm run prod
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Structure
- Auth module:
- User module: 
  - entity
  - controller
  - service
- Common module:
  - decorators
  - filters
  - guards
  - helpers
  - interceptors
  - middlewares
  - pipes
