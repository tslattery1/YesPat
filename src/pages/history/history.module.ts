//home.module.ts
import { NgModule } from '@angular/core';
import { HistoryPage} from './history';
import { IonicPageModule } from 'ionic-angular';
import { OrderByPipe } from "./order-by.pipe";

@NgModule({
  declarations: [HistoryPage,OrderByPipe],
  imports: [IonicPageModule.forChild(HistoryPage)],
})
export class HistoryPageModule { }