import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JewelleryPage } from './jewellery.page';

const routes: Routes = [
  {
    path: '',
    component: JewelleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JewelleryPageRoutingModule {}
