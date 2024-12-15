import * as dotenv from 'dotenv'; // Importa assim (a biblioteca dotenv) pq ela não foi escrita em TS
import { DataSource } from 'typeorm';

dotenv.config({
    path: process.env.ENV === 'test' ? '.env.test' : '.env' // verifica se é ambiente de teste ou não
});

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: [`${__dirname}/migrations/**/*.ts`] // Caminho onde estão as migrations
});

export default dataSource;