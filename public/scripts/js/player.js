define([], function() {
	function Player(pParams) {
		var params = pParams ||{};
		this.x = params.x || 120;
		this.x = params.y || 240;
		this.sprite = params.sprite || {};
	}
	return Player;
})