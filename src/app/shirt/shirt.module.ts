import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShirtPageRoutingModule } from './shirt-routing.module';

import { ShirtPage } from './shirt.page';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,MatIconModule,MatCardModule,
    IonicModule,
    ShirtPageRoutingModule
  ],
  declarations: [ShirtPage]
})
export class ShirtPageModule {}
