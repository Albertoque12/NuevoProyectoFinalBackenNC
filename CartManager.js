import fs from 'fs/promises'

import ProductManager from './ProductManager.js'
const productManager = new ProductManager("./ListadeProducts.json")


class CartManager{
    constructor(filepath){
        this.carts = []
        this.filepath = filepath
        this.id = 0
    }

    async readCarts(){
        try {
            const cartsRead = await fs.readFile(this.filepath,'utf-8' )
            const cartsReadParsed = JSON.parse(cartsRead)
            return cartsReadParsed
        } catch (err){
            console.log(err)
        }
    }

    async createCart(cartToAdd = {products:[{}]}){
        const existingCarts = await this.readCarts()
    try{
            cartToAdd = {
            id: existingCarts.length + 1,
            products: cartToAdd.products || [{}]
        }

        if(existingCarts.lenght !==0) await fs.writeFile(this.filepath, JSON.stringify([...existingCarts, cartToAdd], null, 2), 'utf-8')
        else await fs.writeFile(this.filepath, JSON.stringify([cartToAdd]), 'utf-8')
        


        // existingCarts.push(newCart)
        // await fs.writeFile(this.filepath, JSON.stringify(existingCarts))
         console.log("New cart added", cartToAdd)
         return cartToAdd
    } catch (err){
        console.log(err)
    }
}
    

async getCartById(cid) {
    const carts = await this.readCarts();
    const cart = carts.find(c => c.id === +cid);
    if (cart) {
      return cart;
    } else {
      console.log(`El carrito con ID ${cid} no existe`);
      return;
    }
  }
  




async seeCarts(){
    this.carts = await this.readCarts()
    return this.carts
}


async addToCart(cid, pid) {
    const cart = await this.getCartById(cid);
    if (!cart) {
        console.log(`El carrito con ID ${cid} no existe`);
        return;
      }
  
    const products = await productManager.readProducts(); 
    const productToAdd = products.find(p => p.id === +pid);
  
    if (!productToAdd) {
      console.log(`El producto con ID ${pid} no existe`);
      return;
    }
  
    // Verificar si el producto ya está en el carrito
    const productInCart = cart.products.find(p => p.id === +pid);
    const productInCartString = JSON.stringify(productInCart)
    if (productInCartString) {
      console.log(`El producto ${productInCartString} ya está en el carrito`);
      return cart;
    }


    const cartsC = await this.readCarts()
    cart.products.push({id: productToAdd.id, quantity: 1})
    const index = cartsC.findIndex(c => c.id === +cid)
    cartsC[index] = cart

    await this.writeCarts(cartsC)
  
    // await this.writeCarts(cart);
  
    console.log(`El producto ${productToAdd.title} ha sido agregado al carrito ${cid}`);
    return cart;


  }
  




async writeCarts(carts) {
    try {
      await fs.writeFile(this.filepath, JSON.stringify(carts, null, 2), 'utf-8');
      console.log('El carrito ha sido actualizado');
    } catch (err) {
      console.log(err);
    }
  }


  async  getProducts() {
    try {
      const products = await fs.readFile('./ListadeProducts.json', 'utf-8');
      return JSON.parse(products);
    } catch (err) {
      console.error(err);
      return null;
    }
  }

}

export default CartManager
// module.exports = CartManager





// const productToAdd = {name:'playera'}


// const newCartManager = new CartManager(path)
//  newCartManager.addToCart(16,1)

