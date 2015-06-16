define([], function() {
	function Shoot(pParams) {
		var params = pParams ||{};
		this.x = params.x || 120;
		this.y = params.y || 240;
		this.sprite = null;

		this.speed = params.speed || {x:0, y:0};

		this.sprite = ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);

		this.lifeSpan = 100;
		this.lifeCounter = 0;

		this.shootArray = params.shootArray || null;
		this.shootArray.push(this);

	}

	Shoot.prototype.draw = function() {
		this.lifeCounter++
		if(this.lifeCounter >= this.lifeSpan) this.destroy();


	}

	Shoot.prototype.move = function(pX, pY) {
		this.sprite.position.set(pX, pY);
	}

	Shoot.prototype.doAction = function() {
		console.log('doAction');
	}

	Shoot.prototype.destroy = function() {
		console.log('destroy')
		this.shootArray.splice(this.shootArray.indexOf(this), 1);
	}
	return Shoot;
});