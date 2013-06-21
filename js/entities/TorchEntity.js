game.TorchEntity = me.ObjectEntity.extend({

	init:function(x, y, settings) {
		settings = settings ? settings:{};

		settings.image = "torch";
		settings.spritewidth = 96;
		settings.spriteheight = 96;

		this.parent(x, y, settings);

		this.collidable = false;
	}

});
