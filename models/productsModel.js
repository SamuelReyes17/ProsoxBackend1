import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  code: String,
  stock: Number,
  thumbnail: String,
  category: String,
  description: String,
});

const productsModel = mongoose.model(productsCollection, productSchema);

export default productsModel;
