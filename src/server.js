const express = require("express")
const server = express()
const routes = require("./routes")
const path = require("path")

// usando template engine
server.set('view engine',  'ejs')

//muda a localização da pasta views (_dirname  pasta atua do arquivo )
server.set('views', path.join(__dirname, 'views')) //a pasta views tá dentro da pasta atual do arquivo server

//habilitar arquivos statics
server.use(express.static("public"))

//usar o req.body
server.use(express.urlencoded({extended: true}))

// routes
server.use(routes)

server.listen(3000, () => console.log('rodando'))
