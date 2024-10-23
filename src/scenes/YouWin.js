class Win extends Phaser.Scene {
    constructor() {
        super('winScene')
    }

    create() {
       this.end = this.add.image(centerX, centerY, 'end');
       
       // button config
       let buttonConfig = {
        fontSize: '20px',
        backgroundColor: '#FFFFFF',
        color: '#000000'
    }

    // restart button
    const restartButton = this.add.text(570, invY, ' RESTART ', buttonConfig).setOrigin(0.5)
    restartButton.setInteractive()
    restartButton.on("pointerdown", (pointer)=>{
        this.scene.start('playScene')
    })

    // restart button
    const titleButton = this.add.text(430, invY, ' TO MENU ', buttonConfig).setOrigin(0.5)
    titleButton.setInteractive()
    titleButton.on("pointerdown", (pointer)=>{
        this.scene.start('menuScene')
    })

    }

    update() {
        
    }
}