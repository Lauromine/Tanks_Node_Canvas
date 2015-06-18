//Code client
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
})

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

require(['game', 'player'], function(Game, Player) {
    var game,
        player,
        players = [];

    init();

    var Id;
    var timeout;

    function waitServerRespond() {
        var socket = io();
        socket.on("connexionOk", function(pId){
            Id = pId;
            console.log("connexionOk");
            
            socket.on("newPlayerJoin", function(){
                console.log("a new player join the server");
            });

            socket.on("deconnectionOk", function(){
                destroy();
            });

            socket.on("aPlayerLeave", function(IdLeaver){
                console.log("a player leave the server, his id is :" + IdLeaver);
            });

            init();
        });
    }

    function init() {
        game = new Game({
            width  : 1024,
            height : 768
        });
        player = new Player();
        gameLoop();
    }

    function gameLoop() {
        ctx.clearRect(0, 0, game.width, game.height);

        player.draw();
        timeout = setTimeout(gameLoop, 30);
	}

    function stopGameLoop() {
        window.clearTimeout(timeout);
    }

    function destroy() {
        stopGameLoop();
        game = null;
        player = null;
    }

    window.addEventListener("keydown", function(pEvent) {
        if(pEvent.keyCode == 37) player.rotation--;
        else if (pEvent.keyCode == 39) player.rotation++;
    });



})();