import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomedetailsPage } from './homedetails';

@NgModule({
  declarations: [
    HomedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HomedetailsPage),
  ],
  exports: [
    HomedetailsPage
  ]
})
export class HomedetailsPageModule {}
