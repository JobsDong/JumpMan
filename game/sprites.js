Quintus.GameSprites = function(Q) {

    //
	//man
	Q.Sprite.extend('Man', {
        init: function(p) {
            this._super(p, {
                sprite: 'man',
                sheet: 'man',
				x: Q.width / 2,
				y: Q.height / 2 - 20,
                w: 50,
                h: 60,
                vx: 0,
                vy: 0
			});

            this.add("platformerControls, animation");
		},

        step: function(dt) {
            if (this.p.x > Q.width - 40) {
                this.p.x = Q.width - 40;
            } else if (this.p.x < 40) {
                this.p.x = 40;
            }

            if (this.p.vy > 0) {
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

    //Ceil
    Q.Sprite.extend('Ceil', {
        init: function(p) {
            this._super(p, {
                asset: 'ceil.png',
                x: Q.width / 2,
                y: 0,
                speed: 0
            });
        },

        step: function(dt) {
            this.p.y += this.p.speed;
            if (this.p.y !== 0 && this.p.y % 75 == 0) {
                Q.brickCreator.p.createBrick = true;
            }

            this.stage.viewport.centerOn(Q.width / 2, this.p.y + Q.height/2);
        }
    });

    //normal_brick
    Q.Sprite.extend('NormalBrick', {
        init: function(p) {
            this._super(p, {
                asset: 'normal_brick.png',
                x: Q.random(60, Q.width - 60)
            });
        }
    });

    //brick creator
    Q.GameObject.extend('BrickCreator', {
        init: function() {
            this.p = {
                createBrick: false
            };

            Q.brickCreator = this;
        },

        update: function(dt) {
            if (this.p.createBrick) {
                this.p.createBrick = false;
                this.stage.insert(new Q.NormalBrick({y: Q.ceil.p.y + Q.height}));
            }
        }
    });
	
};