import { Router } from "express";
import productsModel from "../../models/productsModel.js";

const router = Router();
//const ProductManager = new ProductManager("/data/products.json  ");

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
  await productsModel.insertOne(newProduct);
  const allProducts = await productsModel.find();
  res.json({ message: "Producto creado con exito" });
});

router.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productsModel.findOne({ _id: id });
    res.json(product);
  } catch (err) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
});

router.get("/api/products", async (req, res) => {
  let limit = req.query.limit;
  let page = req.query.page;
  let sort = req.query.sort;
  let query = req.query.query;
  let allProducts = [];

  if (!limit) {
    limit = 10;
  }
  if (!page) {
    page = 1;
  }
  if (!query) {
    if (sort === "asc") {
      allProducts = await productsModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ price: 1 });
      console.log(allProducts.length);
      res.json(allProducts);
    } else if (sort === "dsc") {
      allProducts = await productsModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ price: -1 });
      console.log(allProducts.length);
      res.json(allProducts);
    } else {
      allProducts = await productsModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);
    }
  } else {
    console.log(query);
    if (sort === "asc") {
      allProducts = await productsModel
        .find({ category: query })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ price: 1 });
      console.log(allProducts.length);
      res.json(allProducts);
    } else if (sort === "dsc") {
      allProducts = await productsModel
        .find({ category: query })
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ price: -1 });
      console.log(allProducts.length);
      res.json(allProducts);
    } else {
      allProducts = await productsModel
        .find({ category: query })
        .skip((page - 1) * limit)
        .limit(limit);
    }
  }
  const totalPages = await productsModel.find();
  res.json({
    status: "success",
    payload: allProducts,
    totalPages: totalPages.length,
    prevPage: page - 1,
    page: page,
    hasPrevPage: !(page - 1 === 0),
    hasNextPage: !(page >= totalPages),
  });
});

router.get("/", (req, res) => {
  console.log(import.meta.dirname + "/src/views");
  res.render("realTimeHandlebars");
});

router.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, stock, category, description, code, thumbnail } =
    req.body;
  if (req.body.title) {
    await productsModel.updateOne(
      { _id: id },
      { $set: { title: req.body.title } }
    );
  }
  if (req.body.price) {
    await productsModel.updateOne(
      { _id: id },
      { $set: { price: req.body.price } }
    );
  }
  if (req.body.stock) {
    await productsModel.updateOne(
      { _id: id },
      { $set: { stock: req.body.stock } }
    );
  }
  if (req.body.category) {
    await productsModel.updateOne(
      { _id: id },
      { $set: { category: req.body.category } }
    );
  }
  if (req.body.description) {
    await productsModel.updateOne(
      { _id: id },
      { $set: { description: req.body.description } }
    );
  }
  if (req.body.code) {
    await productsModel.updateOne(
      { _id: id },
      { $set: { code: req.body.code } }
    );
  }
  if (req.body.thumbnail) {
    await productsModel.updateOne(
      { _id: id },
      { $set: { thumbnail: req.body.thumbnail } }
    );
  }
  res.json({ message: "producto actualizado" });
});

router.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  await productsModel.deleteOne({ _id: id });
  res.json({ message: "Producto eliminado" });
});

export default router;

//6823ec1ef2db119f5dd2629a
