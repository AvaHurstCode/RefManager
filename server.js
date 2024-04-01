const express = require('express')
const app = express()
const { connectToDb, getDb } = require('./db')  

const data = require('./data.json')

//db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(4000, () => {
            console.log('app listening on port 4000')
        })
        db = getDb()
        console.log(db)
    }
})

app.set("view engine", "ejs")

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render("index", {})
})

app.get('/user/:userId/projects', (req, res) => {
    let projects = []

    db.collection('projects')
    .find()
    .sort({author: 1})
    .forEach(project => projects.push(project))
    .then(() => {
        res.status(200).render("projects", {projects: projects})
    })
    .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
    })
})

app.get('/user/:userId/editor/project/:projectName', (req, res) => {
    res.render("editor", {projectName : req.params.projectName, userId : req.params.userId})
})

app.get(['/:slug', '/:slug/*'], (req, res) => {
    res.status(404).send(`Error 404 ${req.params.slug} not found`)
})