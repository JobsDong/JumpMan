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


    //menu
    Q.scene('Menu', function (stage) {
        var getReady = stage.insert(new Q.Sprite({
            asset: 'get_ready.png',
            x: Q.width / 2,
            y: (Q.height / 2) + 70
        }));


        stage.insert(new Q.UI.Button({
            asset: 'start.png',
            x: Q.width / 2,
            y: Q.height / 2 + 100
        }, function() {
            getReady.destroy();
            this.destroy();
            Q.ceil.p.speed = 2;
            Q.man.add("2d, platformerControls");
            Q.man.stage.insert(new Q.BrickCreator());
        }));

    });
};