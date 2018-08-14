//home.module.ts
import { NgModule } from '@angular/core';
import { BussinessAddMenuPage } from './bussiness-add-menu';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [BussinessAddMenuPage],
  imports: [IonicPageModule.forChild(BussinessAddMenuPage)],
})
export class BussinessAddMenuPageModule { }