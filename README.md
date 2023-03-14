## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
yarn
```

## Issues
### There are some problems with graphql-upload dependencies
#### Solutions: 
##### #1: Change `import("koa").Context` to `any` in (~\learn-nestjs\node_modules\graphql-upload\graphqlUploadKoa.js) [Can use patch-package]
##### #2: install @types/koa as dev dependencies


## Naming convention
[Guide](https://narhakobyan.github.io/awesome-nest-boilerplate/docs/naming-cheatsheet.html#english-language)

## Migration
[Guide](https://wanago.io/2022/07/25/api-nestjs-database-migrations-typeorm/)
```bash
./node_modules/.bin/typeorm migration:create ./migrations/Init 

yarn ts-node ./node_modules/typeorm/cli migration:generate ./migrations/Init -d ./typeOrm.config.ts
./node_modules/.bin/typeorm migration:generate ./src/migrations/Init -d ./typeOrm.config.ts
yarn typeorm migration:generate ./src/migrations/Init -d ./typeOrm.config.ts

./node_modules/.bin/typeorm -d ./typeOrm.config.ts migration:run
yarn ts-node ./node_modules/typeorm/cli -d ./typeOrm.config.ts migration:run

node_modules/.bin/typeorm migration:revert
yarn ts-node ./node_modules/typeorm/cli -d ./typeOrm.config.ts migration:revert

```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn dev
$ yarn start:dev

# production mode
$ yarn prod
$ yarn start:prod
```

## Deploy docker
```bash
docker build -t be-server:1.0 .
docker build -t email-server:1.0 .
docker images
docker run -p 3005:3005 be-server:1.0
docker run -p 3006:3006 email-server:1.0

docker-compose build --no-cache
docker-compose up --build
docker-compose up --force-recreate
docker-compose up

docker commit learn-nestjs-db-service-1 mysql-learn-nestjs:8.0.32
docker tag mysql-learn-nestjs:8.0.32 ngodanghai9x/mysql-learn-nestjs:8.0.32
docker push ngodanghai9x/mysql-learn-nestjs:8.0.32
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
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
