import { Router } from 'express';
import fs from 'fs'


const vRouter= Router()

const readProducts = () => {
    return new Promise((resolve, reject) => {
      fs.readFile('../ListadeProducts.json', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const productsParsed = JSON.parse(data);
          resolve(productsParsed);
        }
      });
    });
  };



vRouter.get('/', async (req, res) => {
    try {
      const productsParsed = await readProducts();
      res.render('home', { products: productsParsed});
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  vRouter.get('/realTimeProducts', async (req, res) => {
    try {
      const productsParsed = await readProducts();
      res.render('realTimeProducts', { products: productsParsed});
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });


  vRouter.get('/mensaje', async (req, res) => {
    res.render('mensajes');
  });
  
// vRouter.get('/products',(req, res)=>{
//     res.render('products', {name: 'LibroTest'})
// })








export default vRouter
// module.exports = vRouter