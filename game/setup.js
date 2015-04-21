window.addEventListener('load', function() {

	var Q = window.Q = Quintus()
		.include('Scenes, Sprites, Input, 2D, Anim, UI, Touch')
		.include('GameScenes, GameSprites')
		.setup({
			width: 320,
			height: 480
		}).controls().touch();

    Q.random = function(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    };

    Q.MAX_HEALTH = 5;
    Q.best_personal = localStorage.getItem('JumpMan.personalBest');
    if (Q.best_personal === null) {
        Q.best_personal = 0;
    }

    Q.displayHealth = function(number, container) {
        for (var i = 0; i < number; i++) {
            container.insert(new Q.Health({
                frame: 0, x: 25 + i*13, y: 15}));
        }
        for (var j = 0; j < Q.MAX_HEALTH - number; j++) {
            container.insert(new Q.Health({
                frame: 1, x: 25 + (number + j) * 13, y: 15}));
        }
    };

    Q.animations('man', {
        run_right: {frames:[3, 4], rate: 1/5, flip: false, loop: true},
        run_left: {frames:[1, 2], rate: 1/5, flip: false, loop: true},
        stand: {frames: [0], rate: 1/10, flip: false},
        drop: {frames: [5, 6], rate: 1/10, loop: false}
    });

    Q.load(['mans.png', 'mans.json', 'game_over.png', 'health.png', 'health.json', 'scoreboard.png',
            'background.png', 'ceil.png', 'border.png', 'get_ready.png', 'start.png',
            'normal_brick.png', 'miss_brick.png', 'flip_brick.png', 'thorn_brick.png'], function() {
        Q.compileSheets('mans.png', 'mans.json');
        Q.compileSheets('health.png', 'health.json');
        Q.stageScene('Background', 0);
        Q.stageScene('Level', 1, {sort:true});
        Q.stageScene('HUD', 3);
        Q.stageScene('Begin', 2);
    });
});
