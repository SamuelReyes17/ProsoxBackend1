import express from "express";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { writeFile } from "fs/promises";
import { readFileSync } from "fs";
import http from "node:http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import router from "./src/router/router.js";
import cartRouter from "./src/router/cartsRouter.js";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";

dotenv.config();
const uri = "mongodb://localHost:27017";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const httpServer = http.createServer(app);

//Mongoose

mongoose
  .connect(uri, {
    dbName: "prosoxdb",
  })
  .then(() => console.log("Mongodb conectado exitosamente"))
  .catch((err) => console.log("Hubo un error en la conecxion con mongo:", err));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
let messages = [];

//HandleBars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", import.meta.dirname + "/src/views");

app.use(router);
app.use(cartRouter);

/*httpServer.on("close", () => {
  client.close();

  console.log("El servidor se cerro correctamente junto a la base de datos");
});
process.on("SIGINT", () => {
  httpServer.close();
});*/
httpServer.listen(3000, () => {
  console.log("Servidor esta levantado");
});
