const express = require('express')
const app = express()

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get('/user/:userId/projects', (req, res) => {
    res.render("projects", {listLength: req.params.userId})
})

app.get('/:slug/*', (req, res) => {
    res.status(404).send(`Error 404 ${req.params.slug} not found`)
})

app.listen(4000)