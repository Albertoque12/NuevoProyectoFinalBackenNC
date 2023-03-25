import { Router } from 'express'
import CartManager from '../../CartManager.js'

const cPath = "../CartsList.json"


const cartManager = new CartManager(cPath)

const crouter = Router()


crouter.get("/", async (req, res) => {
    const carts = await cartManager.readCarts()
    const {limit} = req.query

    if(limit) return res.json(carts.slice(0,limit))
    else return res.json(carts)
})

crouter.get("/:cid", async (req, res) => {
    const carts = await cartManager.readCarts()
    const {limit} = req.query
    const cid = req.params.cid

    const cart = carts.find(c=> c.id === +cid)
    if(!cart) return res.send({error: "Cart not found"})
    res.send(cart)
})

crouter.post("/", async (req, res)=>{

    const products = req.body

    const cart = await cartManager.createCart(products)
    res.status(200).send(cart)
})



crouter.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    
    const prodToAdd = await cartManager.addToCart(cid, pid)
   res.json(prodToAdd)
  });


  export default crouter
//   module.exports = crouter