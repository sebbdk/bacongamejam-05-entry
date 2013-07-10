var darktiles = [];
game.PlayScreen = me.ScreenObject.extend({

	hasDarklayer:false,

	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		me.levelDirector.loadLevel("levelbase_large");

		game.finder = new PF.AStarFinder({allowDiagonal: false});
		game.grid = new PF.Grid(16, 16);
		for(var x = 0; x < me.game.collisionMap.layerData.length; x++) {
			for(var y = 0; y < me.game.collisionMap.layerData[x].length; y++) {
				if(me.game.collisionMap.layerData[x][y]) {
					game.grid.setWalkableAt(x, y, false);
				}
			}
		}

		this.buildDarkLayer();

		var _self = this;
		me.event.subscribe('placeTorch', function(data) { _self.placeTorch(data); });
	},

	resetLevel:function() {
		me.levelDirector.reloadLevel(true);
		this.buildDarkLayer();
	},

	placeTorch:function(pos) {
		var torch = new game.TorchEntity(pos.x * me.game.currentLevel.tilewidth, pos.y * me.game.currentLevel.tileheight);
		me.game.add(torch, 3);
		me.game.sort();
		this.lightUpArea(pos);
	},

	lightUpArea:function(pos) {
		if(darktiles.length > 0) {
			var tiles = [
				{x:pos.x, y:pos.y},
				{x:pos.x+1, y:pos.y},
				{x:pos.x-1, y:pos.y},
				{x:pos.x, y:pos.y+1},
				{x:pos.x, y:pos.y-1},

				{x:pos.x+1, y:pos.y+1},
				{x:pos.x-1, y:pos.y-1},
				{x:pos.x-1, y:pos.y+1},
				{x:pos.x+1, y:pos.y-1},

				{x:pos.x+2, y:pos.y},
				{x:pos.x-2, y:pos.y},
				{x:pos.x, y:pos.y+2},
				{x:pos.x, y:pos.y-2}
			];

			for(var i = 0; i < tiles.length; i++) {
				darktiles[tiles[i].x][tiles[i].y].visible = false;
			}
		}
	},

	buildDarkLayer:function() {
		if(this.hasDarklayer) {
			darktiles = [];

			for(var x = 0; x < me.game.currentLevel.cols; x++) {
				for(var y = 0; y < me.game.currentLevel.cols; y++) {
					var tile = new game.DarknessEntity(x*me.game.currentLevel.tilewidth, y*me.game.currentLevel.tileheight, {});
					//tile.visible = false;
					me.game.add(tile, 5000);
					me.game.sort();

					if(!darktiles[x]) {
						darktiles[x] = [];
					}

					darktiles[x][y] = tile;
				}
			}
		}
	},

	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
