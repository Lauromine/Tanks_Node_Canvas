//Code client
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
})

require(['game', 'player'], function(Game, Player) {
    var Id;
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
    function init() {
        game = new Game({
            width  : 1024,
            height : 768
        });
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
    
})();