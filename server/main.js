//Code Serveur (Node)
var express = require('express');
var app  = express();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.use(express.static('../public'));

app.get('/', function(req, res){
  res.sendFile('index.html');
});

http.listen(8081, function(){
  console.log('listening on *:8081');
});
