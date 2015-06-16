//Code client
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
})

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

require(['game', 'player'], function(Game, Player) {
    var game,
        player,
        players = [],
        shoots = [];

    init();

    var Id;

    function waitServerRespond() {
        var socket = io();
        socket.on("connexionOk", function(pId){
            Id = pId;
            console.log("connexionOk");
            
            socket.on("newPlayerJoin", function(){
                console.log("a new player join the server");
            })


            init();
        });
    }

    function init() {
        game = new Game({
            width  : 1024,
            height : 768
        });
        player = new Player({shootArray: shoots});
        gameLoop();
    }

    function gameLoop() {
        ctx.clearRect(0, 0, game.width, game.height);

        player.draw();

        for(shoot of shoots) {
            shoot.doAction();
            shoot.draw();
        }

        setTimeout(gameLoop, 25);
	}

    window.addEventListener("keydown", function(pEvent) {
        pEvent.preventDefault();

        if(pEvent.keyCode == 37) player.rotation += player.rotationSpeed;
        else if (pEvent.keyCode == 39) player.rotation -= player.rotationSpeed;

        if(pEvent.keyCode == 38) player.turretRotation += player.turretSpeed;
        else if(pEvent.keyCode == 40) player.turretRotation -= player.turretSpeed;

        if(pEvent.keyCode == 32) player.shoot();
    })

})();