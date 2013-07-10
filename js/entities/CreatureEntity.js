function lineDistance( point1, point2 ) {
	var xs = 0;
	var ys = 0;

	xs = point2.x - point1.x;
	xs = xs * xs;

	ys = point2.y - point1.y;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
}

game.CreatureEntity = me.ObjectEntity.extend({

	isMonster:false,
	path:null,
	shotConfig:null,
	health:5,
	canPush:true,

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

	damage:function(d) {
		this.health -= d;
		if(this.health < 0) {
			this.die();
		}
	},

	die:function() {
		me.game.remove(this);
	},

	shoot:function(dest, evil) {
		if(this.shotConfig) {
			this.shotConfig.run(this, dest, evil);
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
