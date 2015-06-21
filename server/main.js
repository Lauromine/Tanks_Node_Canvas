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

function Tank (pParams) {
    var params = pParams || {};
    this.id = params.id || 0;
    this.name = params.name || 'Tank' + this.id;
    this.x  = params.x || 120;
    this.y  = params.y || 240;
    this.color  = params.color || 'rgb(255, 204, 64)';

    this.rotation =  params.rotation || 0; //degrees
    this.turretRotation = params.turretRotation || 0; //degrees 

    this.hitPoints = 5;
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
    
    if(socket.ID % 2 === 0) {
        var idTank = tanks.length;
        if(idTank === 0) {
            tanks.push(new Tank({
                id: idTank,
                color: 'lightblue'
            }));
        } else {
             tanks.push(new Tank({
                id: idTank,
                x: 500,
                y: 400,
                color: 'orange',
                rotation : 180,
            }));
        }
        
        console.log(tanks);
        
        socket.emit('getTankAndRole', idTank, 'tank');
    } else {
        var idTank = tanks.length-1;
        socket.emit('getTankAndRole', idTank, 'turret');
    }

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
        io.emit('startGame', tanks);
    }

    socket.on('playerAction', function(pPlayer, pRole) {
        var currentTank = tanks[pPlayer.id];
        if(pRole === 'tank') {
            currentTank.x = pPlayer.x;
            currentTank.y = pPlayer.y;
            currentTank.rotation = pPlayer.rotation;
        } else {
            currentTank.turretRotation = pPlayer.turretRotation;
        }

        socket.broadcast.emit('playerStatus', currentTank);
    });
    /*setInterval(function() {
        socket.emit("connexionOk", socket.ID);
        console.log("PLOP");
    }, 50);*/
});
