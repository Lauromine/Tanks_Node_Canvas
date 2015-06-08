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
//Array contenant les données des joueurs
var countPlayer = 0;
var Players = [];

Player = function(Id, socket) {
    this.Id = Id;
    this.socket = socket;
}





/*------------------------------Event--------------------------------*/
//Connexion d'un Joueur
io.on('connection', function(socket){
    console.log('a user connected');

    Players.push(new Player(countPlayer, socket));
    socket.ID = countPlayer;
    countPlayer++;

    //Validation de la connection du Joueur
    socket.emit("connexionOk", socket.ID);

    socket.broadcast.emit("newPlayerJoin");

    //Déconnexion du Joueur
    socket.on('disconnect', function(){
        Players.splice(socket.ID, 1);
        console.log('user disconnected');
    });
});
