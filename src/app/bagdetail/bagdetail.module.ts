import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BagdetailPageRoutingModule } from './bagdetail-routing.module';

import { BagdetailPage } from './bagdetail.page';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,
    IonicModule,MatButtonModule,
    BagdetailPageRoutingModule
  ],
  declarations: [BagdetailPage]
})
export class BagdetailPageModule {}
