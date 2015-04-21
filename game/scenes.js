Quintus.GameScenes = function(Q) {

    //Background
    Q.scene('Background', function(stage) {
        stage.insert(new Q.Sprite({
            asset: 'background.png',
            x: Q.width / 2,
            y: Q.height / 2
        }));
    });

    //Level
    Q.scene('Level', function(stage) {
        Q.state.set('floor', 0);
        Q.state.set('live', 5);

        Q.ceil = stage.insert(new Q.Ceil());

        //left border
        stage.insert(new Q.Repeater({
            asset: 'border.png',
            x: 152,
            speedY: 1.0,
            repeatX: false,
            z: 1
        }));

        //right border
        stage.insert(new Q.Repeater( {
            asset: 'border.png',
            x: 0,
            speedY: 1.0,
            repeatX: false,
            z: 1
        }));

        //man
        Q.man = stage.insert(new Q.Man({x: Q.width/2, y: 150}));

        stage.insert(new Q.Brick({brickType:'normal', asset:'normal_brick.png', x:60, y: 150}));
        stage.insert(new Q.Brick({brickType:'normal', asset:'normal_brick.png', x:150, y: 275}));
        stage.insert(new Q.Brick({brickType:'normal', asset:'normal_brick.png', x:240, y: 375}));

        stage.add("viewport");
    });

    //HUD
    Q.scene('HUD', function (stage) {
        Q.healthContainer = stage.insert(new Q.UI.Container({
            x: 0, y: 0
        }));

        Q.displayHealth(5, Q.healthContainer);
        Q.healthContainer.fit(20);
    });

    //Begin
    Q.scene('Begin', function(stage) {
        var getReady = stage.insert(new Q.Sprite({
            asset: 'get_ready.png',
            x: Q.width / 2,
            y: Q.height / 2 - 30
        }));

        stage.insert(new Q.UI.Button({
            asset: 'start.png',
            x: Q.width / 2,
            y: Q.height / 2
        }, function() {
            getReady.destroy();
            this.destroy();
            Q.clearStage(2);
            Q.ceil.p.speed = 2;
            Q.man.add("2d, platformerControls");
            Q.man.stage.insert(new Q.BrickCreator());
        }));
    });

    //GameOver
    Q.scene('GameOver', function (stage) {
        setTimeout(function(){
            stage.insert(new Q.GameOver());

            setTimeout(function() {
                var scoreBoard = stage.insert(new Q.ScoreBoard());

                if (Q.state.get('floor') > Q.best_personal) {
                    Q.best_personal = Q.state.get('floor');
                    localStorage.setItem('JumpMan.personalBest', Q.state.get('floor'));
                }

                var scoreContainer = stage.insert(new Q.UI.Container(), scoreBoard);
                scoreContainer.insert(new Q.UI.Text({x:-20, y: -35,
                    label: Q.state.get('floor') + " floors", color: "green", size: 15}));

                var bestContainer = stage.insert(new Q.UI.Container(), scoreBoard);
                bestContainer.insert(new Q.UI.Text({x:-20, y: -5,
                    label: Q.best_personal + " floors", color: "green", size: 15}));

                scoreBoard.animate({y: Q.height/2}, .5, Q.Easing.Quadratic.Out, {
                    callback: function() {
                        setTimeout(function() {
                            stage.insert(new Q.UI.Button({
                                asset: 'start.png',
                                x: Q.width / 2,
                                y: (Q.height / 2) + 58
                            }, function() {
                                //Q.clearStage(2);
                                this.destroy();
                                Q.stageScene('Fade', 2);
                            }));
                        });
                    }
                });
            }, 850);
        }, 750);
    });

    //Fade
    Q.scene('Fade', function (stage) {
        stage.insert(new Q.LightBox({
            between: function() {
                Q.clearStage(1);
                Q.clearStage(2);
                Q.clearStage(3);
                Q.stageScene('Level', 1, { sort: true });
                Q.stageScene('HUD', 3);
                Q.stageScene('Begin', 2);
            }
        }));
    });
};