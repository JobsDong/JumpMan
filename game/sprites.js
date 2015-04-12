Quintus.GameSprites = function(Q) {

	//man
	Q.Sprite.extend('Man', {

        init: function(p) {
            this._super(p, {
                sprite: 'man',
                sheet: 'man',
				x: Q.width / 2,
				y: Q.height / 2 - 20,
                w: 30,
                h: 36,
                vx: 0,
                vy: 0,
                dead: false
			});

            this.add("animation");
            this.on("bump.bottom", this, "stomp");
            this.on("hit.sprite", this, "hits");
            this.on("fail", this, "fail");
		},

        fail: function() {
            this.p.dead = true;
            Q("Brick", 1).set('sensor', true);
        },

        hits: function(collision) {
            if (collision.obj.isA("Ceil")) {
                Q.state.dec('lives', 2);
                if (Q.state.get('lives') <= 0) {
                    //end game
                    console.log("end");
                    this.trigger("fail");
                }

                this.p.vy = 300;
                this.p.y += 15;
            }
        },

        stomp: function(collision) {
            console.log("fuck");
            if (collision.obj.isA("Brick")) {
                Q.state.inc('floor', 1);

                if (collision.obj.p.brickType == 'miss') {
                    if (Q.state.get('lives') < Q.MAX_LIVES) {
                        Q.state.inc('lives', 1);
                    }
                    collision.obj.destroy();

                } else if (collision.obj.p.brickType == 'flip') {
                    if (Q.state.get('lives') < Q.MAX_LIVES) {
                        Q.state.inc('lives', 1);
                    }

                    this.p.vy = -300;

                } else if (collision.obj.p.brickType == 'thorn') {
                    Q.state.dec('lives', 1);
                    if (Q.state.get('lives') <= 0) {
                        //end game
                    }
                } else if (collision.obj.p.brickType == 'normal') {
                    if (Q.state.get('lives') < Q.MAX_LIVES) {
                        Q.state.inc('lives', 1);
                    }
                }
            }
        },

        step: function(dt) {
            if (Q.ceil.p.y + Q.height < this.p.y) {
                //end game
                console.log("fail");
                Q.state.set('lives', 0);
                this.destroy();
            }

            if (this.p.x > Q.width - 30) {
                this.p.x = Q.width - 30;
            } else if (this.p.x < 30) {
                this.p.x = 30;
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
            if (Q.state.get('lives') > 0) {
                this.p.y += this.p.speed;
                if (this.p.y !== 0 && this.p.y % 100 == 0) {
                    Q.brickCreator.p.createBrick = true;
                }
            }

            this.stage.viewport.centerOn(Q.width / 2, this.p.y + Q.height/2);
        }
    });

    //brick
    Q.Sprite.extend('Brick', {
        init: function(p) {
            var brickTypes = ['normal', 'miss', 'flip', 'thorn'];
            var brickType = brickTypes[Q.random(0, brickTypes.length)];

            this._super(p, {
                brickType: brickType,
                asset: brickType + '_brick.png',
                type: Q.SPRITE_DEFAULT,
                x: Q.random(60, Q.width - 60),
                fade: false
            });
            this.on('fade', this, 'fade');
        },

        fade: function() {
            this.p.fade = true;
            this.p.fadeTimer = 0;
            console.log("fade");
        },

        step: function(dt) {
            if (this.p.fade) {
                this.p.fadeTimer++;
                console.log("hello" + this.p.fadeTimer);
                if (this.p.fadeTimer > 24) {
                    this.destroy();
                }
            }

            if (this.p.y < Q.ceil.p.y) {
                this.destroy();
            }
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
                this.stage.insert(new Q.Brick({y: Q.ceil.p.y + Q.height}));
            }
        }
    });
	
};