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

	isMonster:true,

	init:function(settings) {
		this.inst++;
		settings.image = "torch";
		settings.spritewidth = 96;
		settings.spriteheight = 96;
		this.speed = settings.speed !== undefined ? settings.speed:this.speed;
		this.evil = settings.evil;

		this.destination.x = settings.to_x;
		this.destination.y = settings.to_y;
		this.parent(settings.from_x, settings.from_y, settings);
		this.calculateMovementMomentum();
	},

	update:function(context) {
		this.pos.x += this.moveVelocity.x;
		this.pos.y += this.moveVelocity.y;
		me.game.collide(this);
	},

	draw: function(context, rect) {
		this.parent(context, rect);
		//context.fillStyle = 'green';
		//context.fillRect(this.pos.x, this.pos.y, 100, 100);
	},

	onCollision:function(res, obj) {
		if(obj === game.player && this.evil === true) {
			me.game.remove(obj);
			me.state.current().resetLevel();
		}

		if(obj.isMonster === true && this.evil === false) {
			me.game.remove(obj);
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
