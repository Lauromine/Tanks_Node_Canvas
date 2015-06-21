//Code Serveur (Node)
/*
    @author : Erwan, Benjamin
*/
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
var tanks = [];
var shoots = [];
var gameStarted = false;

Player = function(Id, socket) {
    this.Id = Id;
    this.socket = socket;
}

Tank = function(pId, pColor) {
    this.color = pColor;
    this.id = pId;
    this.x = 50;
    this.y = 50;

    this.rotation = 0;
    this.turretRotation = 0;
}

Shoot = function() {
    this.x = 0;
    this.y = 0;
}


/*------------------------------Event--------------------------------*/
//Connexion d'un Joueur
io.on('connection', function(socket){
    console.log('a user connected');

    
    if(countPlayer >= 4) {
        errorMessage = 'The game is full';
    }

    Players.push(new Player(countPlayer, socket));
    socket.ID = countPlayer;
    countPlayer++;

    //Validation de la connection du Joueur
    var errorMessage = null;
   
    socket.emit("connexionOk", socket.ID, errorMessage);
    socket.broadcast.emit("newPlayerJoin");

    //Déconnexion du Joueur
    socket.on('disconnect', function(){
        socket.emit("deconnectionOk", socket.ID);
        socket.broadcast.emit("aPlayerLeave", socket.ID);

        //retire le joueur de la liste du server
        Players.splice(socket.ID, 1);
        console.log('user disconnected');

        if(Players.length === 0) {
            countPlayer = 0;
        }
    });

    //Si le joueur qui se connecte est le 4eme
    if(countPlayer === 4) {
        io.emit('startGame');
    }
    /*setInterval(function() {
        socket.emit("connexionOk", socket.ID);
        console.log("PLOP");
    }, 50);*/
});
