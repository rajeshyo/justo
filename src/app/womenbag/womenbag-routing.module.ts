import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WomenbagPage } from './womenbag.page';

const routes: Routes = [
  {
    path: '',
    component: WomenbagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WomenbagPageRoutingModule {}
