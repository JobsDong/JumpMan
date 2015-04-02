window.addEventListener('load', function() {
	var Q = window.Q = Quintus({development: true})
		.include('Scenes, Sprites, Input, 2D, Anim')
		.include('GameScenes, GameSprites')
		.setup({
			width: 320,
			height: 480
		}).controls();

    Q.animations('man', {
        run_right: {frames:[3, 4], rate: 1/5, flip: false, loop: true},
        run_left: {frames:[1, 2], rate: 1/5, flip: false, loop: true},
        stand: {frames: [0], rate: 1/10, flip: false},
        drop: {frames: [5, 6], rate: 1/10, loop: false}
    });

    Q.load([
        'background.png', 'sprites.png', 'sprites.json', 'normal_brick.png'], function() {

        Q.compileSheets('sprites.png', 'sprites.json');
            Q.stageScene('Background');
            Q.stageScene('Level', 1);
        });
});
