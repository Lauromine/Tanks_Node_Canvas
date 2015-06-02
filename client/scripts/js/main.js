//Code client
require.config({
    urlArgs: "bust=" + (new Date()).getTime()
})

require(['game', 'loading_manager', 'player'], function(Game, LoadingManager, Player) {
	var loader = new PIXI.AssetLoader([
			"assets/sprites/player.png"
		]);
	loader.load();
	var game = new Game();
	var player = new Player({
		sprite : new PIXI.Sprite(PIXI.Texture.fromImage("assets/sprites/player.png"))
	});
	document.body.appendChild(game.renderer.view);
})();