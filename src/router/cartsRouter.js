import { Router } from "express";
import CartManager from "../managers/cart.manager.js";

const cartRouter = Router();

const Cm = new CartManager(
  "/Users/samuelreyes/Desktop/ProgramacionBackend1Prosox/src/database/carts.json"
);

cartRouter.post("/api/carts", async (req, res) => {
  try {
    const newCart = await Cm.createCart();
    res
      .status(201)
      .json({ message: "Carrito creado con éxito", cart: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});
cartRouter.get("/api/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cm.getCartById(Number(cid));

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});
cartRouter.post("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const result = await Cm.addProductToCart(Number(cid), Number(pid));

    if (!result) {
      return res
        .status(404)
        .json({ error: "Carrito o producto no encontrado" });
    }

    res.json({ message: "Producto agregado al carrito", cart: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

export default cartRouter;
