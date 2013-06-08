game.PlayerEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		this.parent(x, y, settings);

		this.maxVel.x = 2;
		this.maxVel.y = 2;
		this.setVelocity(3, 3);

		this.updateColRect(6, 20, -1, 0);

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

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

		// update animation if necessary
		if (this.vel.x !== 0 || this.vel.y !== 0) {
			// update object animation
			this.parent();
			return true;
		}

		return false;
	}

});
