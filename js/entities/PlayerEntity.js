game.PlayerEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		this.parent(x, y, settings);

		this.setVelocity(6, 6);
		this.collidable = true;

		this.updateColRect(18, 60, -1, 0);

		this.camPos = new me.Vector2d(96*8, 96*8);
		me.game.viewport.follow(this.camPos, me.game.viewport.AXIS.BOTH);

		game.player = this;

		this.gridPos = {
			x:Math.ceil(game.player.pos.x/96),
			y:Math.ceil(game.player.pos.y/96)
		};
	},

	update:function() {

		var newGridPos = {
			x:Math.ceil(game.player.pos.x/96),
			y:Math.ceil(game.player.pos.y/96)
		};

		if(newGridPos.x != this.gridPos.x || newGridPos.y != this.gridPos.y ) {
			this.gridPos = newGridPos;
			me.event.publish('playerPosChange', this);
		}

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
