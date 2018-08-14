//home.module.ts
import { NgModule } from '@angular/core';
import { QrCodePage } from './QRCode';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [QrCodePage],
  imports: [IonicPageModule.forChild(QrCodePage)],
})
export class QrCodePageModule { }