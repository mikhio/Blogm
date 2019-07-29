const express = require('express');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');

const app = express();
const port = 5000;

var idChange = '';



console.log(`Server has ${port} port.`);

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

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'react-in-node','build', 'index.html'));
});

app.get('/:id', function(req, res) {
    res.sendFile(path.join(__dirname, 'react-in-node','build', 'index.html'));
});

app.get('/api/pages', function(req, res) {
    fs.readdir(__dirname + '/json/pages/', (err, files) => {
        const result = JSON.stringify({
            files: files.map(file => file.split('.')[0])
        })
        res.send(result);
    })
});

app.get('/api/page/:id', function(req, res) {
    const id = req.params.id;
        fs.exists(__dirname + '/json/pages/' + id + '.json', (exist) => {
            if (!exist) {
                res.sendFile(__dirname + '/json/error.json');
                return;
            }

            res.sendFile(__dirname + '/json/pages/' + id + '.json');
        })
});

app.post('/api/add', function(req, res) {
    var namefile = __dirname + '/json/pages/' + req.body.id + '.json'
    var json = JSON.stringify(req.body)
    fs.writeFile(namefile, json)
});

app.post('/api/delete', function(req, res) {
    var namefile = __dirname + '/json/pages/' + req.body.delete + '.json'
    fs.unlink(namefile)
});

app.get('/api/edit/:id', function(req, res) {
    const id = req.params.id;
    var namefile = __dirname + '/json/pages/' + id + '.json'
    res.sendFile(namefile)
});

app.post('/api/edit', function(req, res) {
    var namefile = __dirname + '/json/pages/' + req.body.id + '.json'
    var json = JSON.stringify(req.body)
    fs.writeFile(namefile, json)
});

app.listen(port);
