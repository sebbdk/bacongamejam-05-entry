game.TestObject = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		settings.image = 'monster01';
		settings.spritewidth = 96;
		settings.spriteheight = 96;
		this.parent(x, y, settings);
	}

});

function lineDistance( point1, point2 ) {
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
}


game.MonsterEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		var _self = this;

		this.parent(x, y, settings);

		this.collidable = true;
		this.setVelocity(4, 4);
		this.maxVel.x = 3 + 2 * Math.random();
		this.maxVel.y = 3 + 2 * Math.random() ;
		this.path = null;

		this.updateColRect(18, 60, 18, 60);

		me.event.subscribe('playerPosChange', function() {
			_self.findPath();
		});
	},

	findPath:function() {
		if(this.pos) {
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
		}
	},

	onCollision:function(res, obj) {
		if(obj === game.player) {
			me.levelDirector.reloadLevel(true);
			me.state.current().onResetEvent()
		}
	},

	gotoVector:null,
/**
 * This function is hell in a bucket,please fix it....
 * @return despair ..... (boolean)
 */
	update:function() {
		if(this.path && this.path.length > 0) {

			if(this.gotoVector === null || lineDistance(this.pos, this.gotoVector) < 10) {
				if(this.gotoVector) {
					this.pos.x = this.gotoVector.x;
					this.pos.y = this.gotoVector.y;
					this.path.shift();
				}

				if(this.path.length > 0) {
					this.gotoVector = new me.Vector2d((this.path[0][0]*96), (this.path[0][1]*96));
				}
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
