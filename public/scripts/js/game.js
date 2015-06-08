define([], function() {
	function Game (pParams) {
		var params  = pParams ||{};
		this.width  = params.width  || 800;
		this.height = params.height || 600;
		this.color  = params.color || "black";
		//Création du renderer et du stage
		canvas.width  = this.width;
		canvas.height = this.height;
		canvas.style.background = this.color;
	}

    return Game;
})