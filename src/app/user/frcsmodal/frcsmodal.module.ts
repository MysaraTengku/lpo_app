import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FRCSmodalPageRoutingModule } from './frcsmodal-routing.module';

import { FRCSmodalPage } from './frcsmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FRCSmodalPageRoutingModule
  ],
  declarations: [FRCSmodalPage]
})
export class FRCSmodalPageModule {}
