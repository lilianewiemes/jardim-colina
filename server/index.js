const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var webPush = require('web-push')

const app = express()

// Cors
app.use(cors())

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routes
const api = require('./api/app')
app.use('/api/app', api)

// Public
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'))

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}



// Push notification
const publicKey = 'BAuTSW2A6oxQFnXdeLeYMoucLtN9NfQVSW742Z0kVX0i5KWrZKgld6aUjtJCNY0Qn4A6gcOwfZh3Z4JJup8CR8c'
const privateKey = '-455QQNHD_m3PhSwryS-74cvyX47EErRaLME0f85nDE'

webPush.setVapidDetails('mailto:teste@teste.com', publicKey, privateKey)

const payload = JSON.stringify({ title: 'Jardim da Colina',
body: 'Boa noite, amanhã é o seu dia de trocar o lixo. Obrigado!' })

app.post('/subscribe', (req, res) => {
    const subscription = req.body
    webPush.sendNotification(JSON.stringify(subscription), payload).catch(err => console.log(err))
})

// Port
const port = process.env.PORT || 8081
app.listen(port)
console.log('Servidor rodando na porta: ' + port)
