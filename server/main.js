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

/*--------------------------------------------------------------*/
//Connexion d'un Joueur
io.on('connection', function(socket){
    socket.emit("connexionOk");
    console.log('a user connected');

  //Déconnexion du Joueur
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
