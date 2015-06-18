'use strict';
define(['shoot'], function (Shoot) {
    function Player (pParams) {
        var params = pParams || {};
        this.id = params.id || 0;
        this.x  = params.x || 120;
        this.y  = params.y || 240;
        this.height = params.height || 75;
        this.width  = params.width  || 150;

        this.color  = params.color || 'rgb(255, 204, 64)';

        this.speed = {x: 5, y: 5};
        this.rotation =  0; //degrees

        this.sprite = params.sprite;
        this.turret = null;
        this.rotationSpeed = 5;

        this.turretRotation = 0; //degrees 
        this.turretSpeed    = 5;
        this.canonWidth  = 100;
        this.canonHeight =  10;
        this.controller = null;

        this.shootArray = params.shootArray || null;
    }

    Player.prototype.draw = function () {
        ctx.save();
        this.rotate(this.rotation);

        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.fillStyle = 'grey';
        //Rectangles gris sur la caisse
        ctx.fillRect(-this.width / 2, -this.height / 3, this.width / 2, this.height / 1.5);
        ctx.fillRect(this.width / 2 - 50, -this.height / 4, this.width / 3, this.height / 2);
        this.drawTurret();

        ctx.restore();
    };

    Player.prototype.drawTurret = function () {
        ctx.fillStyle   = this.color;
        ctx.strokeStyle = 'green';

        //Dessin de la tourelle
        var turretRadius = 30;
        ctx.lineWidth   = turretRadius / 5;
        ctx.beginPath();
        //ctx.arc(this.x + this.width/2, this.y + this.height/2, turretRadius, 0, 2 * Math.PI, false);
        ctx.arc(0, 0, turretRadius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.stroke();

        //Dessin du canon
        this.rotateTurret(this.turretRotation);
        ctx.fillRect(0, -this.canonHeight / 2, this.canonWidth, this.canonHeight);
        ctx.lineWidth = turretRadius / 10;
        ctx.strokeRect(0, -this.canonHeight / 2, this.canonWidth, this.canonHeight);

        ctx.fill();
    };

    Player.prototype.move = function (isGoingForward) {
        var angleInRad = this.rotation * Math.PI / 180;

        if (isGoingForward) {
            this.x += Math.cos(angleInRad) * this.speed.x;
            this.y += Math.sin(angleInRad) * this.speed.y;
        } else {
            this.x -= Math.cos(angleInRad) * this.speed.x;
            this.y -= Math.sin(angleInRad) * this.speed.y;
        }
    };

    Player.prototype.rotate = function (pAngle) {

        var angle = pAngle || 0;
        var x = this.x + this.width  / 2;
        var y = this.y + this.height / 2;

        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);
    };

    Player.prototype.rotateTurret = function (pAngle) {
        var angle = pAngle || 0;
        ctx.rotate(angle * Math.PI / 180);
    };

    /*Player.prototype.init = function() {

    };*/

    Player.prototype.shoot = function () {
        var shootAngle = this.rotation + this.turretRotation;
        var angleInRad = shootAngle * Math.PI / 180;

        var shoot = new Shoot({
            x: this.x + this.width  / 2,
            y: this.y + this.height / 2,
            shootArray: this.shootArray,
            speed: {
                x: Math.cos(angleInRad),
                y: Math.sin(angleInRad)
            },
            color : this.color
        });
    };

    return Player;
});