game.BulletEntity = me.ObjectEntity.extend({

	destination:{
		x:500,
		y:500
	},

	moveVelocity:{
		x:0,
		y:0
	},

	speed:10,

	evil:false,

	isBullet:true,

	sender:null,

	damage:1,

	init:function(settings) {
		settings.image = "torch";
		settings.spritewidth = 96;
		settings.spriteheight = 96;

		this.speed = settings.speed !== undefined ? settings.speed:this.speed;
		this.evil = settings.evil;

		this.sender = settings.sender;

		this.destination.x = settings.to_x;
		this.destination.y = settings.to_y;
		this.parent(settings.from_x, settings.from_y, settings);

		this.updateColRect(25, 50, 20, 55);
		this.calculateMovementMomentum();
	},

	update:function(context) {
		//this.pos.x += this.moveVelocity.x;
		//this.pos.y += this.moveVelocity.y;

		this.vel.x += this.moveVelocity.x * me.timer.tick;
		this.vel.y += this.moveVelocity.y * me.timer.tick;
		me.game.collide(this);

		var res = this.updateMovement();

		var hasEnviroCollision = (res.x !== 0 || res.y !== 0);

		if(hasEnviroCollision) {
			me.game.remove(this);
			me.game.sort();
		}

		// update animation if necessary
		if (this.vel.x !== 0 || this.vel.y !== 0) {
			// update object animation
			this.parent();
			return true;
		}

		return false;
	},

	pushTarget:function(target, res) {
		if(target.canPush === true) {
			target.vel.y = (-target.maxVel.y * me.timer.tick * 10) * (res.y > 0 ? 1:-1);
			target.vel.x = (-target.maxVel.x * me.timer.tick * 10) * (res.x > 0 ? 1:-1);
		}
	},

	onCollision:function(res, obj) {
		if(obj === game.player && this.evil === true) {
			this.pushTarget(obj, res);
			obj.damage(this.damage);
		}

		if(obj.isMonster === true && this.evil === false) {
			this.pushTarget(obj, res);
			obj.damage(this.damage);
			me.game.remove(this);
		}
	},

	calculateMovementMomentum: function() {
		//calculate rotation using real numbers
		var distX = this.destination.x - this.pos.x;
		var distY = this.destination.y - this.pos.y;

		if(distX === 0 && distY === 0) {
			return;
		}

		var angleInRadians = Math.atan2(distY, distX);
		var andleInDegrees = angleInRadians * (180 / Math.PI);

		//@TODO make toggable
		rotation = 0;//andleInDegrees;

		//calculate movement using abdsolute numbers
		distX = Math.abs(this.destination.x - this.pos.x);
		distY = Math.abs(this.destination.y - this.pos.y);
		angleInRadians = Math.atan2(distY, distX);

		var xMod = this.destination.x > this.pos.x ? 1:-1;
		this.moveVelocity = {};
		this.moveVelocity.x = Math.cos(angleInRadians) * (this.speed * xMod);

		var yMod = this.destination.y > this.pos.y ? 1:-1;
		this.moveVelocity.y = Math.sin(angleInRadians) * (this.speed * yMod);
	}
});

function PlayerShotConfig() {
	this.cooldown = 300;
	this.lastShot = 0;

	this.run = function(sender, dest, evil) {
		evil = evil ? evil:false;

		if(new Date().getTime() > this.lastShot+this.cooldown) {
			var bullet = new game.BulletEntity({
				from_x:sender.pos.x,
				from_y:sender.pos.y,
				evil:evil,
				speed:1,
				to_x:dest.x,
				to_y:dest.y,
				sender:sender
			});

			me.game.add(bullet, 10);
			me.game.sort();
			this.lastShot = new Date().getTime();
		}
	};
}

function MonsterShotConfig() {
	this.cooldown = 2000;
	this.lastShot = 0;

	this.run = function(sender, dest, evil) {
		evil = evil ? evil:false;

		if(new Date().getTime() > this.lastShot+this.cooldown) {
			var bullet = new game.BulletEntity({
				from_x:sender.pos.x,
				from_y:sender.pos.y,
				evil:evil,
				speed:0.2,
				to_x:dest.x,
				to_y:dest.y,
				sender:sender
			});

			me.game.add(bullet, 10);
			me.game.sort();
			this.lastShot = new Date().getTime();
		}
	};
}
