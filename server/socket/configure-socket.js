//Servidor

import { Server } from 'socket.io'
//importando ProductManager
import ProductManager from '../../ProductManager.js'
const productManager = new ProductManager('././ListadeProducts.json')
const products = productManager.readProducts()



export default function configureSocket(httpServer){
    const socketServer = new Server(httpServer)

    //connection es el evento
    socketServer.on('connection', (socket)=>{  
        console.log('Conectado con websocket') // se consologuea un aviso de conexión



        //(1)Aquí el servidor está escuchando
        socket.on('message', data=>{   
            console.log(data)
        })

        //(2)Servidor enviando mensaje individual
        socket.emit('test', 'Mensaje test')  

        //(3)Envío broadcast
        socket.broadcast.emit('para-todos-menos-para-este', 'ejemplo de mensaje broadcast')

        //(4)Envío para todos
        socketServer.emit('mensaje-para-todos',` products:${products}`)







        })










        // let credencial = null
        // console.log('socket conectado')
        // socket.on('nombre', (data)=>{
        //     console.log('data enviada en nombrew', data)
        // })
        // socket.on('prueba de emision', (data)=>{
        //     socket.emit('mensaje individual', 'mensaje para el cliente')
        //     socket.broadcast.emit('evento para 3el resto', 'mensaje para todos, menos para quien envia')
        //  //broadcast sirve para mandar mensajes
        //  socketServer.emit('paraTodes', 'Todos reciben este mensaje')
        // })
        // socket.on('credencial', (data)=>{
        //     credencial = data
        // })
        // socket.on('mensaje', (data)=>{
        //     socket.broadcast.emit('Mensaje_recibido', {
        //         credencial,
        //         mensaje: data,               
        //     })
        // })
    }
