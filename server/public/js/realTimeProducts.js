//Cliente
const socket = io()

//(1)Aquí el cliente está mandando
socket.emit('message', 'Mensaje que estoy mandando') 


//(2)Cliente escuchando mensaje individual
socket.on('test', dataB=>{  
    console.log(dataB)
})

//(3)Cliente escuchando mensaje broadcast
socket.on('para-todos-menos-para-este', dataC=>{  
    console.log(dataC)
})

//(4)Cliente escuchando mensaje para todos
socket.on('mensaje-para-todos', async dataD=>{  
    showProducts(await dataD)
})



function showProducts(...prods){
    const pro = prods.join(' ')
    const container = document.getElementById('productsList')
    const p = document.createElement('p')
    p.innerHTML = pro
    container.appendChild(p)
}