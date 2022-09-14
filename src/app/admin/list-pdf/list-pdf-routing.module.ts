import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPdfPage } from './list-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ListPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPdfPageRoutingModule {}
