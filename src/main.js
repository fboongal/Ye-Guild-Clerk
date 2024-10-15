'use scrict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    pixelArt: true,
    scene: [ Menu ]
}

let game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

let cursors 