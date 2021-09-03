import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShirtdetailPageRoutingModule } from './shirtdetail-routing.module';

import { ShirtdetailPage } from './shirtdetail.page';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    ShirtdetailPageRoutingModule
  ],
  declarations: [ShirtdetailPage]
})
export class ShirtdetailPageModule {}
