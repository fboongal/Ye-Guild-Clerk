class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){

    }

    create(){
        // display background
        this.bg = this.add.image(0, 0, 'bg').setOrigin(0)

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.num1Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        this.num2Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)

        // set camera properties & invisible camera
        this.cam = this.cameras.main
        this.cam.setBounds(0, 0, this.bg.width, this.bg.height)
        this.physics.world.setBounds(0, 0, this.bg.width, this.bg.height)

        // enable cam switcher
        this.cam1 = this.num1Key
        this.cam2 = this.num2Key
        
        // display temp divider line
        this.divider = this.add.sprite(395, centerY, 'divider');

        // hotbar boxes
        let inv1 = this.add.sprite(430, invY, 'box')
        inv1.setInteractive()
        inv1.on("pointerdown", (pointer)=>{
            console.log("click 1");
        });
        
        let inv2 = this.add.sprite(475, invY, 'box')
        inv2.setInteractive()
        inv2.on("pointerdown", (pointer)=>{
            console.log("click 2")
        });

        let inv3 = this.add.sprite(520, invY, 'box')
        inv3.setInteractive()
        inv3.on("pointerdown", (pointer)=>{
            console.log("click 3")
        });

        let inv4 = this.add.sprite(565, invY, 'box')
        inv4.setInteractive()
        inv4.on("pointerdown", (pointer)=>{
            console.log("click 4")
        });

        let inv5 = this.add.sprite(610, invY, 'box')
        inv5.setInteractive()
        inv5.on("pointerdown", (pointer)=>{
            console.log("click 5")
        });

        // add desk bell & ding 

        const ding = this.sound.add('ding');

        let bell = this.add.image(345, 255, 'bell')
        bell.setInteractive()
        bell.on("pointerdown", (pointer)=>{
            console.log("ding");
            ding.play();
        })

        // add reward tray
        this.tray = this.add.rectangle(200, 280, 200, 40, 0xff0000)

        // add quest contract
        const flyer = this.add.image(520, 150, 'flyer')
        flyer.setInteractive({ draggable: true, cursor: "pointer" })

        // add gold
        const gold = this.add.image(100, 400, 'gold')
        gold.setInteractive({ draggable: true, cursor: "pointer" });
        // this.cam.startFollow(gold, false, 0.5, 0.5)

        // drag items
         this.input.on("drag", (pointer, gameobject, dragX, dragY) => {
            gameobject.setPosition(dragX, dragY)
        });
        
        // return item to starting position 
        this.input.on("pointerup", pointer => {
            if (pointer.leftButtonReleased()) {
                // gold.setPosition(centerX, centerY)
            }
        })
    }

    update(){
        // cam switcher
        if(Phaser.Input.Keyboard.JustDown(this.cam1)) {
            this.cam.setScroll(0, 0)
        }
        if(Phaser.Input.Keyboard.JustDown(this.cam2)) {
            this.cam.setScroll(centerX, 720)
        }
        
    }
}