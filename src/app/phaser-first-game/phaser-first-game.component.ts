import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';
import Preloader from './scenes/Preloader';
import CONFIG from './consts/Configs';
import PlayGame from './scenes/PlayGame';
@Component({
  selector: 'app-phaser-first-game',
  templateUrl: './phaser-first-game.component.html',
  styleUrls: ['./phaser-first-game.component.scss'],
})
export class PhaserFirstGameComponent implements OnInit {
  game!: Phaser.Game;
  config!: Phaser.Types.Core.GameConfig;

  constructor() {}

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): any {
    const SHARED_CONFIG = {
      width: CONFIG.WIDTH,
      height: CONFIG.HEIGHT,
    };
    this.config = {
      type: Phaser.AUTO,
      parent: 'first-phaser',
      ...SHARED_CONFIG,
      // backgroundColor: 0xb6d3ff,
      physics: {
        default: 'arcade',
        arcade: {
          // gravity: { y: 200 },
          debug: true,
        },
      },

      scene: [Preloader, PlayGame],
    };
    this.game = new Phaser.Game(this.config);
    window.focus();
    this.resizeGame();
    window.addEventListener('resize', this.resizeGame(), false);
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
    } else {
      canvas.style.width = windowHeight * gameRatio + 'px';
      canvas.style.height = windowHeight + 'px';
    }
  }
}
