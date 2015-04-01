window.addEventListener('load', function() {
	var Q = window.Q = Quintus({development: true})
		.include('Scenes, Sprites, input')
		.include('GameScenes, GameSprites')
		.setup({
			width: 320,
			height: 480,
		});

    Q.load([
        'background.png', 'stand_man.png'], function() {
            Q.stageScene('Background');
            Q.stageScene('Level', 1);
        });
});