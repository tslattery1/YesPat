//home.module.ts
import { NgModule } from '@angular/core';
import { ProfileDetailsPage} from './profile-details';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ProfileDetailsPage],
  imports: [IonicPageModule.forChild(ProfileDetailsPage)],
})
export class ProfileDetailsPageModule { }