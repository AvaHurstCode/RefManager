const express = require('express')
const app = express()

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get('/user/:userId/projects', (req, res) => {
    res.render("projects", {listLength: req.params.userId})
})

app.get('*', (req, res) => {
    res.sendStatus(404)
})

app.listen(4000)