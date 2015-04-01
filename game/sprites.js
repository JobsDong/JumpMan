Quintus.GameSprites = function(Q) {
	
	//man
	Q.Sprite.extend('Man', {
		init: function(p) {
			this._super(p, {
                			asset: 'stand_man.png',
				x: Q.width / 2,
				y: Q.height / 2,
				scale: 0.6,
			});
		},
	});
	
	
};