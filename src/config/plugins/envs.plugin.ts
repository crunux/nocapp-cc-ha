import 'dotenv/config'
import * as env from 'env-var'


export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    PROD: env.get('PROD').required().asBool(),
    MAIL_EMAIL: env.get('MAIL_EMAIL').required().asEmailString(),
    MAIL_SECRET_KEY: env.get('MAIL_SECRET_KEY').required().asString(),
    MAIL_SERVICE: env.get('MAIL_SERVICE').required().asString(),

    // MONGO DB
    MONGO_DB_NAME: env.get('MONGO_DB_NAME').required().asString(),
    MONGO_URI: env.get('MONGO_URI').required().asString(),
    MONGO_USER: env.get('MONGO_USER').required().asString(),
    MONGO_PASS: env.get('MONGO_PASS').required().asString(),

    // POSTGRES DB
    POSTGRES_URL: env.get('POSTGRES_URL').required().asString(),
    POSTGRES_USER: env.get('POSTGRES_USER').required().asString(),
    POSTGRES_PASS: env.get('POSTGRES_PASS').required().asString(),
    POSTGRES_DB: env.get('POSTGRES_DB').required().asString(),
}