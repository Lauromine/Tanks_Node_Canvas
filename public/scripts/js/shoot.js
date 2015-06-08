define([], function() {
	function Shoot(pParams) {
		var params = pParams ||{};
		this.x = params.x || 120;
		this.y = params.y || 240;
		this.sprite = null;
	}

	Shoot.prototype.move = function(pX, pY) {
		this.sprite.position.set(pX, pY);
	}

});