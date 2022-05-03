const { sqlite3, mysql } = require('./options/connections')
const express = require('express')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')
const Container = require('./controllers/products.js')
const Messages = require('./controllers/messages.js')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productosApi = new Container(mysql, 'products')
const messagesApi = new Messages(sqlite3, 'messages')

io.on('connection', async (socket) => {
	console.log('Usuario conectado')

	//   Cargo los productos
	socket.emit('products', await productosApi.getAll())

	// Actualizo los productos
	socket.on('update', async (producto) => {
		productosApi.save(producto)
		io.sockets.emit('products', await productosApi.getAll())
	})

	// Envio los mensajes al cliente que se conectó
	socket.emit('messages', await messagesApi.getAll())

	// Escucho los mensajes enviados por el cliente y se los propago a todos
	socket.on('new-message', async (data) => {
		data.fyh = new Date().toLocaleString()
		messagesApi.save(data)
		io.sockets.emit('messages', await messagesApi.getAll())
	})
})

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/* Server listener */
const PORT = 8080
const server = httpServer.listen(PORT, () => console.log('Server on'))
server.on('error', (error) => console.log(`Error en servidor ${error}`))

