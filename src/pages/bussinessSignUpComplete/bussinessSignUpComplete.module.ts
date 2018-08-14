//home.module.ts
import { NgModule } from '@angular/core';
import { BussinessSignUpPage } from './bussinessSignUpComplete';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [BussinessSignUpPage],
  imports: [IonicPageModule.forChild(BussinessSignUpPage)],
})
export class BussinessSignupPageModule { }