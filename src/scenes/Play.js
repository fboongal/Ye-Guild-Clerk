class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){

    }

    create(){
        // display background
        // this.bgImage = this.add.sprite(centerX, centerY, 'tempbg')

        // display temp divider line
        this.divider = this.add.sprite(395, centerY, 'divider')

        // hotbar boxes
        let inv1 = this.add.sprite(430, invY, 'box')
        inv1.setInteractive()
        inv1.on("pointerdown", (pointer)=>{
            console.log("click 1")
        })
        
        let inv2 = this.add.sprite(475, invY, 'box')
        inv2.setInteractive()
        inv2.on("pointerdown", (pointer)=>{
            console.log("click 2")
        })

        let inv3 = this.add.sprite(520, invY, 'box')
        inv3.setInteractive()
        inv3.on("pointerdown", (pointer)=>{
            console.log("click 3")
        })

        let inv4 = this.add.sprite(565, invY, 'box')
        inv4.setInteractive()
        inv4.on("pointerdown", (pointer)=>{
            console.log("click 4")
        })

        let inv5 = this.add.sprite(610, invY, 'box')
        inv5.setInteractive()
        inv5.on("pointerdown", (pointer)=>{
            console.log("click 5")
        })
    }

    update(){

    }
}