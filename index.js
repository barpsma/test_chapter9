const express = require('express')
const app = express()
const route = require('./routes/router')
require('dotenv').config()


const port = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', route)

app.listen(port, () => {
    console.log(`running in ${port}`)
})