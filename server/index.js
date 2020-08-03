// index.js

const express = require('express');
const path = require('path');
var http = require('http');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`${__dirname}/../build`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

var httpServer = http.createServer(app);

httpServer.listen(3000, () => {
    console.log('HTTP Server is Running On Port 3000');
});