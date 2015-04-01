window.addEventListener('load', function() {
	var Q = window.Q = Quintus({development: true})
		.include('Scenes, Sprites, 2D, Input')
		.include('GameScenes, GameSprites')
		.setup({
			width: 320,
			height: 480
		}).controls();

    Q.load([
        'background.png', 'stand_man.png', 'normal_brick.png'], function() {
            Q.stageScene('Background');
            Q.stageScene('Level', 1);
        });
});
