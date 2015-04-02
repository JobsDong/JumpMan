Quintus.GameSprites = function(Q) {
	
	//man
	Q.Sprite.extend('Man', {
		init: function(p) {
			this._super(p, {
                sprite: 'man',
                sheet: 'man',
				x: Q.width / 2,
				y: 0,
                w: 50,
                h: 60,
                vx: 0,
                vy: 0

			});

            this.add("2d, platformerControls, animation");
		},

        step: function(dt) {
            console.log('world' + this.p.vx);
            if (this.p.vy > 0) {
                console.log('drop');
                this.play('drop');
            } else {
                if (this.p.vx > 0) {
                    this.play('run_right');
                } else if (this.p.vx < 0) {
                    this.play('run_left');
                } else {
                    this.play('stand');
                }
            }
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