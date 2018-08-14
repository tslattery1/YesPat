//home.module.ts
import { NgModule } from '@angular/core';
import { EditProfilePage} from './edit-profile';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [EditProfilePage],
  imports: [IonicPageModule.forChild(EditProfilePage)],
})
export class EditProfilePageModule { }