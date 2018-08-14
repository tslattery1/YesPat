//home.module.ts
import { NgModule } from '@angular/core';
import { HistoryDetailPage} from './history-detail';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [HistoryDetailPage],
  imports: [IonicPageModule.forChild(HistoryDetailPage)],
})
export class HistoryDetailPageModule { }