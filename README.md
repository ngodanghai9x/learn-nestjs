## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
yarn
```

## Cache 
[Set up Cache Manager](https://www.tomray.dev/nestjs-caching-redis)
[Cache Interceptor](https://www.codewithvlad.com/blog/nestjs-caching-with-redis)

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

mysql -uroot --password="root" -h 127.0.0.1 -P 3306
mysql -u mysql --password="mysql" -h 127.0.0.1 -P 3306
mysql -u <username> -h <hostname> -P <port> <database> -p
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

docker exec -it learn-nestjs-db-service-1 bin/bash
docker exec -it learn-nestjs-be-service-1 /bin/sh
docker logs --tail 100 -f learn-nestjs-be-service-1

docker commit learn-nestjs-db-service-1 mysql-learn-nestjs:8.0.32
docker tag mysql-learn-nestjs:8.0.32 ngodanghai9x/mysql-learn-nestjs:8.0.32
docker push ngodanghai9x/mysql-learn-nestjs:8.0.32

docker pull postgres:15.2
docker run --name postgres_container -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=postgres -e POSTGRES_USER=postgres -d postgres:15.2

docker pull mysql:8.0.32
docker run --name mysql_container -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0.32

docker pull redis:7.0.9-alpine
docker run --name redis_container -p 6379:6379 -d redis:7.0.9-alpine
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
