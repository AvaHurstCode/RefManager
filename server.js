const express = require('express')
const app = express()

const data = require('./data.json')

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get('/home', (req, res) => {
    res.redirect('/index.html')
})

app.get('/user/:userId/projects', (req, res) => {
    res.render("projects", {listLength: req.params.userId})
})

app.get('/user/:userId/editor/project/:projectName', (req, res) => {
    res.render("editor", {projectName : req.params.projectName, userId : req.params.userId})
})

app.get('/jsonData', (req, res) => {
    res.send(`The best food in the world is ${data.title} Description: ${data.description}`)
})

app.get('/:slug', (req, res) => {
    res.status(404).send(`Error 404 ${req.params.slug} not found`)
})

app.get('/:slug/*', (req, res) => {
    res.status(404).send(`Error 404 ${req.params.slug} not found`)
})

app.listen(4000)