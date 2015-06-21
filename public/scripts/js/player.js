'use strict';
/*global textLog */
/*
* @author : Benjamin
*/
define(['shoot', 'tankController', 'turretController'], function (Shoot, TankController, TurretController) {
    function Player (pParams) {
        var params = pParams || {};
        this.id = params.id || 0;
        this.name = params.name || 'Player' + this.id;
        this.x  = params.x || 120;
        this.y  = params.y || 240;
        this.height = params.height || 75;
        this.width  = params.width  || 150;
        this.color  = params.color || 'rgb(255, 204, 64)';

        this.speed = {x: 5, y: 5};
        this.rotation =  params.rotation || 0; //degrees

        this.sprite = params.sprite;
        this.turret = null;
        this.rotationSpeed = 5;

        this.turretRotation = params.turretRotation || 0; //degrees 
        this.turretSpeed    = 5;
        this.canonWidth  = 100;
        this.canonHeight =  10;
        this.controller  = null;

        //Références aux tableaux
        this.shootArray = params.shootArray || [];
        this.players    = params.playersArray || [];

        //Points de vie du tank
        this.hitPoints = 5;
        //Quand reçoit l'info de quelle 'place' le joueur occupe > initController() avec turret ou tank en paramètre + id
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

    Player.prototype.initController = function(pRole, pId) {
        if(pRole === 'tank') {
            this.controller = new TankController({id: pId, players: this.players});
        } else {
            this.controller = new TurretController({id: pId, players: this.players});
        }

        this.controller.addInputsListeners();
    };

    Player.prototype.shoot = function () {
        var shootAngle = this.rotation + this.turretRotation;
        var angleInRad = shootAngle * Math.PI / 180;

        var shoot = new Shoot({
            playerId : this.id,
            x: this.x + this.width  / 2,
            y: this.y + this.height / 2,
            shootArray: this.shootArray,
            speed: {
                x: Math.cos(angleInRad),
                y: Math.sin(angleInRad)
            },
            color : 'green'
        });

        this.shootArray.push(shoot);
    };

    Player.prototype.onHit = function(pEnemy) {
        this.hitPoints--;
        if(this.hitPoints <= 0) {
            textLog.push({msg: pEnemy.name + ' killed ' + this.name, color: 'red'});
            this.destroy();

            //++ Envoyer message + mort du joueur au serveur pour le transmettre aux autres joueurs
        }
    };

    Player.prototype.destroy = function() {
        this.players.splice(this.players.indexOf(this), 1);
    };

    return Player;
});