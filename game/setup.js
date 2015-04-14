window.addEventListener('load', function() {

	var Q = window.Q = Quintus({development: true})
		.include('Scenes, Sprites, Input, 2D, Anim, UI, Touch')
		.include('GameScenes, GameSprites')
		.setup({
			width: 320,
			height: 480
		}).controls().touch();

    Q.random = function(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    };

    Q.MAX_LIVES = 5;

    Q.animations('man', {
        run_right: {frames:[3, 4], rate: 1/5, flip: false, loop: true},
        run_left: {frames:[1, 2], rate: 1/5, flip: false, loop: true},
        stand: {frames: [0], rate: 1/10, flip: false},
        drop: {frames: [5, 6], rate: 1/10, loop: false}
    });

    Q.load(['mans.png', 'mans.json', 'title.png', 'game_over.png',
            'background.png', 'ceil.png', 'border.png', 'get_ready.png', 'start.png',
            'normal_brick.png', 'miss_brick.png', 'flip_brick.png', 'thorn_brick.png'], function() {
        Q.compileSheets('mans.png', 'mans.json');
        Q.stageScene('Background');
        Q.stageScene('Level', 1, {sort:true});
        Q.stageScene('Menu', 2);
    });
});
