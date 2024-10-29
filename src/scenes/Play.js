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
        const cameraSpeed = 0.1;

        // make camera follow cursor
        this.input.on('pointermove', (pointer) => {
        const targetX = Phaser.Math.Clamp(pointer.x - this.cam.width / 2, 0, this.bg.width - this.cam.width);
        
        const targetY = Phaser.Math.Clamp(pointer.y - this.cam.height / 2, 0, this.bg.height - this.cam.height);

        this.cam.scrollX += (targetX - this.cam.scrollX) * cameraSpeed;
        this.cam.scrollY += (targetY - this.cam.scrollY) * cameraSpeed;
        });
        
        // display temp divider line
        this.divider = this.add.sprite(395, centerY, 'divider');

        // add desk bell & ding 

        const ding = this.sound.add('ding');

        let bell = this.add.image(345, 255, 'bell')
        bell.setInteractive()
        bell.on("pointerdown", (pointer)=>{
            console.log("ding");
            ding.play();
        })

        // add reward tray
        this.tray = this.physics.add.sprite(200, 290, 'tray')
        this.tray.setImmovable()

        // add quest contract
        this.flyer = this.add.image(520, 150, 'flyer')
        this.flyer.setInteractive({ draggable: true, cursor: "pointer" })

        // add gold
        this.gold = this.physics.add.image(115, 405, 'gold');
        this.gold.setInteractive({ draggable: true, cursor: "pointer" });

        // drag items
         this.input.on("drag", (pointer, gameobject, dragX, dragY) => {
            gameobject.setPosition(dragX, dragY)
        });
        
        // return item to starting position / this does nothing for now
        this.input.on("pointerup", pointer => {
            if (pointer.leftButtonReleased()) {
                // gold.setPosition(centerX, centerY)
            }
        })

        // detect overlap between tray & gold
        this.physics.add.overlap(this.gold, this.tray, this.enterTray, null, this)
    }

    update(){
        // // cam switcher
        // if(Phaser.Input.Keyboard.JustDown(this.cam1)) {
        //     this.cam.setScroll(0, 0)
        // }
        // if(Phaser.Input.Keyboard.JustDown(this.cam2)) {
        //     this.cam.setScroll(centerX, 720)
        // }
        
    }

    enterTray() {
        this.scene.start('winScene');
    }
}