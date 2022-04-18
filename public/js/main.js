const socket = io().connect()

// Productos

const formProduct = document.querySelector('#saveProduct')

formProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  const producto = {
    nombre: formProduct.children.nombre.value,
    precio: formProduct.children.precio.value,
    url: formProduct.children.url.value,
  }
  socket.emit('update', producto)
  formProduct.reset()
})

socket.on('products', (productos) => {
  productTable(productos).then((html) => {
    document.querySelector('#products').innerHTML = html
  })
})

const productTable = async (producto) => {
  const res = await fetch('./views/productos.hbs')
  const view = await res.text()
  const template = Handlebars.compile(view)
  const html = template({ product: producto })
  return html
}

// Mensajes

const formChat = document.querySelector('#sendMessage')

const render = (data) => {
    if(data){
        const html = data
        .map((e, i) => {
          return `<div>
            <strong>${e.author}</strong>
            <em>${e.fyh}:</em>
            <em>${e.message}</em>
            </div>`
        })
        .join(' ')
      document.getElementById('messages').innerHTML = html
    }else{
        document.getElementById('messages').innerHTML = `<strong>Todavía no hay mensajes, se el primero!</strong>`
    }
  
}

const addMessage = (e) => {
  const mensaje = {
    author: document.getElementById('username').value,
    message: document.getElementById('message').value,
  }
  socket.emit('new-message', mensaje)
}

socket.on('messages', (data) => render(data))

formChat.addEventListener('submit', (e) => {
  e.preventDefault()
  addMessage(e)
})
