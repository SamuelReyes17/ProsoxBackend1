import { MongoClient } from "mongodb";

const uri = "mongodb://localHost:27017";

const client = new MongoClient(uri);

async function prueba() {
  try {
    await client.connect();
    console.log("conectado a mongodb");
    const db = client.db("prosoxdb");
    const products = db.collection("products");
    const allProducts = await products.find().toArray();
    console.log(allProducts);
  } catch (err) {
    console.log("ERROR: ", err);
  } finally {
    await client.close();
  }
}

prueba();
