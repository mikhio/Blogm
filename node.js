const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');

const app = express();
const port = 5000;


console.log(`Server has ${port} port.`);


const url = 'mongodb://localhost:27017';

const dbName = 'blogm-project';

const client = new MongoClient(url);

client.connect(function(err) {
    if (err !== null) {
        clonsole.error('Problem')
    }

    const db = client.db(dbName);

    const collectionPages = db.collection('pages');
    const collectionError = db.collection('error');
    const collectionSearch = db.collection('search');


    console.log("Connected successfully to server");



    app.use(express.static(path.join(__dirname, 'react-in-node', 'build')));

    app.use (function (req, res, next) {
        res.header('Content-Type', 'application/json');
        res.header ('Access-Control-Allow-Origin', '*');
        res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());


    // GET
    app.get('/api/pages', function(req, res) {
        collectionPages.find({}).toArray(function(err, docs) {
            res.send(docs);
        });
    });

    app.get('/api/pagesId', function(req, res) {
        collectionPages.find({}).toArray((err, docs) => {
            const arrId = []
            for (var i in docs) {
                const id = docs[i]._id
                arrId.push(id)
            }
            res.send(arrId)
        })
    });

    app.get('/api/page/:id', function(req, res) {
        const id = req.params.id;
        collectionPages.find({}).toArray((err, docs) => {
            let flag = false;
            let documents = {};

            for (var i in docs) {
                const idDocs = docs[i]._id
                if (id.toString() === idDocs.toString()) {
                    flag = true;
                    documents = docs[i]
                }
            }
            if (!flag) {
                collectionError.find({}).toArray((err, doc) => {
                    res.send(doc[0])
                });
            } else {
                res.send(documents)
            }
        })
    });

    app.get('/api/edit/:id', function(req, res) {
        const id = req.params.id;
        collectionPages.find({}).toArray((err, docs) => {
            let flag = false;
            let documents = {};

            for (var i in docs) {
                const idDocs = docs[i]._id
                if (id.toString() === idDocs.toString()) {
                    flag = true;
                    documents = docs[i]
                }
            }

            if (!flag) {
                collectionError.find({}).toArray((err, doc) => {
                    res.send(doc[0])
                });
            } else {
                res.send(documents)
            }
        })
    });

    app.get('/api/search/:kind', function(req, res) {
        const kind = req.params.kind
        switch (kind) {
            case 'title':
                collectionSearch.find({}).toArray((err, docs) => {
                    res.send(docs[0].docs)
                });
                break;
            default:
                break;
        }
    });


    //POST
    app.post('/api/add', function(req, res) {
        collectionPages.insertOne(req.body);
    });

    app.post('/api/delete', function(req, res) {
        collectionPages.deleteOne({ _id : ObjectID(req.body.delete) })
    });


    app.post('/api/edit', function(req, res) {
        collectionPages.updateOne({ _id : ObjectID(req.body._id) }, { $set: { title : req.body.title, body : req.body.body } })
    });

    app.post('/api/search/:kind', function(req, res) {
        const kind = req.params.kind
        switch (kind) {
            case 'title':
                collectionPages.find( { $text: { $search: req.body.title } } ).toArray((err, docs) => {
                    collectionSearch.updateOne({ _id : ObjectID("5d41d8f7ce9c72abbcee31d5") }, { $set : { docs : docs }})
                });
                break;
            default:
                break;
        }
    });

    app.listen(port);
});






// collection.find({'a': 3}).toArray(function(err, docs) {
//      console.log(docs);
//});

//collection.updateOne({ a : 1 }, { $set: { a : 4 } });

//const collection = db.collection('documents');
//collection.insertMany([
//{a : 1}, {a : 2}, {a : 3}
//]);



/*app.get('/', function(req, res) {
res.sendFile(path.join(__dirname, 'react-in-node','build', 'index.html'));
});

app.get('/:id', function(req, res) {
res.sendFile(path.join(__dirname, 'react-in-node','build', 'index.html'));
});*/
