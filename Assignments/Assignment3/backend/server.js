const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// simple delay to simulate network
server.use((req, res, next) => setTimeout(next, 300))

server.use(router)

const port = process.env.PORT || 3001
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`)
})
