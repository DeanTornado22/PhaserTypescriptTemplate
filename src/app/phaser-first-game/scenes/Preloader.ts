import * as Phaser from 'phaser';

// import TextureKeys from '../consts/TextureKeys';
import SceneKeys from '../consts/SceneKeys';
// import AnimationKeys from '../consts/AnimationKeys';
import CONFIG from '../consts/Configs';
import WebFontFile from 'src/app/WebFontFile';
import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';

enum CharacterState {
  Idle,
  Running,
  Hit,
  Killed,
  Dead,
}

export default class Preloader extends Phaser.Scene {
  wall!: Phaser.GameObjects.Image;
  collectable!: Phaser.GameObjects.Image;
  character!: Phaser.GameObjects.Sprite;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  walls!: Phaser.Physics.Arcade.Group;

  constructor() {
    super(SceneKeys.Preloader);
  }

  preload() {
    // this.load.image(TextureKeys.Background, 'house/bg_repeat_340x640.png');
    // this.load.image(TextureKeys.MouseHole, 'house/object_mousehole.png');
    // this.load.image(TextureKeys.Window1, 'house/object_window1.png');
    // this.load.image(TextureKeys.Window2, 'house/object_window2.png');
    // this.load.image(TextureKeys.Bookcase1, 'house/object_bookcase1.png');
    // this.load.image(TextureKeys.Bookcase2, 'house/object_bookcase2.png');
    // this.load.image(TextureKeys.LaserEnd, 'house/object_laser_end.png');
    // this.load.image(TextureKeys.LaserMiddle, 'house/object_laser.png');
    // this.load.image(TextureKeys.Coin, 'house/object_coin.png');
    // this.load.atlas(
    //   TextureKeys.RocketMouse,
    //   'characters/rocket-mouse.png',
    //   'characters/rocket-mouse.json'
    // );
    // this.load.setBaseURL('http://labs.phaser.io');
    // this.load.image('sky', 'assets/skies/space3.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');
    // this.load.setBaseURL('http://172.27.57.242:7200/first-phaser/');
    // this.load.image(TextureKeys.Wall, 'public/first-phaser/wall.png');
    this.load.image(
      TextureKeys.Wall,
      'assets/images/phaser-first-game/wall.png'
    );
    // this.load.spritesheet(
    //   TextureKeys.Character,
    //   '../../../assets/images/phaser-first-game/02_run.png',
    //   {
    //     frameWidth: 512,
    //     frameHeight: 512,
    //     endFrame: 8,
    //   }
    // );
    this.load.atlas(
      TextureKeys.Character,
      'assets/images/phaser-first-game/run.png',
      'assets/images/phaser-first-game/run.json'
    );

    const fonts = new WebFontFile(this.load, 'Abel');
    this.load.addFile(fonts);
    const progress = this.add.graphics();

    // this.load.on('progress', (value: any) => {
    //   progress.clear();
    //   progress.fillStyle(0xffffff, 1);
    //   progress.fillRect(0, 270, 800 * value, 60);
    // });

    // this.load.on('complete', async () => {
    //   // progress.destroy();
    //   const waitALittle = await new Promise((resolve) =>
    //     setTimeout(resolve, 2000)
    //   );
    //   this.scene.start(SceneKeys.PlayGame);
    // });
  }

  async create() {
    const x = this.scale.width * 0.5;
    const y = this.scale.height * 0.5;
    const style = {
      fontFamily: 'Abel',
      fontSize: '48px',
      color: '#FFFFFF',
      fontStyle: 'normal',
      strokeThickness: 2,
      maxLines: 1,
      resolution: 3,
    };

    this.add.text(x, y, 'Loading...', style);

    this.wall = this.physics.add.image(400, 300, TextureKeys.Wall);
    this.wall.setTint(0xdd3333);
    const bodyWall = this.wall.body as Phaser.Physics.Arcade.Body;
    // bodyWall.setImmovable(true);
    bodyWall.setCollideWorldBounds(true);
    this.collectable = this.physics.add.image(500, 600, TextureKeys.Wall);
    this.collectable.setTint(0x3d5333);
    const bodycollectable = this.collectable.body as Phaser.Physics.Arcade.Body;
    // bodyWall.setImmovable(true);
    bodyWall.setCollideWorldBounds(true);

    this.walls = this.physics.add.group({
      key: TextureKeys.Wall,
      immovable: true,
      quantity: 20,
      setXY: { x: 12 + 70, y: 0, stepX: 40 },
    });

    this.walls.children.iterate((item: any) => {
      let x = Math.random() * this.sys.canvas.width;
      let y = Math.random() * this.sys.canvas.height;
      item.setPosition(x, y);
      item.setTint(0x18ccc3);
    }, this);

    this.character = this.physics.add.sprite(200, 200, TextureKeys.Character);

    // this.character.anims.create({
    //   key: AnimationKeys.CharacterRun,
    //   frames: this.character.anims.generateFrameNumbers(TextureKeys.Character, {
    //     start: 0,
    //     end: 8,
    //   }),
    //   frameRate: 3,
    //   repeat: -1,
    // });
    this.createAnimations();

    const characterBody = this.character.body as Phaser.Physics.Arcade.Body;
    this.character.play(AnimationKeys.CharacterIddle);
    characterBody.setCollideWorldBounds(true);
    // this.add.image(450, 300, TextureKeys.Wall);
    // this.add.image(500, 300, TextureKeys.Wall);
    // this.scene.start(SceneKeys.PlayGame);

    this.physics.add.collider(this.wall, this.character);
    this.physics.add.collider(this.walls, this.character);
    this.physics.add.overlap(
      this.collectable,
      this.character,
      this.handleOverlapWallCharacter,
      undefined,
      this
    );
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  handleOverlapWallCharacter(obj1: any, obj2: any) {
    console.log('Charater overlap wall 2');
    obj1.destroy();
  }
  update() {
    const characterBody = this.character.body as Phaser.Physics.Arcade.Body;
    characterBody.setVelocity(0);

    if (this.cursors.left.isDown) {
      characterBody.setVelocityX(-300);
      this.character.play(AnimationKeys.CharacterRunLeft, true);
    }

    if (this.cursors.right.isDown) {
      characterBody.setVelocityX(300);
      this.character.play(AnimationKeys.CharacterRunRight, true);
    }

    if (this.cursors.up.isDown) {
      characterBody.setVelocityY(-300);
      this.character.play(AnimationKeys.CharacterJumpUp, true);
    }
    if (this.cursors.down.isDown) {
      characterBody.setVelocityY(300);
      this.character.play(AnimationKeys.CharacterJumpDown, true);
    }
    if (
      this.character.body.velocity.x !== 0 ||
      this.character.body.velocity.y !== 0
    ) {
      // this.character.play(AnimationKeys.CharacterRun, true);
    } else {
      this.character.play(AnimationKeys.CharacterIddle, true);
    }
  }
  resizeGame(): any {
    const canvas = document.querySelector('canvas') as any;
    console.log('Canvas in resize:', canvas);
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    let gameRatio =
      (this.game.config.width as any) / (this.game.config.height as any);
    console.log('Game ratio:', gameRatio);
    if (windowRatio < gameRatio) {
      canvas.style.width = windowWidth + 'px';
      canvas.style.height = windowWidth / gameRatio + 'px';
      return { width: windowWidth, height: windowWidth / gameRatio };
    } else {
      canvas.style.width = windowHeight * gameRatio + 'px';
      canvas.style.height = windowHeight + 'px';
      return {
        width: windowHeight * gameRatio,
        height: windowHeight,
      };
    }
  }
  createAnimations(): any {
    this.character.anims.create({
      key: AnimationKeys.CharacterIddle,
      frames: this.character.anims.generateFrameNames(TextureKeys.Character, {
        start: 1,
        end: 8,
        prefix: 'idle_',
        zeroPad: 0,
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.character.anims.create({
      key: AnimationKeys.CharacterRunRight,
      frames: this.character.anims.generateFrameNames(TextureKeys.Character, {
        start: 1,
        end: 8,
        prefix: 'run_',
        zeroPad: 0,
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.character.anims.create({
      key: AnimationKeys.CharacterRunLeft,
      frames: this.character.anims.generateFrameNames(TextureKeys.Character, {
        start: 1,
        end: 8,
        prefix: 'run_left_',
        zeroPad: 0,
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.character.anims.create({
      key: AnimationKeys.CharacterJumpUp,
      frames: this.character.anims.generateFrameNames(TextureKeys.Character, {
        start: 1,
        end: 3,
        prefix: 'j_up_',
        zeroPad: 0,
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.character.anims.create({
      key: AnimationKeys.CharacterJumpDown,
      frames: this.character.anims.generateFrameNames(TextureKeys.Character, {
        start: 1,
        end: 3,
        prefix: 'j_down_',
        zeroPad: 0,
        suffix: '.png',
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
