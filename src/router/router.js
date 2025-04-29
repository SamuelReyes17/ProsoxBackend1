import { Router } from "express";
import ProductManager from "../managers/product.manager.js";
import { io } from "../../server.js";

const router = Router();
//const ProductManager = new ProductManager("/data/products.json  ");

const Pm = new ProductManager(
  "/Users/samuelreyes/Desktop/ProgramacionBackend1Prosox/src/database/products.json"
);
let productos = [];

router.post("/api/products", async (req, res) => {
  const { title, price, stock, category, description, code, thumbnail } =
    req.body;
  const newProduct = {
    title,
    price,
    code,
    stock,
    thumbnail,
    category,
    description,
  };
  await Pm.addProduct(newProduct);
  const products = await Pm.getProducts();
  res.render("realTimeHandlebars", { products }, (err, html) => {
    io.emit("productCreated", html);
  });
  res.json({ message: "Producto creado con exito" });
});

router.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Pm.getProductById(Number(id));
  if (!product)
    return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
});

router.get("/api/products", async (req, res) => {
  const products = await Pm.getProducts();
  res.json(products);
});

router.get("/realtimeproducts", (req, res) => {});

router.get("/", (req, res) => {
  console.log(import.meta.dirname + "/src/views");
  res.render("realTimeHandlebars");
});

router.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  await Pm.updateProduct(Number(id), req.body);
  res.json({ message: "producto actualizado" });
});

router.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const rc = await Pm.deleteProduct(Number(id));
  if (rc === null) return res.json({ message: "Error producto no encontrado" });
  res.json({ message: "Producto eliminado" });
});

export default router;
