import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadformPage } from './downloadform.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadformPageRoutingModule {}
