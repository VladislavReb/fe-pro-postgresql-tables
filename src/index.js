import { Client } from 'pg';

export const initConnection = () => {
  const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST,
  } = process.env;
  const client = new Client({
    user: POSTGRES_USER || 'postgres',
    host: POSTGRES_HOST || 'localhost',
    database: POSTGRES_DB || 'local_data',
    password: POSTGRES_PASSWORD || 'Ro19mD92_PG',
    port: POSTGRES_PORT || 5432,
  });

  return client;
};

export const createStructure = async () => {
  const client = initConnection();
  client.connect();

  await client.query(`
    create table users (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(30) NOT NULL,
    date       TIMESTAMP DEFAULT NOW()
    )
  `);

  await client.query(`
    create table categories (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(30) NOT NULL
    )
  `);

  await client.query(`
    create table authors (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(30) NOT NULL
    )
  `);

  await client.query(`
    create table books(
    id         SERIAL PRIMARY KEY,
    title      VARCHAR(30) NOT NULL,
    userid     INTEGER     NOT NULL,
    authorid   INTEGER     NOT NULL,
    categoryid INTEGER     NOT NULL,
    FOREIGN KEY(userid) REFERENCES users (id) on delete cascade,
    FOREIGN KEY(authorid) REFERENCES authors (id) on delete cascade,
    FOREIGN KEY(categoryid) REFERENCES categories (id) on delete cascade
    )
  `);

  await client.query(`
    create table descriptions(
    id          SERIAL PRIMARY KEY,
    description VARCHAR(10000) NOT NULL,
    bookid      INTEGER NOT NULL,
    FOREIGN KEY(bookid) REFERENCES books (id) on delete cascade
    )
  `);

  await client.query(`
    create table reviews(
    id          SERIAL PRIMARY KEY,
    message     VARCHAR(10000) NOT NULL,
    userid      INTEGER NOT NULL,
    bookid      INTEGER NOT NULL,
    FOREIGN KEY(userid) REFERENCES users (id) on delete cascade,
    FOREIGN KEY(bookid) REFERENCES books (id) on delete cascade
    )
  `);

  client.end();
};

export const createItems = async () => {
  const client = initConnection();
  client.connect();

  await client.query(`
    INSERT INTO users (name) VALUES ('Bohdan');
    INSERT INTO categories (name) VALUES ('horror');
    INSERT INTO authors (name) VALUES ('Stephen King');
    INSERT INTO books (title, userid, authorid, categoryid) VALUES ('It', 1, 1, 1);
    INSERT INTO descriptions (description, bookid) VALUES ('Must read', 1);
    INSERT INTO reviews (message, userid, bookid) VALUES ('Good', 1, 1);
    `);

  client.end();
};

export const dropTables = async () => {
  const client = initConnection();
  client.connect();

  await client.query('DROP TABLE reviews;');
  await client.query('DROP TABLE descriptions;');
  await client.query('DROP TABLE books;');
  await client.query('DROP TABLE authors;');
  await client.query('DROP TABLE categories;');
  await client.query('DROP TABLE users;');

  client.end();
};
