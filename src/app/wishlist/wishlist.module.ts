import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishlistPageRoutingModule } from './wishlist-routing.module';

import { WishlistPage } from './wishlist.page';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,MatIconModule,
    FormsModule,MatCardModule,MatButtonModule,
    IonicModule,
    WishlistPageRoutingModule
  ],
  declarations: [WishlistPage]
})
export class WishlistPageModule {}
