import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhaserFirstGameComponent } from './phaser-first-game/phaser-first-game.component';
import { PhaserHomeComponent } from './phaser-home/phaser-home.component';
@NgModule({
  declarations: [AppComponent, PhaserFirstGameComponent, PhaserHomeComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
