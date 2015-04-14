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
        Q.state.set('lives', 5);

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
        Q.man = stage.insert(new Q.Man({x: Q.width/2, y: 238}));

        stage.insert(new Q.Brick({brickType:'normal', asset:'normal_brick.png', x:80, y: 175}));
        stage.insert(new Q.Brick({brickType:'normal', asset:'normal_brick.png', x:150, y: 275}));
        stage.insert(new Q.Brick({brickType:'normal', asset:'normal_brick.png', x:240, y: 375}));

        stage.add("viewport");
    });

    //HUD
    Q.Scene('HUD', function (stage) {
        var title = stage.insert(new Q.Sprite({
            asset: 'title.png',
            x: Q.width / 2,
            y: (Q.height / 2) - 30
        }));

        var getReady = stage.insert(new Q.Sprite({
            asset: 'get_ready.png',
            x: Q.width / 2,
            y: (Q.height / 2) + 70
        }));

        Q.scoreContainer = stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: 50
        }));

        stage.insert(new Q.UI.Button({
            asset: 'start.png',
            x: Q.width / 2,
            y: Q.height / 2 + 100
        }, function() {
            title.destroy();
            getReady.destroy();
            Q.clearStage(2);
            Q.ceil.p.speed = 2;
            Q.man.add("2d, platformerControls");
            Q.man.stage.insert(new Q.BrickCreator());
        }));
    });

    //GameOver
    Q.scene('GameOver', function (stage) {
        setTimeout(function(){
            var gameOver = stage.insert(new Q.GameOver());

            setTimeout(function() {
                var scoreBoard = stage.insert(new Q.ScoreBoard()),
                    score = Q.state.get('floor');

                var scoreContainer = stage.insert(new Q.UI.Container(), scoreBoard);

                scoreBoard.animate({y: Q.height/2}, .5, Q.Easing.Quadratic.Out, {
                    callback: function() {
                        setTimeout(function() {
                            stage.insert(new Q.UI.Button({
                                asset: 'start.png',
                                x: Q.width / 2,
                                y: (Q.height / 2) + 58
                            }, function() {
                                this.destroy();
                                Q.stageScene(3, 'Fade');
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
                Q.bg.p.frame = Q.random(2);
                Q.clearStage(1);
                Q.clearStage(2);
                Q.clearStage(3);
                Q.stageScene('Level', 1, { sort: true });
                Q.stageScene('HUD', 2);
            }
        }));
    });
};