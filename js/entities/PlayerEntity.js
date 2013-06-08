game.PlayerEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		this.parent(x, y, settings);

		this.maxVel.x = 4;
		this.maxVel.y = 4;
		this.setVelocity(6, 6);

		this.updateColRect(18, 60, -1, 0);

		this.camPos = new me.Vector2d(this.pos.x, this.pos.y);
		me.game.viewport.follow(this.camPos, me.game.viewport.AXIS.BOTH);

		game.player = this;
	},

	update:function() {

		if(me.input.isKeyPressed('right')) {
			this.vel.x += this.accel.x * me.timer.tick;
		}

		if(me.input.isKeyPressed('left')) {
			this.vel.x -= this.accel.x * me.timer.tick;
		}

		if(me.input.isKeyPressed('up')) {
			this.vel.y -= this.accel.x * me.timer.tick;
		}

		if(me.input.isKeyPressed('down')) {
			this.vel.y += this.accel.x * me.timer.tick;
		}

		if(!me.input.isKeyPressed('left') && !me.input.isKeyPressed('right')) {
			this.vel.x = 0;
		}

		if(!me.input.isKeyPressed('down') && !me.input.isKeyPressed('up')) {
			this.vel.y = 0;
		}

		this.updateMovement();

		this.camPos.x = this.pos.x + 48;
		this.camPos.y = this.pos.y + 48;

		// update animation if necessary
		if (this.vel.x !== 0 || this.vel.y !== 0) {
			// update object animation
			this.parent();
			return true;
		}

		return false;
	}

});
