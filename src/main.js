'use scrict'

const config = {
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
    scene: [ Menu, Play ]
}

const game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

let invY = 330

let cursors

/*
Citations:
- Mouse events by lowpolyprincess: https://www.youtube.com/watch?v=156GXOSjJ4g
- Camera Setup by nathanaltice: https://github.com/nathanaltice/ScrollingStyles & https://github.com/nathanaltice/CameraLucida & https://github.com/nathanaltice/Camz 
- Ding audio by domrodrig: https://freesound.org/people/domrodrig/sounds/116779/
*/