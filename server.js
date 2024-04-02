const express = require('express')
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')
const app = express()

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

app.get('/projects', (req, res) => {
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

app.get('/editProject/:id', (req, res) => {
    let id = new ObjectId(req.params.id)
    db.collection('projects')
    .findOne({_id: id})
    .then(doc => {
        res.render('editProject', {project: doc})
    })
    .catch(err => {
        res.status(500).json({err: 'Could not fetch the project'})
    })
})

app.post('/editProject/:id', (req, res) => {
    let id = new ObjectId(req.params.id)
    let updated = {
        projectName: req.body.title,
        author: req.body.author,
        lastModified: date.toDaeString()
    }
    console.log(updated)
    db.collection('projects')
    .updateOne({_id: id}, {$set: updated})
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not update the project'})
    })
})

app.post('/newProject', (req, res) => {
    console.log(req.body)
    const date = new Date()
    console.log(date)
    const project = {
            author: req.body.author,
            dateCreated: date.toDateString(),
            lastModified: date.toDateString(),
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

app.post('/delProject', (req, res) => {
    let id = new ObjectId(req.body.projectId)
    db.collection('projects')
    .deleteOne({_id: id})
    .then(result => {
        res.status(200).json({result})
        console.log("deleted project" + req.body.projectId)
    })
    .catch(err => {
        res.status(500).json({err: 'Could not delete the document'})
    })
})

app.get(['/:slug', '/:slug/*'], (req, res) => {
    res.status(404).send(`Error 404 ${req.params.slug} not found`)
})