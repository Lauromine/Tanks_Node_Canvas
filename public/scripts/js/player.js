define([], function() {
	function Player(pParams) {
		var params = pParams ||{};
		this.id = params.id || 0;
		this.x  = params.x || 120;
		this.y  = params.y || 240;
		this.width  = params.width  || 150;
		this.height = params.height || 75;
		this.color  = params.color || 'rgb(255, 64, 0)';
		this.rotation =  0; //degrees

		this.sprite = params.sprite;
		this.turret = null;

		this.controller = null;
	}
	
	Player.prototype.draw = function() {
		ctx.save();
		this.rotate(this.rotation);

		ctx.fillStyle = this.color;
		//ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillRect( -this.width/2, -this.height/2, this.width,this.height);
		this.drawTurret();

		ctx.restore();
	}

	Player.prototype.drawTurret = function() {
		ctx.fillStyle   = this.color;
		ctx.strokeStyle = 'green';

		var turretRadius = 30;
		ctx.lineWidth   = turretRadius/5;
		ctx.beginPath();
		//ctx.arc(this.x + this.width/2, this.y + this.height/2, turretRadius, 0, 2 * Math.PI, false);
		ctx.arc(0, 0, turretRadius, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.stroke();

		var canonWidth  = 100;
		var canonHeight =  10;
		ctx.fillRect(0, 0 - canonHeight/2, canonWidth, canonHeight);
		ctx.lineWidth = turretRadius/10;
		ctx.strokeRect(0, 0 - canonHeight/2, canonWidth, canonHeight);

		ctx.fill();
	}

	Player.prototype.move = function(pX, pY) {
		this.x = pX;
		this.y = pY;
	}

	Player.prototype.rotate = function(pAngle) {
		var angle = pAngle || 0;
		var x = this.x + this.width /2;
		var y = this.y + this.height/2;

		ctx.translate(x, y);
		ctx.rotate(angle*Math.PI/180);
	}

	Player.prototype.rotateTurret = function(pAngle) {

	}

	Player.prototype.init = function() {

	}

	return Player;
})