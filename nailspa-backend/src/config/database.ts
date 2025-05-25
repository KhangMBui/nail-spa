import { Sequelize } from "sequelize";
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DB_NAME ?? "nailspadb";
const dbUser = process.env.DB_USER ?? "postgres";
const dbPassword = process.env.DB_PASSWORD ?? "";
const dbHost = process.env.DB_HOST ?? "localhost";

// Function to create the database if it doesn't exist
export async function ensureDatabaseExists() {
  const client = new Client({
    user: dbUser,
    password: dbPassword,
    host: dbHost,
    database: "postgres",
  });
  await client.connect();
  const res = await client.query(`SELECT 1 FROM pg_database WHERE datname=$1`, [
    dbName,
  ]);
  if (res.rowCount === 0) {
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`Database "${dbName}" created.`);
  }
  await client.end();
}

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: process.env.DB_HOST,
  dialect: "postgres",
});
