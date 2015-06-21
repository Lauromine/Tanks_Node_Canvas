'use strict';
//Code client
/*
* 
* @authors : Erwan, Benjamin
*/
require.config({
    urlArgs: 'bust=' + (new Date()).getTime()
});

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var textLog = []; //Contient les messages affichés en jeu

require(['game', 'player'], function(Game, Player) {
    var game,
        player,
        players = [],
        shoots = [];

    init();

    var Id;
    var timeout;
    
    function waitServerRespond() {
        var socket = io();
        socket.on('connexionOk', function(pId){
            Id = pId;
            console.log('connexionOk');
            
            socket.on('newPlayerJoin', function(){
                console.log('a new player join the server');
            });

            socket.on('deconnectionOk', function(){
                destroy();
            });

            socket.on('aPlayerLeave', function(IdLeaver){
                console.log('a player leave the server, his id is :' + IdLeaver);
            });

            init();
        });
    }

    function init() {
        game = new Game({
            width  : 1024,
            height : 768
        });
        player = new Player({name: 'Pas le Murret', shootArray: shoots, playersArray: players});
        players.push(player);
        player.initController('turret', 0);

        var player2 = new Player({name: 'Bill Murray', id:players.length, x: 500, rotation: 110, turretRotation: 70, shootArray: shoots, playersArray: players});
        players.push(player2);
        gameLoop();

        //On créé un textLog de test
        for(var i = 0; i < 10; i++) {
            if(i % 2 === 0)
                textLog.push({msg : 'String ' + i +' de test assez longue pour afficher un kill, ou pas', color: 'green'});
            else 
                textLog.push({msg : 'String ' + i +' de test pour faire un sapin de noel coloré', color: 'red'});
        }
        
    }

    function gameLoop() {
        ctx.clearRect(0, 0, game.width, game.height);

        //Collision sommaire très imprecise
        for(var playerId = 0; playerId < players.length; playerId++) {
            for(var shootId = 0; shootId < shoots.length; shootId++) {
                var lShoot = shoots[shootId];
                var lPlayer = players[playerId];

                //On teste pas la collision entre le joueur et son tir
                if(lShoot.playerId === lPlayer.id) continue;

                var distance = Math.sqrt(Math.pow((lShoot.x - lPlayer.x),2) + Math.sqrt((lShoot.y - lPlayer.y), 2));
                if(distance < 50) {
                    console.log('Joueur ' + lShoot.playerId + ' a touché Joueur ' + playerId);
                    lShoot.destroy();
                    lPlayer.onHit(players[lShoot.playerId]);
                }
            }
        }

        for(var shoot of shoots) {
            shoot.doAction();
            shoot.draw();
        }

        for(var lPlayer of players) {
            lPlayer.draw();
        }
        
        displayTextLog();

        timeout = setTimeout(gameLoop, 25);
	}

    /*Permet d'afficher le textLog, les messages sont des objets ayant comme props :
    *  {msg   : 'le message a afficher',
    *   color : 'la couleur du message'}
    */
    function displayTextLog(pParams) {
        var params = pParams || {};
        var fontSize = params.fontSize || 12;
        var font = params.font || 'Arial';
        var nbMessagesDisplayed = params.nbDisplay || 5;

        ctx.font = fontSize+'px '+font;
        
        var textLogDisplayed = textLog.slice(textLog.length - nbMessagesDisplayed, textLog.length);

        for(var i = 0; i < textLogDisplayed.length; i++) {
            ctx.fillStyle = textLogDisplayed[i].color || 'white';
            ctx.fillText(textLogDisplayed[i].msg, 700, 20 * i + fontSize);
        }

    }
   /* window.addEventListener('keydown', function(pEvent) {
        var keyCodesToPrevent = [32, 37, 38, 39, 40];
        if(keyCodesToPrevent.indexOf(pEvent.keyCode) != -1) {
            pEvent.preventDefault();
        }
        

        if(pEvent.keyCode == 37) player.rotation -= player.rotationSpeed;
        else if (pEvent.keyCode == 39) player.rotation += player.rotationSpeed;

        if(pEvent.ctrlKey) {
            if(pEvent.keyCode == 38) player.turretRotation += player.turretSpeed;
            else if(pEvent.keyCode == 40) player.turretRotation -= player.turretSpeed;
        } else {
            if(pEvent.keyCode == 38) player.move(true);
            else if(pEvent.keyCode == 40) player.move(false);
        }
        

        //if(pEvent.keyCode == 38) player.turretRotation += player.turretSpeed;
        //else if(pEvent.keyCode == 40) player.turretRotation -= player.turretSpeed;

        if(pEvent.keyCode == 32) player.shoot();
    });*/
})();