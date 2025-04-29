import fs from "fs";
const fsPromises = fs.promises;

class CartManager {
  constructor(path) {
    this.path = path;
  }

  async readData() {
    const data = await fsPromises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async saveData(data) {
    await fsPromises.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const data = await this.readData();
    const { carts } = data;

    const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = {
      id: newId,
      products: [],
    };

    carts.push(newCart);
    await this.saveData({ carts });
    return newCart;
  }
  async getCartById(cid) {
    const { carts } = await this.readData();
    return carts.find((cart) => cart.id === cid);
  }
  async addProductToCart(cid, pid) {
    const data = await this.readData();
    const { carts } = data;
    const cart = await this.getCartById(cid);
    console.log(cart);
    if (!cart) return null;

    const prodIndex = cart.products.findIndex((p) => p.id === pid);

    if (prodIndex !== -1) {
      cart.products[prodIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    carts.push(cart);
    await this.saveData({ carts });
    console.log(carts);
    return cart;
  }
}

export default CartManager;
