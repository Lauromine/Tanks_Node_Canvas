'use strict';
/*
* @author : Benjamin
*/
define([], function() {
	function TurretController (pParams) {
		var params = pParams || {};
		this.id = params.id || 0;
        this.players = params.players || [];

        this.reloadTime = 1000;
        this.canShoot = true;

        this.keyControl = function() {};
	}

	TurretController.prototype.addInputsListeners = function() {
        var that = this;
        window.addEventListener('keydown', this.keyControl = function(pEvent) {
            var player = that.players[that.id];
            var keyCodesToPrevent = [32, 37, 39];
            if(keyCodesToPrevent.indexOf(pEvent.keyCode) != -1) {
                pEvent.preventDefault();
            }
            
            if(pEvent.keyCode == 37) player.turretRotation -= player.turretSpeed;
            else if(pEvent.keyCode == 39) player.turretRotation += player.turretSpeed;

            if(pEvent.keyCode == 32 && that.canShoot) {
                player.shoot();
                that.canShoot = false;
                that.reloadTimeout = window.setTimeout(function() {
                    that.canShoot = true;
                }, that.reloadTime);
            }
        });
	};

    TurretController.prototype.destroy = function () {
        window.removeEventListener('keydown', this.keyControl);
    };

	return TurretController;
});