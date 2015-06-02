define([], function() {
	function Game (pParams) {
		var params  = pParams ||{};
		this.width  = params.width  || 800;
		this.height = params.height || 600;

		this.renderer = new PIXI.WebGLRenderer(1024, 768);
	}

	return Game;
})