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
    	Q.man = stage.insert(new Q.Man());
    });
};