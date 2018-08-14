//home.module.ts
import { NgModule } from '@angular/core';
import { ParkingListPage} from './parking-list';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [ParkingListPage],
  imports: [IonicPageModule.forChild(ParkingListPage)],
})
export class ParkingListPageModule { }