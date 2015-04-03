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

        Q.man = stage.insert(new Q.Man());

        stage.add("viewport");
    });


    //HUD
    Q.scene('HUD', function (stage) {
        var getReady = stage.insert(new Q.Sprite({
            asset: 'get_ready.png',
            x: Q.width / 2,
            y: (Q.height / 2) - 41
        }));

        stage.insert(new Q.UI.Container({
            x: Q.width / 2,
            y: 50
        }));

        stage.insert(new Q.UI.Button({
            x: Q.width / 2,
            y: Q.height / 2,
            w: Q.width,
            h: Q.height
        }), function() {
            getReady.destroy();
            Q.man.add('2d');
            Q.man.stage.insert(new Q.BrickCreator());
        });

    });
};