'use strict';
/*global socket*/
/*
* @author : Benjamin
*/
define([], function() {
	function TankController(pParams) {
		var params = pParams || {};
		this.id = params.id || 0;

        this.role = 'tank';
        this.players = params.players || [];
		this.keyControl = function() {};
	}

	TankController.prototype.addInputsListeners = function() {
		var that = this;
        var player;
		window.addEventListener('keydown', function(pEvent) {
			player = that.players[that.id];
	        var keyCodesToPrevent = [32, 37, 38, 39, 40];
	        if(keyCodesToPrevent.indexOf(pEvent.keyCode) != -1) {
	            pEvent.preventDefault();
	        }
	        

	        if(pEvent.keyCode == 37) player.rotation -= player.rotationSpeed;
	        else if (pEvent.keyCode == 39) player.rotation += player.rotationSpeed;

	        if(pEvent.keyCode == 38) player.move(true);
            else if(pEvent.keyCode == 40) player.move(false);

            var playerControlled = that.players[that.id];
            var playerToSend = {
                id: that.id,
                x: playerControlled.x,
                y: playerControlled.y,
                rotation: playerControlled.rotation
            }
            socket.emit('playerAction', playerToSend, that.role);
	    });
	};

	TankController.prototype.destroy = function () {
        window.removeEventListener('keydown', this.keyControl);
    };
	return TankController;
});