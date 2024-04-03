const express = require('express');
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    author: { type: String, required: true },
    dateCreated: { type: String, required: true },
    lastModified: { type: String, required: true },
    projectName: { type: String, required: true }
});

const Project = mongoose.model('Project', projectSchema);

const app = express();


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
    const id = req.params.id;
    const updated = {
        projectName: req.body.title,
        author: req.body.author,
        lastModified: new Date().toDateString()
    };

    Project.findByIdAndUpdate(id, updated, { new: true })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({ err: 'Could not update the project' });
    });
});
  
app.post('/newProject', (req, res) => {
    const date = new Date();
    
    const project = new Project({
        author: req.body.author,
        dateCreated: date.toDateString(),
        lastModified: date.toDateString(),
        projectName: req.body.title
    });
    
    project.save()
    .then(result => {
        console.log("New project created:", result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.error("Error creating project:", err);
        res.status(500).json({ err: 'Could not create project' });
    });
});
  
// POST route to delete a project
app.post('/delProject', (req, res) => {
    const id = req.body.projectId;
    
    Project.findByIdAndDelete(id)
    .then(result => {
        res.status(200).json(result);
        console.log("Deleted project: " + id);
    })
    .catch(err => {
        res.status(500).json({ err: 'Could not delete the project' });
    });
});

app.get(['/:slug', '/:slug/*'], (req, res) => {
    res.status(404).send(`Error 404 ${req.params.slug} not found`)
})