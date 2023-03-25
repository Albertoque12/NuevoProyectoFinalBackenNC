const socket = io()
socket.emit('credencial', makeid(15))
socket.on("Mensaje_recibido", (data)=> mostrarMensaje(data))

function enviarMensaje (input){
    socket.emit('mensaje', input)
}

function mostrarMensaje(data){
    const div = document.querySelector('#mensajes')
    let p = document.querySelector(`#${data.credencial}`)
    if (!p){
        p = document.createElement('p')
        p.id = data.credencial
        div.appendChild(p)
    }

    p.innerHTML = `${data.credencial}: ${data.mensaje}`
}

function makeid(length){
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while(counter <length){
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    return result

}