//home.module.ts
import { NgModule } from '@angular/core';
import { ForgotpasswordPage} from './forgotpassword';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ForgotpasswordPage],
  imports: [IonicPageModule.forChild(ForgotpasswordPage)],
})
export class ForgotpasswordPageModule { }