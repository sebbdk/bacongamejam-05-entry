game.PlayScreen = me.ScreenObject.extend({
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

	},

	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// TODO
	}
});
