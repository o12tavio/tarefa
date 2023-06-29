const express = require('express')
const consign = require('consign')
const cors = require('cors')
const app = express()
var porta = '3200'

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get('/', (req, res)=>res.send('Gerenciamento de Tarefas'))

consign()
    .include('./controllers/rotas')
    .into(app)

app.listen(porta, ()=>console.log(`Servidor rodando em: http://localhost:${porta}`))