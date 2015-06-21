'use strict';
/*
* @author : Benjamin
*/
define([], function() {
	function Shoot (pParams) {
		var params = pParams ||{};
		this.x = params.x || 120;
		this.y = params.y || 240;
		this.color = params.color || 'red';

        this.playerId = params.playerId || 0;

		var speedFactor = 10;
		this.speed = {
			x : params.speed.x * speedFactor,
			y : params.speed.y * speedFactor
		} || {x:3, y:3};

		this.radius = 10;

		this.lifeSpan = 100;
		this.lifeCounter = 0;

		this.shootArray = params.shootArray || null;
	}

	Shoot.prototype.draw = function() {
		this.lifeCounter++;
		if (this.lifeCounter >= this.lifeSpan) this.destroy();

		ctx.fillStyle = 'rgb(255, 0, 0)';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
	};

    Shoot.prototype.move = function () {
		this.x += this.speed.x;
		this.y += this.speed.y;
	};

	Shoot.prototype.doAction = function () {
		this.move();
	};

	Shoot.prototype.destroy = function () {
		console.log('destroy');
		this.shootArray.splice(this.shootArray.indexOf(this), 1);
	};
	return Shoot;
});