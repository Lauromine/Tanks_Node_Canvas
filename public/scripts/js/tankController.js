'use strict';
/*
* @author : Benjamin
*/
define([], function() {
	function TankController(pParams) {
		var params = pParams || {};
		this.id = params.id || 0;

		this.keyControl = function() {};
	}

	TankController.prototype.addInputsListeners = function() {
		var that = this;
		window.addEventListener('keydown', function(pEvent) {
			var player = that.players[that.id];
	        var keyCodesToPrevent = [32, 37, 38, 39, 40];
	        if(keyCodesToPrevent.indexOf(pEvent.keyCode) != -1) {
	            pEvent.preventDefault();
	        }
	        

	        if(pEvent.keyCode == 37) player.rotation -= player.rotationSpeed;
	        else if (pEvent.keyCode == 39) player.rotation += player.rotationSpeed;

	        if(pEvent.keyCode == 38) player.move(true);
            else if(pEvent.keyCode == 40) player.move(false);
	    });
	};

	TankController.prototype.destroy = function () {
        window.removeEventListener('keydown', this.keyControl);
    };
	return TankController;
});