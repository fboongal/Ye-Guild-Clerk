class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload(){
        this.load.path = './assets/'

        // load background assets
        this.load.image('counter', 'img/counter.png')
        this.load.image('end', 'img/end.png')
        this.load.image('title', 'img/title.png')
        this.load.image('bg', 'img/tavern.jpg')

        // load UI assets
        this.load.image('cTop', 'img/countertop.png')

        // load adventurers! (and tutorial clerk)
        this.load.image('clerk', 'img/bart.png')
        this.load.image('froge', 'img/froge.png')

        // load items
        this.load.image('gold', 'img/gold.png')
        this.load.image('bell', 'img/bell.png')

        this.load.image('2gold', 'img/2gold.png')
        this.load.image('3gold', 'img/3gold.png')

        this.load.image('gSack', 'img/sack.png')

        this.load.image('aGem', 'img/ame.png')
        this.load.image('dGem', 'img/dia.png')
        this.load.image('eGem', 'img/emerald.png')
        this.load.image('rGem', 'img/ruby.png')
        this.load.image('sGem', 'img/sapphire.png')

        this.load.image('fQuest', 'img/frogeQuest.png')
        this.load.image('aQuest', 'img/axoQuest.png')
        this.load.image('tQuest', 'img/todQuest.png')
        this.load.image('bQuest', 'img/bartQuest.png')

        // load audio
        this.load.audio('ding', 'audio/ding.wav')
        this.load.audio('music', 'audio/music.wav')
    }

    create(){

        // add music
        this.music = this.sound.add('music', { volume: 0.25, loop: true });

        if(!this.musicPlayed){
            this.music.play()
            this.musicPlayed = true
        }

        if (this.musicPlayed && this.scene.isActive('playScene')){
            this.musicPlayed = false
        }
        
        // add title screen
        this.add.image(centerX, centerY, 'title')

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
            fontSize: '50px',
            backgroundColor: '#FFFFFF',
            color: '#000000'
        }

        // display title text
        // this.add.text(centerX, centerY - 25, ' Ye Guild Clerk! ', titleConfig).setOrigin(0.5)
    
        // display play button
        const playButton = this.add.text(centerX, centerY + 200, ' PLAY ', buttonConfig).setOrigin(0.5)
        // make play button interactive
        playButton.setInteractive()
        // on click, start playScene
        playButton.on("pointerdown", (pointer)=>{
            console.log("click")
            this.scene.start('playScene')
        })

        // instruction text
        // document.getElementById('info').innerHTML = 'Controls: Press [Left Click] to interact. Hold [Left Click] to drag.'
    }

    update(){
        // shortcut to start play scene
        //this.scene.start('playScene');
    }
}