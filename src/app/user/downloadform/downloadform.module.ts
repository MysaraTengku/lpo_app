import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadformPageRoutingModule } from './downloadform-routing.module';

import { DownloadformPage } from './downloadform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadformPageRoutingModule
  ],
  declarations: [DownloadformPage]
})
export class DownloadformPageModule {}
