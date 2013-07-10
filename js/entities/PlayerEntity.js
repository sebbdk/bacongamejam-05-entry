game.PlayerEntity = game.CreatureEntity.extend({

	hasPlacedTorch:false,

	init:function(x, y, settings) {
		this.parent(x, y, settings);

		this.setVelocity(4, 4);
		this.updateColRect(18, 60, -1, 0);

		this.camPos = new me.Vector2d(96*8, 96*8);
		me.game.viewport.follow(this.camPos, me.game.viewport.AXIS.BOTH);

		game.player = this;

		this.shotConfig = new PlayerShotConfig();

		this.health = 100;

		me.event.publish('playerPosChange', [this.gridPos]);
		me.event.publish('playerAdded', this);
	},

	die:function() {
		me.state.current().resetLevel();
	},

	isVisible:function() {
		return (darktiles[this.gridPos.x] &&
			darktiles[this.gridPos.x][this.gridPos.y] &&
			darktiles[this.gridPos.x][this.gridPos.y].visible === false);
	},

	update:function() {

		var newGridPos = {
			x:Math.round(game.player.pos.x/96),
			y:Math.round(game.player.pos.y/96)
		};

		if(newGridPos.x != this.gridPos.x || newGridPos.y != this.gridPos.y ) {
			this.gridPos = newGridPos;
			me.event.publish('playerPosChange', [this.gridPos]);
		}

		//movement bindings
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

		//attack bindings!
		if(me.input.isKeyPressed('shoot_right')) {
			this.shoot({x:this.pos.x+10, y:this.pos.y});
		}

		if(me.input.isKeyPressed('shoot_left')) {
			this.shoot({x:this.pos.x-10, y:this.pos.y});
		}

		if(me.input.isKeyPressed('shoot_up')) {
			this.shoot({x:this.pos.x, y:this.pos.y-10});
		}

		if(me.input.isKeyPressed('shoot_down')) {
			this.shoot({x:this.pos.x, y:this.pos.y+10});
		}


		//torch bindings
		if(me.input.isKeyPressed('place_torch') && !this.hasPlacedTorch) {
			me.event.publish('placeTorch', [this.gridPos]);
			this.hasPlacedTorch = true;
		} else if(me.input.isKeyPressed('place_torch') === false) {
			this.hasPlacedTorch = false;
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
