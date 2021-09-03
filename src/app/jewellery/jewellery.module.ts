import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JewelleryPageRoutingModule } from './jewellery-routing.module';

import { JewelleryPage } from './jewellery.page';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,
    JewelleryPageRoutingModule
  ],
  declarations: [JewelleryPage]
})
export class JewelleryPageModule {}
