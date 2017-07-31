const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {

  res.setHeader('Access-Control-Allow-Origin', '*');

  fs.readFile('people.json', function (error, data) {
    res.end(data);
  });


}).listen(3000);
