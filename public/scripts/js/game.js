define([], function() {
	function Game (pParams) {
		var params  = pParams ||{};
		this.width  = params.width  || 800;
		this.height = params.height || 600;

		//Création du renderer et du stage
		this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
		this.stage = new PIXI.Stage(0xAAAAAA);
	}

	return Game;
})