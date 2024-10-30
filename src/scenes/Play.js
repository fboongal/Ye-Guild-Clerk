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
                this.isCameraDown = true; // set camera state to down
                this.tweens.add({
                    targets: this.cam,
                    scrollY: 200, // move camera down
                    duration: 500, 
                    ease: 'Power2', 
                });
            } else if (pointer.y < 200 && this.isCameraDown) {
                this.isCameraDown = false; // set camera state to up
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
        this.fQuest = this.add.image(520, 150, 'fQuest').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5);

        // add gold
        this.gold = this.physics.add.image(115, 460, 'gold').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5);

        // add hover effect for draggable items
        this.addHoverEffect(this.fQuest);
        this.addHoverEffect(this.gold);

        // drag items
        this.input.on("dragstart", (pointer, gameObject) => {
            this.isDragging = true;
            gameObject.setAlpha(0.8); 
            gameObject.originalDepth = gameObject.depth; // Store original depth
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
            gameObject.setAlpha(1); // Reset alpha when done dragging
            gameObject.setDepth(gameObject.originalDepth); // Restore original depth
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
        // Check if the gold is within the tray bounds
        this.isGoldOnTray = true; // Set gold is on tray
        this.itemOnTray = true; // Set item on tray
        console.log('Gold is now on the tray');
    }

    checkGoldInTray() {
        const goldBounds = this.gold.getBounds();
        const trayBounds = this.tray.getBounds();

        // Check if the gold is still inside the tray bounds
        const isInsideTray = Phaser.Geom.Intersects.RectangleToRectangle(goldBounds, trayBounds);

        if (isInsideTray && !this.isGoldOnTray) {
            this.isGoldOnTray = true;
            this.itemOnTray = true; // Set item on tray
            console.log('Gold has entered the tray');
        } else if (!isInsideTray && this.isGoldOnTray) {
            this.isGoldOnTray = false;
            this.itemOnTray = false; // Reset item on tray
            console.log('Gold has left the tray');
        }
    }

    // enterTray() {
    //     this.itemOnTray = true;
    //     console.log("item in tray")
    // }

    // leaveTray() {
    //     this.itemOnTray = false;
    //     console.log("item left tray")
    // }

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
        // Start a bobbing effect using a tween
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
