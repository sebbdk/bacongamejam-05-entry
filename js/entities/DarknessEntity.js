/**
 * masks the tiles that are not near a lightsource
 *
 * This is somewhat of a hack, it would be better as a tile layer, but i am short on time
 */
game.DarknessEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		settings.image = "darktile";
		settings.spritewidth = 96;
		settings.spriteheight = 96;
		this.parent(x, y, settings);
	}

});
