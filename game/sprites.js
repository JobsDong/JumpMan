Quintus.GameSprites = function(Q) {
	
	//man
	Q.Sprite.extend('Man', {
		init: function(p) {
			this._super(p, {
				sheet: 'stop_man',
				x: Q.width / 2,
				y: 0,
				z: 2,
				x_speed: 0,
				y_speed: 0,
				status: 'stop',
				alive: true,
			});

			this.add('animation, tween');

			this.on('left', function() {
			});

			this.on('right', function() {
			});

			this.on('stop', function() {
			});

			this.on('drop', function() {
			});

			this.on('hit.sprite', function(collision){
			});
		},
	});

	//brick
	Q.Sprite.extend('Brick', {
		init: function(p) {

		},
	});
};