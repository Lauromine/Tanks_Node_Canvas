//Code client
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
})

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

require(['game', 'player'], function(Game, Player) {
<<<<<<< HEAD
<<<<<<< HEAD

    var game,
        player,
        players = [];

    init();

=======
=======
    var Id;
>>>>>>> origin/master
    var assetsToLoad = [
        "assets/sprites/player.png"
    ]
    var loader = new PIXI.AssetLoader(assetsToLoad);
    loader.load();
    loader.onProgress = function() {
        this.filesCount = this.filesCount || 0;
        this.filesCount++;
        console.log('Files loaded : '+this.filesCount);
    }
    loader.onComplete = waitServerRespond;

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
    
    var game, player;
>>>>>>> origin/master
    function init() {
        game = new Game({
            width  : 1024,
            height : 768
        });
<<<<<<< HEAD
        player = new Player();
        gameLoop();
    }

    function gameLoop() {
        ctx.clearRect(0, 0, game.width, game.height);

        player.draw();
        setTimeout(gameLoop, 30);
	}
    window.addEventListener("keydown", function() {
        player.x++;
    })
	
=======
        player = new Player({
            sprite : new PIXI.Sprite(PIXI.Texture.fromImage("assets/sprites/player.png"))
        });
        document.body.appendChild(game.renderer.view);
        game.stage.addChild(player.sprite);
        gameLoop();
    }

    function gameLoop() {
        game.renderer.render(game.stage);
        setTimeout(gameLoop, 17);
    }
    
>>>>>>> origin/master
})();