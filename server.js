import express, { json } from "express";
//import { productsArr, cartsArr } from "./data.js";
//import cartsArr from "./carts.json" assert { type: "json" };
//import productsArr from "./products.json" assert { type: "json" };
import path, { dirname } from "path";
import { writeFile } from "fs/promises";
import { readFileSync } from "fs";
import http from "node:http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import router from "./src/router/router.js";
import cartRouter from "./src/router/cartsRouter.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const httpServer = http.createServer(app);
export const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
let messages = [];

//Implementacion socket io

io.on("connection", (socket) => {
  console.log("cliente conectado", socket.id);
});

//HandleBars

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", import.meta.dirname + "/src/views");

app.use(router);
app.use(cartRouter);

httpServer.listen(3000, () => {
  console.log("Servidor esta levantado");
});
/*
let products = JSON.parse(
  readFileSync("./products.json", { encoding: "utf-8" })
).products;

let carts = JSON.parse(
  readFileSync("./carts.json", { encoding: "utf-8" })
).carts;

server.use(express.json());

server.get("/api", (req, res) => {
  res.send(
    "Bienvenidos a mi API, utilizar la ruta /api/products para hacer peticiones"
  );
});


// Put products
server.put("/api/products/:id", (req, res) => {
  const { title, price, stock, category, description, code, thumbnail } =
    req.body;
  const { id } = req.params;
  const foundProduct = products.find((p) => p.id === Number(id));
  if (!foundProduct)
    return res.status(404).json({ error: "producto no encontrado" });

  if (title) foundProduct.title = title;
  if (price) foundProduct.price = price;
  if (stock) foundProduct.stock = stock;
  if (category) foundProduct.category = category;
  if (description) foundProduct.description = description;
  if (code) foundProduct.code = code;
  if (thumbnail) foundProduct.thumbnail = thumbnail;
  res.json({ message: "producto actualizado" });
});

// Delete products
server.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id == Number(req.params.id));
  console.log(req.params.id);
  if (index === -1)
    return res.status(404).json({ error: "Producto no encontrado" });

  products.splice(index, 1);
  res.json({ message: "Producto eliminado" });
});
// Ruta de Carrito

let cartCounter = 0;
server.post("/api/carts", async (req, res) => {
  const products = req.body;
  const cart = {
    id: cartCounter++,
    products,
  };
  carts.push(cart);
  await writeFile("./carts.json", JSON.stringify({ carts }));
  res.json({ message: "Cart creado con exito" });
});

server.get("/api/carts", (req, res) => {
  res.json(carts);
});

server.get("/api/carts/:id", (req, res) => {
  const cart = carts.find((p) => p.id === Number(req.params.id));
  if (!cart) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(cart);
});

server.post("/api/carts/:cid/products/:pid", async (req, res) => {
  console.log("entre");
  console.log(carts);
  const { quantity } = req.body;
  const indexCart = carts.findIndex((c) => c.id == Number(req.params.cid));

  if (indexCart === -1)
    return res.status(404).json({ error: "Cart no encontrado" });

  const indexProduct = carts[indexCart].products.findIndex(
    (p) => p.id == Number(req.params.pid)
  );
  if (indexProduct === -1) {
    carts[indexCart].products.push({
      id: req.params.pid,
      quantity,
    });
  } else {
    carts[indexCart].products[indexProduct].quantity += quantity;
  }
  await writeFile("./carts.json", JSON.stringify({ carts }));
  res.json({ message: "Se agrego prodcuto al carrito" });
});
/*server.listen(8080, () => {
  console.log("Servidor Levantado000");
});*/
