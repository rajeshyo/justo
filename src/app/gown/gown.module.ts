import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule} from '@angular/material/card';

import { IonicModule } from '@ionic/angular';

import { GownPageRoutingModule } from './gown-routing.module';

import { GownPage } from './gown.page';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,MatIconModule,
    IonicModule,MatCardModule,
    GownPageRoutingModule
  ],
  declarations: [GownPage]
})
export class GownPageModule {}
