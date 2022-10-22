import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PhaserFirstGameComponent } from './phaser-first-game/phaser-first-game.component';
import { PhaserHomeComponent } from './phaser-home/phaser-home.component';

const routes: Routes = [
  {
    path: '',
    component: PhaserHomeComponent,
    children: [
      {
        path: 'first-phaser',
        component: PhaserFirstGameComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
