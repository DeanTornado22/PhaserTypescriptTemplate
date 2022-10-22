import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phaser-home',
  templateUrl: './phaser-home.component.html',
  styleUrls: ['./phaser-home.component.scss'],
})
export class PhaserHomeComponent implements OnInit {
  title = 'PhaserGameProject';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      let a = window.location.href;
      // @ts-ignore
      if (event.url) {
        // @ts-ignore
        a = event.url;
        switch (true) {
          case a.includes('first-phaser'):
            this.title = 'First Phaser';
            break;
        }
      }
    });
  }
  ngOnInit(): void {}
}
