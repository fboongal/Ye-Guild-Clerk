class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init(){
        this.isDragging = false;
        this.isGreenSackOnTray = false;
        this.isTyping = false;
    }

    create(){
        // display background
        this.counter = this.add.image(0, 0, 'bg').setOrigin(0).setDepth(0)

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
            if (pointer.y > 520 && !this.isCameraDown) {
                this.isCameraDown = true; 
                this.tweens.add({
                    targets: this.cam,
                    scrollY: 200, 
                    duration: 500, 
                    ease: 'Power2', 
                });
            } else if (pointer.y < 325 && this.isCameraDown) {
                this.isCameraDown = false; 
                this.tweens.add({
                    targets: this.cam,
                    scrollY: 0, 
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

        // create invisible counter boundary
        this.tray = this.physics.add.image(205, 338, 'cTop').setImmovable().setDepth(5).setAlpha(0);

        // add quests
        this.quests = [
            this.fQuest = this.add.image(500, 120, 'fQuest').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.bQuest = this.add.image(570, 140, 'bQuest').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.aQuest = this.add.image(560, 180, 'aQuest').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.tQuest = this.add.image(520, 220, 'tQuest').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5)
        ];

        // add reward items
        this.items = [
            this.twoGold = this.physics.add.image(col1, row4 + 10, '2gold').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.threeGold = this.physics.add.image(col3, row2, '3gold').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.aGem = this.physics.add.image(col4, row1, 'aGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.dGem = this.physics.add.image(col2, row3, 'dGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.eGem = this.physics.add.image(col1, row2, 'eGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.rGem = this.physics.add.image(col4, row4, 'rGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.sGem = this.physics.add.image(col2, row1, 'sGem').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5),
            this.gSack = this.physics.add.image(70, row4 - 15, 'gSack').setInteractive({ draggable: true, cursor: "pointer" }).setDepth(5)
        ];

        this.items.forEach(item => {
            item.originalPosition = { x: item.x, y: item.y };
        });
        



        // apply hover for quests & items
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
        
            const isQuest = this.quests.includes(gameObject);
        
            const isOnTray = this.physics.overlap(gameObject, this.tray);
            
            if (!isOnTray && !isQuest) {
                gameObject.setPosition(gameObject.originalPosition.x, gameObject.originalPosition.y);
            } else {
                if (gameObject === this.gSack) {
                    this.isGreenSackOnTray = true;
                }
            }
        });





        // detect overlap between tray & rewards
        this.physics.add.overlap(this.gSack, this.tray, this.handleGreenSackOnTray, null, this);






        // enter adventurers!(+ tutorial clerk)
        this.clerk = this.add.sprite(-120,180, 'clerk').setDepth(0);
        this.froge = this.add.sprite(-120, 180, 'froge').setDepth(0);
        
        // create tween to slide in clerk
        const slideTween = this.tweens.add({
            targets: this.clerk, 
            x: 110, 
            duration: 1500, 
            ease: 'Power2', 
            onComplete: () => {
                this.tweens.killTweensOf(this.clerk);
            }
        });



        // create dialogue box & start dialogue sequence
        this.createDialogueBox();
        this.startDialogueSequence();
    }

    update() {
    
    }

    handleGreenSackOnTray(sack, tray) {
        if (sack === this.gSack) {
            this.isGreenSackOnTray = true;
        } 
    }

    bellRung() {
        if (this.isGreenSackOnTray) {
            this.gSack.setVisible(false); 
            this.isGreenSackOnTray = false; 
            this.startSecondDialogueSequence(); 
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

    createDialogueBox() {
        this.dialogueBox = this.add.graphics();
        this.dialogueBox.fillStyle(0x000000, 0.8); 
        this.dialogueBox.fillRect(200, 100, 160, 150);
        this.dialogueBox.setInteractive(new Phaser.Geom.Rectangle(200, 100, 160, 150), Phaser.Geom.Rectangle.Contains);
        
        this.dialogueBox.on('pointerdown', () => {
            this.advanceDialogue();
            console.log("clicking dialogue");
        });
    
        this.dialogueText = this.add.text(210, 110, '', {
            font: '16px Arial',
            fill: '#ffffff',
            wordWrap: { width: 150, useAdvancedWrap: true }
        }).setDepth(1); 
    }

    // start dialogue secquence
    startDialogueSequence() {
        this.dialogueQueue = [
            "Hello! You must be the new guild clerk!",
            "Let me show you the ropes.",
            "Let's begin.",
            "Adventurers will come into the Guild to claim their rewards after completing their quests.",
            "Look for the quest contracts on the board and see what each Adventurer gets for completing their quest.",
            "Each quest will have a drawing of the Adventurer who has claimed it, as well as the list of rewards they'll earn.",
            "Bring all of their rewards onto the counter and ring the bell to let them know they can take it.",
            "Sound easy enough?",
            "Let's practice.",
            "Go look for the quest contract with my face on it and give me the corresponding item."
        ];

        this.showNextDialogue();
    }

    startSecondDialogueSequence() {
        this.dialogueQueue = [
            "Nice!",
            "You've pretty much got the basics down.",
            "Not like there was much to learn in the first place- hahaha!",
            "Anyways, you're pretty much set to fly solo now, so I'll get out of your hair.",
            "Good luck!",
            "You'll do great today."
        ];
        
        this.showNextDialogue();
    }

    advanceDialogue() {
        if (!this.isTyping && this.dialogueQueue.length > 0) {
            this.showNextDialogue();
        }
    }

    showNextDialogue() {
        if (this.dialogueQueue.length > 0) {
            const nextDialogue = this.dialogueQueue.shift();
            this.updateDialogue(nextDialogue);
        }
    }

    updateDialogue(text) {
        this.dialogueText.setText(''); 
        let index = 0;
    
        this.isTyping = true;
    
        this.time.removeAllEvents();
    
        this.time.addEvent({
            delay: 25, 
            callback: () => {
                if (index < text.length) {
                    this.dialogueText.text += text[index]; 
                    index++;
                } else {
                    this.time.removeAllEvents(); 
                    this.isTyping = false;
    
                    if (this.dialogueQueue.length === 0) {
                        this.time.delayedCall(500, () => {
                            this.clearDialogueAndExit();
                        });
                    }
                }
            },
            loop: true
        });
    }
    
    clerkLeaves() {
        this.dialogueText.setText('');
    
        this.tweens.add({
            targets: this.clerk,
            x: -120, 
            duration: 1000, 
            ease: 'Power2'
        });
    }

    clearDialogueAndExit() {
        this.dialogueText.setText('');
    
        this.dialogueBox.destroy();
    
        this.time.delayedCall(500, () => {
            this.clerkLeaves();
        });
    }
}
