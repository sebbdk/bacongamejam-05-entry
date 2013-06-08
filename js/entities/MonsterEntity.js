game.MonsterEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		this.parent(x, y, settings);

		this.maxVel.x = 1;
		this.maxVel.y = 1;
		this.setVelocity(4, 4);
	},

	update:function() {
		if(game.player) {
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
