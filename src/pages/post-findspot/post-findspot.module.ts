//home.module.ts
import { NgModule } from '@angular/core';
import { PostFindspotPage} from './post-findspot';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [PostFindspotPage],
  imports: [IonicPageModule.forChild(PostFindspotPage)],
})
export class PostFindspotPageModule { }