# NOC APP

## This is app network operation center

CronJob in express where we use Clean Code & Hexagonal Architecture, also uses Dependency Injection to use multiple databases such as PostgreSQL(PrismaORM), MongoDB(MONGOOSE), and Local with FileSystem to store the logs, email service to send the logs with high-level urgent

### dev

1. Clone file .env.template a .env
2. Config environment variable

```env
PORT=
PROD=
MAIL_EMAIL=
MAIL_SECRET_KEY=
MAIL_SERVICE=


# MONGO DB
MONGO_URI=mongodb://<USER>:<PASSWORD>@<IPHOST>:<PORT>/?authMechanism=DEFAULT
MONGO_DB_NAME=NOC
MONGO_USER=alumnno
MONGO_PASS=123456


# POSTGRES DB
POSTGRES_URL=
POSTGRES_USER=alumno
POSTGRES_PASS=123456
POSTGRES_DB=NOC
```

3.Run

``` sh
yarn install or yarn
```

```sh
yarn dev
```
