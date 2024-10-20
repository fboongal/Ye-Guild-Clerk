class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){

    }

    create(){
        // display temporary text 
        this.add.text(centerX, centerY - 25, ' Temporary Text ').setOrigin(0.5)
    }

    update(){

    }
}