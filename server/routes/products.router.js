import ProductManager from '../../ProductManager.js'
import { Router } from 'express'

const pPath = ("../ListadeProducts.json")

const productManager = new ProductManager(pPath)

const router = Router()

router.get("/", async (req, res) => {
    const products = await productManager.readProducts()
    const {limit} = req.query

    if(limit) return res.json(products.slice(0,limit))
    else return res.json(products)
})



router.get("/:pid", async (req, res)=> {
    const products = await productManager.readProducts()
    const pid = req.params.pid


    const product = products.find(p=> p.id === +pid)
    if(!product) return res.send({error: "Product not found"})
    res.send(product)
})


router.post("/", async (req, res)=> {
    const {title, description, code, price, stock, thumbnail} = req.body

    if( !title ||
        !description ||
        !code ||
        !price ||
        !stock){
            throw new Error("Incomplete information")
        }
const p = {title, description, code, price, stock, thumbnail}
const addingProduct = await productManager.addProduct(p)
res.status(200).send(addingProduct)
})



router.put('/:pid', async (req,res) => {
    const products = await productManager.readProducts()
    const pid = req.params.pid
    const {title, description, code, price,  stock, thumbnail} = req.body;

    const product = products.find(p=> +p.id === +pid)
    if(!product) return res.send({error: "Product not found"})
    const result = await productManager.updateProduct(+pid, {title, description, code, price,  stock, thumbnail})
    res.status(200).send(result)

})


router.delete("/:pid", (req, res)=> {
    const pid = req.params.pid

    const productToDelete = productManager.deleteProductById(+pid)

    if(productToDelete.err){
        res.status(400).send(err)
    }else{
        res.status(200).send(productToDelete)
    }
})

export default router
// module.exports = router