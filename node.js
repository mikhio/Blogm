const express = require('express');
const multer = require('multer')
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname )
    }
})

const upload = multer({ storage: storage }).single('file')

console.log(`Server has ${port} port.`);


const url = 'mongodb://localhost:27017';

const dbName = 'blogm-project';

const client = new MongoClient(url);

client.connect(function(err) {
    if (err !== null) {
        console.error('Problem')
    }

    const db = client.db(dbName);

    const collectionPages = db.collection('pages');
    const collectionError = db.collection('error');
    const collectionUsers = db.collection('users');


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
        const q = req.query.q
        if (typeof q === "string") {
            collectionPages.find({ $text: { $search: q } }).toArray(function(err, docs) {
                if (docs.length > 10) {
                    const p = req.query.p
                    const pages = req.query.pages
                    pages !== 'all' ? res.send(docs.slice(10*(p-1), 10*p)) : res.send(docs)
                } else {
                    res.send(docs);
                }
            });
        } else {
            collectionPages.find({}).toArray(function(err, docs) {
                if (docs.length > 10) {
                    const p = req.query.p
                    p !== 'all' ? res.send(docs.slice(10*(p-1), 10*p)) : res.send(docs)
                } else {
                    res.send(docs);
                }
            });
        }
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
        collectionPages.find({ _id: ObjectID(id) }).toArray((err, docs) => {
            if (docs.length === 0) {
                collectionError.find({}).toArray((err, doc) => {
                    res.send(doc[0])
                });
            } else {
                res.send(docs[0])
            }
        })
    });

    app.get('/api/user/:id', function(req, res) {
        const id = req.params.id;
        collectionUsers.find({ _id: ObjectID(id)}).toArray((err, doc) => {
            res.send(doc[0])
        });

    });

    app.get('/api/tags', function(req, res) {
        collectionPages.find({}).toArray((err, docs) => {
            const arrTags = []
            for (var i in docs) {
                const tag = docs[i].tags
                arrTags.push(tag)
            }
            res.send(arrTags)
        })
    });

    app.get('/api/tag/:name', function(req, res) {
        const name = req.params.name
        collectionPages.find({tags: name}).toArray((err, docs) => {
            res.send(docs)
        });
    });

    app.get('/api/imgs/:name', function(req, res) {
        const name = req.params.name
        const folder = __dirname + '/public/'
        fs.readdir(folder, (err, files) => {
            let isHave = false
            for (var i in files) {
                const file = files[i]
                if (file === name) {
                    isHave = true
                }
            }
            if (isHave) {
                res.set('Content-Type', 'image/png')
                res.sendFile(__dirname + '/public/' + name)
            } else {
                res.send('404')
            }
        });
    });



    //POST
    app.post('/api/add', function(req, res) {
        collectionPages.insertOne(req.body);
    });


    app.post('/api/register', function(req, res) {
        const username = req.body.login
        let isEqual = false
        let stat = {}
        collectionUsers.find({login: username}).toArray((err, docs) => {
            if (docs.length !== 0) {
                isEqual = true
            }
            if (!isEqual) {
                if (req.body.pass1 === req.body.pass2) {
                    const userData = {
                        email: req.body.email,
                        login: req.body.login,
                        pass: req.body.pass1,
                        photo: 'defualt.png'
                    }
                    collectionUsers.insertOne(userData, (err, result) => {
                            const id = result.ops[0]._id
                            stat.status = 200
                            stat.id = id
                            res.send(JSON.stringify(stat))
                    });
                } else {
                    stat.status = 400
                    stat.wrong = 'pass'
                    res.send(JSON.stringify(stat))
                }
            } else {
                stat.status = 400
                stat.wrong = 'username'
                res.send(JSON.stringify(stat))
            }
        });
    });


    app.post('/api/login', function(req, res) {
        const email = req.body.email
        const password = req.body.pass
        let isEqual = false
        let stat = {}
        collectionUsers.find({email: email}).toArray((err, docs) => {
            if (docs.length === 0) {
                stat.status = 400
                stat.wrong = 'email'
                res.send(JSON.stringify(stat))
            } else {
                if (password === docs[0].pass) {
                    stat.status = 200
                    stat.id = docs[0]._id
                    res.send(JSON.stringify(stat))
                } else{
                    stat.status = 400
                    stat.wrong = 'pass'
                    res.send(JSON.stringify(stat))
                }
            }
        });
    });


    app.post('/api/delete', function(req, res) {
        collectionPages.deleteOne({ _id : ObjectID(req.body.delete) })
    });


    app.post('/api/edit/photo/:id', function(req, res) {
        const id = req.params.id;
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            console.log();
            collectionUsers.find({ _id : ObjectID(id) }).toArray((err, docs) => {
                const userPhoto = docs[0].photo
                if (userPhoto === 'defualt.png') {
                    console.log(req.file.filename);
                    collectionUsers.updateOne({ _id : ObjectID(id) }, {
                        $set: {
                            photo: req.file.filename
                        }
                    })
                } else {
                    collectionUsers.updateOne({ _id : ObjectID(id) }, {
                        $set: {
                            photo: req.file.filename
                        }
                    })
                    fs.unlink(__dirname + '/public/' + userPhoto)
                }
            })
            return res.status(200).send(req.file)
        })
    });


    app.post('/api/edit/:id', function(req, res) {
        const id = req.params.id;
        if (id === 'post') {
            collectionPages.updateOne({ _id : ObjectID(req.body._id) }, {
                $set: {
                    title : req.body.title,
                    body : req.body.body,
                    tags : req.body.tags
                }
            })
        } else if (id === 'user') {
            collectionUsers.updateOne({ _id : ObjectID(req.body._id) }, {
                $set: {
                    login : req.body.login,
                    email : req.body.email,
                    pass : req.body.pass
                }
            })
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
