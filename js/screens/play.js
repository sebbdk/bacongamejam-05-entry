game.PlayScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		me.levelDirector.loadLevel("levelbase");
		me.video.scale(me.video.getScreenContext(), 1.5);
		me.sys.gravity = 0;
	},

	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// TODO
	}
});
