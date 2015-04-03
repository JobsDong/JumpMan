Quintus.GameScenes = function(Q) {
    Q.scene('Background', function(stage) {
        stage.insert(new Q.Sprite({
            asset: 'background.png',
            x: Q.width / 2,
            y: Q.height / 2,
            scale: 2,
        })); 
    });

    Q.scene('Level', function(stage) {
        Q.brickCreator = stage.insert(new Q.BrickCreator());
        Q.ceil = stage.insert(new Q.Ceil());
        Q.man = stage.insert(new Q.Man());
        stage.insert(new Q.NormalBrick({x: Q.width / 2, y: Q.height / 2}));
        stage.add("viewport");
    });
};