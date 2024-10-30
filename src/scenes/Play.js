class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){
        this.isDragging = false;
        this.itemOnTray = false;
        this.isGoldOnTray = false;
    }

    create(){
        // display counter 
        this.counter = this.add.image(0, 0, 'counter').setOrigin(0).setDepth(3);

        // set camera properties
        this.cam = this.cameras.main;
        this.cam.setBounds(0, 0, this.counter.width, this.counter.height);
        this.physics.world.setBounds(0, 0, this.counter.width, this.counter.height);
        const cameraSpeed = 0.1;

        // variable to track camera state
        this.isCameraDown = false;
        
        // pointer move for camera control
        this.input.on('pointermove', (pointer) => {
            // check if mouse is above a certain Y position (e.g., 400)
            if (pointer.y > 500 && !this.isCameraDown) {
                this.isCameraDown = true; 
                this.tweens.add({
                    targets: this.cam,
                    scrollY: 200, // move camera down
                    duration: 500, 
                    ease: 'Power2', 
                });
            } else if (pointer.y < 200 && this.isCameraDown) {
                this.isCameraDown = false; 
                this.tweens.add({
                    targets: this.cam,
                    scrollY: 0, // move camera back up
                    duration: 500, 
                    ease: 'Power2', 
                });
            }
        });
    
        // clamp the camera's Y position to stay within bounds
        this.cam.scrollY = Phaser.Math.Clamp(this.cam.scrollY, 0, this.counter.height - this.cam.height);

        // add desk bell & ding 
        let ding = this.sound.add('ding');

        let bell = this.add.image(345, 290, 'bell').setInteractive().setDepth(5);
        bell.on("pointerdown", (pointer)=>{
            console.log("ding");
            ding.play();
            this.bellRung();
        });

        // add reward tray
        this.tray = this.physics.add.sprite(200, 340, 'tray').setImmovable().setDepth(5);

        // add quests
        this.quests = [
            this.fQuest = this.add.image(500, 120, 'fQuest').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.aQuest = this.add.image(560, 180, 'aQuest').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.tQuest = this.add.image(520, 220, 'tQuest').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5)
        ];

        // add reward items
        this.items = [
            this.gold = this.physics.add.image(115, 460, 'gold').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.aGem = this.add.image(440, 615, 'aGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.dGem = this.add.image(100, 100, 'dGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.eGem = this.add.image(100, 100, 'eGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.rGem = this.add.image(100, 100, 'rGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.sGem = this.add.image(100, 100, 'sGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.gSack = this.add.image(100, 100, 'gSack').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5)
        ];

        // apply hover for quests and itmes
        this.items.forEach(item => {
            this.addHoverEffect(item);
        });
        this.quests.forEach(item => {
            this.addHoverEffect(item);
        });

        // drag items
        this.input.on("dragstart", (pointer, gameObject) => {
            this.isDragging = true;
            gameObject.setAlpha(0.8); 
            gameObject.originalDepth = gameObject.depth; 
            gameObject.setDepth(10); 
            this.stopBobbing(gameObject);
            
            gameObject.originalPosition = { x: gameObject.x, y: gameObject.y }; 
        });

        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            if (this.isDragging) {
            gameObject.setPosition(dragX, dragY);
            }
        });

        this.input.on("dragend", (pointer, gameObject) => {
            this.isDragging = false;
            gameObject.setAlpha(1); 
            gameObject.setDepth(gameObject.originalDepth); 
        });
        
        // return item to starting position / this does nothing for now
        this.input.on("pointerup", pointer => {
            if (pointer.leftButtonReleased()) {
                // gold.setPosition(centerX, centerY)
            }
        });

        // detect overlap between tray & gold
        this.physics.add.overlap(this.gold, this.tray, this.handleGoldOnTray, null, this);

        // enter adventurers!
        this.froge = this.add.sprite(-120, 180, 'froge').setDepth(0);
        
        // create tween to slide in adventurers
        const slideTween = this.tweens.add({
            targets: this.froge, 
            x: 110, 
            duration: 1500, 
            ease: 'Power2', 
            onComplete: () => {
                this.tweens.killTweensOf(this.froge);
            }
        });
    }

    update() {
        this.checkGoldInTray();
    }

    handleGoldOnTray(gold, tray) {
        this.isGoldOnTray = true; 
        this.itemOnTray = true; 
        console.log('Gold is now on the tray');
    }

    checkGoldInTray() {
        const goldBounds = this.gold.getBounds();
        const trayBounds = this.tray.getBounds();

        const isInsideTray = Phaser.Geom.Intersects.RectangleToRectangle(goldBounds, trayBounds);

        if (isInsideTray && !this.isGoldOnTray) {
            this.isGoldOnTray = true;
            this.itemOnTray = true; 
            console.log('Gold has entered the tray');
        } else if (!isInsideTray && this.isGoldOnTray) {
            this.isGoldOnTray = false;
            this.itemOnTray = false; 
            console.log('Gold has left the tray');
        }
    }


    bellRung() {
        if (this.itemOnTray === true) { 
            this.scene.start('winScene');
        } else {
            console.log('The gold is not on the tray yet!'); 
        }
    }

    addHoverEffect(item) {
        item.on('pointerover', () => this.bobItem(item));
        item.on('pointerout', () => this.stopBobbing(item));
    }

    bobItem(item) {
        if (!this.isDragging){
            this.tweens.add({
                targets: item,
                y: item.y - 10,
                duration: 500,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1 
            });
        }
    }

    stopBobbing(item) {
       this.tweens.killTweensOf(item);
    }
}
