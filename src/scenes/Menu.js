class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload(){

    }

    create(){
        // title config
        let titleConfig = {
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

        // button config
        let buttonConfig = {
            fontSize: '20px',
            backgroundColor: '#FFFFFF',
            color: '#000000'
        }

        // display title text
        this.add.text(centerX, centerY - 25, ' Ye Guild Clerk! ', titleConfig).setOrigin(0.5)
    
        // display play button
        const playButton = this.add.text(centerX, centerY + 25, ' PLAY ', buttonConfig).setOrigin(0.5)
        // make play button interactive
        playButton.setInteractive()
        // on click, start playScene
        playButton.on("pointerdown", (pointer)=>{
            console.log("click")
            this.scene.start('playScene')
        })
    }

    update(){

    }
}