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
            this.on("hit", this, "hits");
            this.on("fail", this, "fail");
		},

        fail: function() {
            this.p.dead = true;
            Q("Brick", 1).set('sensor', true);
        },

        hits: function(collision) {
            console.log("hit");
            if (collision.obj.isA("Ceil")) {
                Q.state.dec('live', 1);
                Q.displayHealth(Q.state.get('live'), Q.healthContainer);
                if (Q.state.get('live') <= 0) {
                    //end game
                    console.log("end");
                    this.trigger("fail");
                }

                this.p.vy = 300;
                this.p.y += 15;
            }
        },

        stomp: function(collision) {
            console.log("stomp");
            if (collision.obj.isA("Brick")) {

                if (collision.obj.p.brickType == 'miss') {
                    if (Q.state.get('live') < Q.MAX_HEALTH) {
                        Q.state.inc('live', 1);
                        Q.displayHealth(Q.state.get('live'), Q.healthContainer);
                    }
                    collision.obj.destroy();

                } else if (collision.obj.p.brickType == 'flip') {
                    if (Q.state.get('live') < Q.MAX_HEALTH) {
                        Q.state.inc('live', 1);
                        Q.displayHealth(Q.state.get('live'), Q.healthContainer);
                    }

                    this.p.vy = -300;

                } else if (collision.obj.p.brickType == 'thorn') {
                    Q.state.dec('live', 1);
                    Q.displayHealth(Q.state.get('live'), Q.healthContainer);
                    if (Q.state.get('live') <= 0) {
                        //end game
                        console.log("end");
                        this.trigger("fail");
                    }
                } else if (collision.obj.p.brickType == 'normal') {
                    if (Q.state.get('live') < Q.MAX_HEALTH) {
                        Q.state.inc('live', 1);
                        Q.displayHealth(Q.state.get('live'), Q.healthContainer);
                    }
                }
            }
        },

        step: function(dt) {
            if (Q.ceil.p.y + Q.height < this.p.y) {
                //end game
                console.log("fail");
                Q.state.set('live', 0);
                Q.displayHealth(Q.state.get('live'), Q.healthContainer);
                this.destroy();

                Q.stageScene('GameOver', 3);
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
            if (Q.state.get('live') > 0) {
                this.p.y += this.p.speed;
                if (this.p.y !== 0 && this.p.y % 100 == 0) {
                    Q.brickCreator.p.createBrick = true;
                }
            }

            this.stage.viewport.centerOn(Q.width / 2, this.p.y + Q.height/2);
        }
    });

    //LightBox
    Q.Sprite.extend('LightBox', {
        init: function(p) {
            this._super(p, {
                x: Q.width / 2,
                y: Q.height / 2,
                w: Q.width,
                h: Q.height,
                opacity: 0,
                color: '#000',
                duration: 1,
                maxOpacity: 1,
                between: function() {}
            });

            this.add('tween');
            this.animate({ opacity: this.p.maxOpacity }, this.p.duration / 2, {
                    callback: function() {
                        this.p.between();
                    }
                }).chain({ opacity: 0 }, this.p.duration / 2, {
                    callback: function() {
                        Q.clearStage(3);
                    }
                });
        }
    });

    //GameOver
    Q.Sprite.extend('GameOver', {
        init: function(p) {
            this._super(p, {
                asset: 'game_over.png',
                x: Q.width / 2,
                y: (Q.height / 2) - 80,
                opacity: 0
            });

            this.add('tween');
            this.animate({ y: this.p.y - 5, opacity: 1 }, .15)
                .chain({ y: this.p.y + 5 }, .15);
        }
    });

    //ScoreBoard
    Q.Sprite.extend('ScoreBoard', {
        init: function(p) {
            this._super(p, {
                asset: 'scoreboard.png',
                x: Q.width / 2,
                y: Q.height + 30
            });

            this.add('tween');
        }
    });

    //Health
    Q.Sprite.extend('Health', {
        init: function(p) {
            this._super(p, {
                sprite: 'health',
                sheet: 'health',
                frame: 0
            });
        }
    });

    //Brick
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
        },

        step: function(dt) {
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
                Q.state.inc('floor', 1);
            }
        }
    });
	
};