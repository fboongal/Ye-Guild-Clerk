'use scrict'

const config = {
    parent: 'phaser-game',
    type: Phaser.AUTO,
    width: 640,
    height: 550,
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
    scene: [ Menu, Play, Win ]
}

const game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height

// x values for cubbies
let col1 = 440
let col2 = 495
let col3 = 550
let col4 = 605

// y values for cubbies
let row1 = 510
let row2 = 560
let row3 = 615
let row4 = 665

let cursors

/*
Citations:
- Mouse events by lowpolyprincess: https://www.youtube.com/watch?v=156GXOSjJ4g
- Camera Setup by nathanaltice: https://github.com/nathanaltice/ScrollingStyles & https://github.com/nathanaltice/CameraLucida & https://github.com/nathanaltice/Camz 
- Ding audio by domrodrig: https://freesound.org/people/domrodrig/sounds/116779/
- Background Music by NitroTech84: https://freesound.org/people/NitroTech84/sounds/727905/
*/