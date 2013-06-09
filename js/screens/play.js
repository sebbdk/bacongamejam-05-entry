game.PlayScreen = me.ScreenObject.extend({

	darktiles:[],

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

		this.buildLayer();
		var _self = this;
		me.event.subscribe('playerPosChange', function() { _self.onPlayerPosChange(); });

		game.PlayScreen.instance = this;
	},

	onPlayerPosChange:function() {
		var tiles = [
			{x:game.player.gridPos.x, y:game.player.gridPos.y},
			{x:game.player.gridPos.x+1, y:game.player.gridPos.y},
			{x:game.player.gridPos.x-1, y:game.player.gridPos.y},
			{x:game.player.gridPos.x, y:game.player.gridPos.y+1},
			{x:game.player.gridPos.x, y:game.player.gridPos.y-1},
		];
		
		for(var i = 0; i < tiles.length; i++) {
			this.darktiles[tiles[i].x][tiles[i].y].visible = false;
		}
	},

	buildLayer:function() {
		for(var x = 0; x < me.game.currentLevel.cols; x++) {
			for(var y = 0; y < me.game.currentLevel.cols; y++) {
				var tile = new game.DarknessEntity(x*me.game.currentLevel.tilewidth, y*me.game.currentLevel.tileheight, {});
				//tile.visible = false;
				me.game.add(tile, 5000);
				me.game.sort();

				if(!this.darktiles[x]) {
					this.darktiles[x] = [];
				}

				this.darktiles[x][y] = tile;
			}
		}
	},

	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		
	}
});
