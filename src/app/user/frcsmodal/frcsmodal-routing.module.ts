import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FRCSmodalPage } from './frcsmodal.page';

const routes: Routes = [
  {
    path: '',
    component: FRCSmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FRCSmodalPageRoutingModule {}
