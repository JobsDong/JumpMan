window.addEventListener('load', function() {
	var Q = window.Q = Quintus({development: true})
		.include('Scenes, Sprites, 2D, UI, Anim, Audio, Touch')
		.include('GameScenes, GameSprites')
		.setup({
			width: 500,
			height: 256,
		})
		.touch()
		.enableSound();

	Q.random = (function(max){
		return Math.floor(Math.random() * max);
	});

	Q.bricks = [],
	Q.personalBest = localStorage.getItem('JumpMan.personalBest');

	if (Q.personalBest === null) {
		Q.personalBest = 0;
	}

	//TODO load animations

	//TODO load images
});