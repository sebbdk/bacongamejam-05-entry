function lineDistance( point1, point2 ) {
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
}

function PlayerShotConfig() {
	this.cooldown = 300;
	this.lastShot = 0;

	this.run = function(origin, dest, evil) {
		evil = evil ? evil:false;

		if(new Date().getTime() > this.lastShot+this.cooldown) {
			var bullet = new game.BulletEntity({
				from_x:origin.x,
				from_y:origin.y,
				evil:evil,
				to_x:dest.x,
				to_y:dest.y
			});

			me.game.add(bullet, 10);
			me.game.sort();
			this.lastShot = new Date().getTime();
		}
	};
}

function MonsterShotConfig() {
	this.cooldown = 3000;
	this.lastShot = 0;

	this.run = function(origin, dest, evil) {
		evil = evil ? evil:false;

		if(new Date().getTime() > this.lastShot+this.cooldown) {
			var bullet = new game.BulletEntity({
				from_x:origin.x,
				from_y:origin.y,
				evil:evil,
				speed:2,
				to_x:dest.x,
				to_y:dest.y
			});

			me.game.add(bullet, 4);
			me.game.sort();
			this.lastShot = new Date().getTime();
		}
	};
}

game.CreatureEntity = me.ObjectEntity.extend({

	isMonster:false,
	path:null,

	shotConfig:null,

	lastPathFindTime:Math.round(new Date().getTime()),

	init:function(x, y, settings) {
		var _self = this;

		this.parent(x, y, settings);

		this.collidable = true;
		this.setVelocity(3, 3);
		this.path = null;

		this.gridPos = {
			x:Math.ceil(this.pos.x/96),
			y:Math.ceil(this.pos.y/96)
		};
	},

	shoot:function(dest, evil) {
		if(this.shotConfig) {
			this.shotConfig.run(this.pos, dest, evil);
		}
	},

	findPath:function(dest) {
		if(this.pos) {
			var grid = game.grid.clone();
			this.path = game.finder.findPath(
				Math.round(this.pos.x/96),
				Math.round(this.pos.y/96),

				dest.x,
				dest.y,
				grid
			);

			this.path.shift();

			this.gotoVector = null;

			if(this.path.length) {
				this.destination = [this.path[this.path.length-1][0], this.path[this.path.length-1][1]];
			}
		}
	}

});
