import fileDirName from './utils/fileDirName.js'
import express from 'express'
import uploader from './uploader.js'
import handlebars from 'express-handlebars'
import router from './routes/products.router.js'
import crouter from './routes/cart.router.js'
import vRouter from './routes/views.router.js'
import configureSocket from './socket/configure-socket.js'


const {__dirname} = fileDirName(import.meta)

const app = express()
const port = 8080

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));
app.use('/', express.static(__dirname + '/public'))


//Express-handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')





app.use('/api/products',router )
app.use('/api/carts',crouter )
app.use('/',vRouter )



app.post('/file', uploader.single('file'), (req, res)=>{
    res.send({fie: req.file, body: req.body})
})


const httpServer = app.listen(port, ()=> console.log('Escuchando al servidor en el puerto 8080'))

configureSocket(httpServer)