import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPdfPageRoutingModule } from './list-pdf-routing.module';

import { ListPdfPage } from './list-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPdfPageRoutingModule
  ],
  declarations: [ListPdfPage]
})
export class ListPdfPageModule {}
