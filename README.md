## Description

Projeto de desafio técnico para a SGA. Projeto que consiste em um CRUD de tutoriais com filtro na busca de todos.

## Technologies
- Node.js
- PostgreSQL
- Docker
- Nestjs
- Prisma

## Project setup

O projeto contem um arquivo de configuração para o `asdf` que é um programa onde é possível controlar qual a versão da runtime do projeto. Nele está configurado para rodar na versão 22.7.0 do Node.

Copie as variáveis de exemplo para um arquivo `.env`
```bash
$ cp .env.example .env
```

Para rodar o banco de dados e o redis com o docker rode este comando:
```bash
$ docker compose up -d
```

Para instalar as dependências rode este comando:
```bash
$ npm install
```

Após instalar as dependências e com o banco rodando no docker utilize o prisma para rodar as migrations:
```bash
$ npx prisma migrate dev
```

## Build and run the project

```bash
# build project
$ npm run build

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
## Documentation

O projeto contem um pagina de documentação da API do swagger para acessa-lo, siga os próximos passos
1. Rode o banco de dados `docker compose up -d`
2. Rode o projeto `npm run start:dev`
3. Acesse a rota `http://localhost:SUA_PORTA/docs`

