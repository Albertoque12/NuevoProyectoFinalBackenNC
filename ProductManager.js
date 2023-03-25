import fs from 'fs/promises'
const path = "./ListadeProducts.json"


class ProductManager{
    constructor(filePath){
        ProductManager.id +=0
        this.filePath = filePath
    }


    async readProducts (){
        try {
            const productsRead = await fs.readFile(this.filePath, 'utf-8')
            const productsReadParsed = JSON.parse(productsRead)
            return productsReadParsed
        } catch (err) {
            console.log(err)
        }
    }

    async getProducts(){
        const ListOfProducts = await this.readProducts()
        try{
            if (ListOfProducts.length ===0) {
                throw new Error ("Not found")
            }else return ListOfProducts
        } catch (err) {
            console.log("No found")
        }
    }

    async getProductCode (code){
        const products = await this.readProducts()
        return products.find((p) => p.code === code)  
    }


    async addProduct(p){
        const products = await this.readProducts()
        // const products = await this.getProductCode(p.code)
        if(await this.getProductCode(p.code)) return console.log(`Product with code ${p.code} is already added`)
        // if(products.find(produ=>produ.code === p.code)) return console.log(`Product with code ${p.code} is already added`)

        try{
            if(products.lenght !== 0) await fs.writeFile(this.filePath, JSON.stringify([...products, {...p, id: products[products.length -1].id + 1}], null, 2), 'utf-8')
            else await fs.writeFile(this.filePath, JSON.stringify([{...p, id: 1}]), 'utf-8')
        } catch (err) {
            console.log(err)
        }
    }

    async getProductById(id){
        try{
            const products = await this.readProducts()
            if(!products.find((p) => p.id === id))
            throw new Error (`Producst with id ${p.id} was not found`)
            else console.log(products.find((p) => p.id === id))
        } catch {
            console.log(`Product with id ${id} was not found`)
        }
    }


async updateProduct(pid, p){
    try{
        const products = await this.readProducts()
        const updatedProduct = products.map((prod) => prod.id === pid ? {...prod, ...p}: prod)
        

        if(!products.find((p) => p.id === pid)){ 
        throw new Error(`Product with id ${pid} was not found`)
        }else {await fs.writeFile(this.filePath, JSON.stringify(updatedProduct, null, 2))
        return updatedProduct.find((p) => p.id === pid)
    }

    } catch (err) {
        console.log(`Product with id ${pid} was not found`)
    }
}



async deleteProductById(id) {
    try {
        const products = await this.readProducts()
        const productsFiltered = products.filter((p) => p.id !== id)
        if(!products.find((prod) => prod.id === id))
        throw new Error(`Product with id ${id} not found`)
        else await fs.writeFile(this.filePath, JSON.stringify(productsFiltered, null, 2))
    } catch (err) {
        console.log(err)
    }
}



}




export default ProductManager

// module.exports = ProductManager




// const testProduct = { 
// "title": "TestA ",
// "description": "TestA",
// "price": 12,
// "status": true,
// "thumbnail": "image",
// "code": 123,
// "stock": 5}

// const newProductManager = new ProductManager(path)
// newProductManager.getProductById(2)
