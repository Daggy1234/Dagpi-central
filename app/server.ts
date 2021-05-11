import { Api } from "./express";
import { db } from "./db";
import { http } from "./http";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env);

const api = new Api();

console.log("Created API instance");

api.run();

console.log("Api running!");

db.createInstance();

console.log("Database connected");

http.createInstance();

console.log("axios ready!");

const app = api.app;

export { app };
