const express = require('express');
const app = express();

//mongodb
const mongoose = require('mongoose');

// models
require('./models/Artigo')
const Artigo = mongoose.model('artigo')

mongoose.connect('mongodb://0.0.0.0:27017/conteudo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Conexão com banco de dados feita com sucesso')
}).catch((erro)=>{
    console.log('erro na conexão com banco de dados'+ erro)
})

// fazer o express permitir o uso de json
app.use(express.json());

app.get('/', (req, res)=>{
    return res.json({titulo: "Iniciando com API"})
})

app.post('/artigo', (req, res)=>{
    const artigo = Artigo.create(req.body)
    .then(()=>{
        return res.status(200).json({
            error: false,
            message: 'Artigo foi cadastrado com sucesso no banco de dados'
        })
    }).catch((error)=>{
        return res.status(400).json({
            error: true,
            message: 'Error: Artigo não foi cadastrado no banco de dados ' + error
        })
    })
})
app.listen(8080, ()=>{
    console.log('O servidor foi iniciado na porta 8080: http://localhost:8080')
})