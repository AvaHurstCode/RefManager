const express = require('express')
const app = express()

app.listen(4000)

app.get('/', (req, res) => {
    console.log('Here')
    res.json({message: "Error"})
})