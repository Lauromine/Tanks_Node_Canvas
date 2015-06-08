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
        setTimeout(gameLoop, 30);
	}
    window.addEventListener("keydown", function() {
        player.x++;
    })
	
})();