# NestJS API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">API desenvolvida com <b>NestJS</b> para estudo e prática de construção de aplicações server-side escaláveis e eficientes.</p>

## Introdução

Este projeto tem como objetivo aprofundar o conhecimento em **NestJS**. Desenvolvido de maneira didática, ele cobre diversos conceitos essenciais, como autenticação, manipulação de dados, e segurança.

## Funcionalidades

- **Segurança e Autenticação**
  - Autenticação via JWT com controle de acesso (RBAC).
  - Implementação de Guards e uso de Decorators personalizados.

- **Validação e Manipulação de Dados**
  - Validação com DTOs.
  - Uso de Interceptors, Middlewares e Pipes para controle de fluxo e tratamento de dados.

- **Funcionalidades Adicionais**
  - Envio de e-mails e upload de arquivos.
  - CORS para segurança de requisições.

- **Banco de Dados e ORM**
  - Integração com o **Type ORM** para manipulação de dados.
  - Uso de **Migrations** para gerenciamento das tabelas do banco de dados.
  - Uso do banco de dados **PostgreSQL**.

- **Testes**
  - Testes com Jest.

## Tecnologias

- **NestJS**
- **TypeScript**
- **Type ORM**
- **PostgreSQL**
- **JWT** para autenticação
<br><br>

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run migrations

```bash
# create a new migration
$ npm run migrate:create

# execute migration
$ npm run migrate:up

# revert migration
$ npm run migrate:down
```

## Run tests

```bash
# user service test
$ npm test -t src/user/user.service.spec.ts
$ npm run test:watch -t src/user/user.service.spec.ts

# user controller test
$ npm test -t src/user/user.controller.spec.ts
$ npm run test:watch -t src/user/user.controller.spec.ts

# auth test
$ npm test -t src/auth/auth.service.spec.ts
$ npm run test:watch -t src/auth/auth.service.spec.ts
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
