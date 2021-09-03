import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BagdetailPage } from './bagdetail.page';

const routes: Routes = [
  {
    path: '',
    component: BagdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BagdetailPageRoutingModule {}
