import { Router } from "express";
import cartsModel from "../../models/cartsModel.js";
import productsModel from "../../models/productsModel.js";

const cartRouter = Router();

cartRouter.post("/api/carts", async (req, res) => {
  try {
    const newCart = await cartsModel.create({ products: [] });
    res
      .status(201)
      .json({ message: "Carrito creado con éxito", cart: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});
cartRouter.get("/api/carts", async (req, res) => {
  const allCarts = await cartsModel.find();
  res.json(allCarts);
});
cartRouter.get("/api/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsModel.findById(cid).populate("products.product");

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

    const cart = await cartsModel.findById(cid);
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const productExists = await productsModel.findById(pid);
    if (!productExists) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const prodIndex = cart.products.findIndex(
      (p) => p.product.toString() === pid
    );

    if (prodIndex !== -1) {
      cart.products[prodIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();

    res.json({ message: "Producto agregado al carrito", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

cartRouter.delete("/api/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  console.log(cid);
  await cartsModel.deleteOne({ _id: cid });
  res.json({ message: "Carrito eliminado" });
});

cartRouter.put("/api/carts/:cid/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  const { quantity } = req.body;
  if (req.body.quantity) {
    await cartsModel.updateOne(
      { _id: cid, "products.product": pid },
      { $set: { "products.$.quantity": quantity } }
    );
  }

  res.json(carritoActualizado);
});
cartRouter.put("/api/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  if (req.body.products) {
    await cartsModel.updateOne({ _id: cid }, { $set: { products: req.body } });
  }

  res.json({ message: "carrito actualizado" });
});

export default cartRouter;
