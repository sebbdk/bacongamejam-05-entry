game.MonsterEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		this.parent(x, y, settings);

		this.collidable = true;
		this.setVelocity(4, 4);
		this.maxVel.x = 3 + 2 * Math.random();
		this.maxVel.y = 3 + 2 * Math.random() ;
	},

	onCollision:function(res, obj) {
		if(obj === game.player) {
			me.levelDirector.reloadLevel(true);
		}
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
		me.game.collide(this);

		// update animation if necessary
		if (this.vel.x !== 0 || this.vel.y !== 0) {
			// update object animation
			this.parent();
			return true;
		}

		return false;
	}

});
