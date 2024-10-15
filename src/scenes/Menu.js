class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload(){

    }

    create(){

        // display menu
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // display menu text
        this.add.text(centerX, centerY, 'Ye Guild Clerk!', menuConfig).setOrigin(0.5)
    }

    update(){

    }
}