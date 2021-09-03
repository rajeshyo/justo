import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WomenbagPageRoutingModule } from './womenbag-routing.module';
import { MatCardModule } from '@angular/material/card';
import { WomenbagPage } from './womenbag.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,MatCardModule, MatIconModule,
    IonicModule,
    WomenbagPageRoutingModule
  ],
  declarations: [WomenbagPage]
})
export class WomenbagPageModule {}
