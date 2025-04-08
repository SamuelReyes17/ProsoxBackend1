import express, { json } from "express";
//import { productsArr, cartsArr } from "./data.js";
import cartsArr from "./carts.json" assert { type: "json" };
import productsArr from "./products.json" assert { type: "json" };
import path from "path";
import { writeFile } from "fs/promises";

const server = express();

let products = productsArr.products;
let carts = cartsArr.carts;

server.use(express.json());

server.get("/api", (req, res) => {
  res.send(
    "Bienvenidos a mi API, utilizar la ruta /api/products para hacer peticiones"
  );
});
// Ruta de Productos
server.get("/api/products", (req, res) => {
  res.json(products);
});

// Post products
let idCounter = 0;
server.post("/api/products", async (req, res) => {
  const { title, price, stock, category, description, code, thumbnail } =
    req.body;
  const newProduct = {
    id: idCounter++,
    title,
    price,
    code,
    stock,
    thumbnail,
    category,
    description,
  };
  products.push(newProduct);
  await writeFile("./products.json", JSON.stringify({ products }));
  res.json({ message: "Producto creado con exito" });
});

// Obtener products
server.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
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
server.listen(8080, () => {
  console.log("Servidor Levantado");
});
