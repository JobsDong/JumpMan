Quintus.GameSprites = function(Q) {
	
	//man
	Q.Sprite.extend('Man', {
		init: function(p) {
			this._super(p, {
                asset: 'stand_man.png',
				x: Q.width / 2,
				y: 0,
				scale: 0.5
			});

            this.add("2d, platformerControls");
		}
	});


    //normal_brick
    Q.Sprite.extend('NormalBrick', {
        init: function(p) {
            this._super(p, {
                asset: 'normal_brick.png',
                x: Q.width / 2,
                y: Q.height / 2
            })
        }
    });
	
};