
/* Game namespace */
var game = {
	// Run on page load.
	"onload" : function () {
		// Initialize the video.
		if (!me.video.init("screen", 960, 960, true, 'auto')) {
			alert("Your browser does not support HTML5 canvas.");
			return;
		}

		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function () {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

		// Initialize the audio.
		me.audio.init("mp3,ogg");

		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);

		// Load the resources.
		me.loader.preload(game.resources);

		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);

		//debug info
		//me.debug.renderHitBox = true;
		me.debug.displayFPS = true;
	},


	// Run on game resources loaded.
	"loaded" : function () {
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		me.sys.gravity = 0;
		me.video.setImageSmoothing(me.video.getSystemContext(), false);
		me.game.viewport.setDeadzone(0,0);

		//registre oure entities
		me.entityPool.add('PlayerEntity', game.PlayerEntity);
		me.entityPool.add('MonsterEntity', game.MonsterEntity);
		me.entityPool.add('DeathTrapEntity', game.DeathTrapEntity);
		me.entityPool.add('TestObject', game.TestObject);
		me.entityPool.add('DarknessEntity', game.DarknessEntity);
		me.entityPool.add('TorchEntity', game.TorchEntity);
		me.entityPool.add('BulletEntity', game.BulletEntity);

		//registre oure controlls
		me.input.bindKey(me.input.KEY.A, 'left');
		me.input.bindKey(me.input.KEY.D, 'right');
		me.input.bindKey(me.input.KEY.W, 'up');
		me.input.bindKey(me.input.KEY.S, 'down');

		me.input.bindKey(me.input.KEY.LEFT, 'shoot_left');
		me.input.bindKey(me.input.KEY.RIGHT, 'shoot_right');
		me.input.bindKey(me.input.KEY.UP, 'shoot_up');
		me.input.bindKey(me.input.KEY.DOWN, 'shoot_down');

		me.input.bindKey(me.input.KEY.SPACE, 'place_torch');

		// Start the game.
		me.state.change(me.state.PLAY);
	}
};
