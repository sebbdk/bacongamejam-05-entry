game.MonsterEntity = game.CreatureEntity.extend({

	destination:null,
	gotoVector:null,
	lastPathFindTime:Math.round(new Date().getTime()),

	init:function(x, y, settings) {
		var _self = this;

		this.parent(x, y, settings);

		this.isMonster = true;
		this.setVelocity(3, 3);
		this.path = null;

		this.updateColRect(18, 60, 18, 60);

		me.event.subscribe('playerPosChange', function() { _self.attackPlayer(); });
		me.event.subscribe('placeTorch', function() { _self.attackPlayer(); });

		this.gridPos = {
			x:Math.ceil(game.player.pos.x/96),
			y:Math.ceil(game.player.pos.y/96)
		};

		this.shotConfig = new MonsterShotConfig();
	},

	attackPlayer:function() {
		this.findPath();
	},

	findPath:function() {
		if(this.pos) {
			//game.grid.setWalkableAt(this.gridPos.x, this.gridPos.y, true);

			if(this.destination) {
				//game.grid.setWalkableAt(this.destination[0], this.destination[1], true);
			}

			var grid = game.grid.clone();
			this.path = game.finder.findPath(
				Math.round(this.pos.x/96),
				Math.round(this.pos.y/96),

				game.player.gridPos.x,
				game.player.gridPos.y,
				grid
			);

			this.path.shift();

			this.gotoVector = null;

			if(this.path.length) {
				this.destination = [this.path[this.path.length-1][0], this.path[this.path.length-1][1]];
				//game.grid.setWalkableAt(this.destination[0], this.destination[1], false);
			}

			//game.grid.setWalkableAt(this.gridPos.x, this.gridPos.y, false);
		}
	},

	onCollision:function(res, obj) {
		if(obj === game.player) {
			//me.state.current().resetLevel();
		}
	},

/**
 * This function is hell in a bucket,please fix it....
 * @return despair ..... (boolean)
 */
	update:function() {
		this.shoot(game.player.pos, true);

		//check if we need to pathfind again...
		if(new Date().getTime() - this.lastPathFindTime > 100 && game.player.isVisible()) {
			this.attackPlayer();
			this.lastPathFindTime = new Date().getTime();
		}

		//become quicker if the player is visible
		if(game.player.isVisible()) {
			this.setVelocity(5, 5);
		} else {
			this.setVelocity(2, 2);
		}

		//update the grid position
		var newGridPos = {
			x:Math.round(this.pos.x/96),
			y:Math.round(this.pos.y/96)
		};

		if(newGridPos.x != this.gridPos.x || newGridPos.y != this.gridPos.y ) {
			this.gridPos = newGridPos;
		}








		//Hellish path finding logic below
		if(this.path && this.path.length > 0) {

			if(this.gotoVector === null || lineDistance(this.pos, this.gotoVector) < 10) {
				if(this.gotoVector) {
					this.pos.x = this.gotoVector.x;
					this.pos.y = this.gotoVector.y;
				}

				if(this.path.length > 0) {
					this.gotoVector = new me.Vector2d((this.path[0][0]*96), (this.path[0][1]*96));
				}

				this.path.shift();
			}
		}

		if(this.gotoVector) {
			if(this.gotoVector.x > this.pos.x) {
				this.vel.x += this.accel.x;
			}

			if(this.gotoVector.x < this.pos.x) {
				this.vel.x -= this.accel.x ;
			}

			if(Math.abs(Math.abs(this.gotoVector.x) - Math.abs(this.pos.x)) < 10) {
				this.pos.x = this.gotoVector.x;
				this.vel.x = 0;
			}

			if(this.gotoVector.y > this.pos.y) {
				this.vel.y += this.accel.y;
			}

			if(this.gotoVector.y < this.pos.y) {
				this.vel.y -= this.accel.y;
			}

			if(Math.abs(Math.abs(this.gotoVector.y) - Math.abs(this.pos.y)) < 10) {
				this.pos.y = this.gotoVector.y;
				this.vel.y = 0;
			}
		} else {
			this.vel.x = 0;
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

/*
	//OLD ALGO RYTHM
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
*/

});
