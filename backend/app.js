const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs')
const cookieParser = require('cookie-parser')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}))

app.get('/', (req, res) => {
    res.send('Hello World')
})

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = async () => {
    await db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()