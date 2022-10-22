import { Component, OnInit } from '@angular/core';
import SceneKeys from '../consts/SceneKeys';

export default class PlayGame extends Phaser.Scene {
  constructor() {
    super(SceneKeys.PlayGame);
  }

  create() {
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

    this.add.text(100, 200, 'Enjoy the game, shall you...', style);
    console.log('THis is my first awesome games');
  }
}
