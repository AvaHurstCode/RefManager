const express = require('express')
const app = express()
const { connectToDb, getDb } = require('./db')

//db connection
let db

connectToDb((err) => {
    if (!err) {
        app.listen(4000, () => {
            console.log('app listening on port 4000')
        })
        db = getDb()
    }
})

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get(['/', '/index'], (req, res) => {
    res.render("index")
})

app.get('/about', (req, res) => {
    res.render("about")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/editor', (req, res) => {
    res.render("editor")
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

app.get('/newProject', (req, res) => {
    res.render("newProject")
})

app.get(['/:slug', '/:slug/*'], (req, res) => {
    res.status(404).send(`Error 404 ${req.params.slug} not found`)
})

app.post('/newProject', (req, res) => {
    console.log(req.body)
    const project = {
            author: req.body.author,
            dateCreated: "01/04/2024",
            lastModified: "01/04/2024 23:53",
            projectName: req.body.title
        }

    db.collection('projects')
    .insertOne(project)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not create project'})
    })
})