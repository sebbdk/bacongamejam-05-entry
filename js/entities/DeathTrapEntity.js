game.DeathTrapEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		this.parent(x, y, settings);

		this.collidable = true;
	},

	onCollision:function(res, obj) {
		me.game.remove(obj);
		if(obj === game.player) {
			me.levelDirector.reloadLevel(true);
		}
	},

	update:function() {
		me.game.collide(this);
	}

});
