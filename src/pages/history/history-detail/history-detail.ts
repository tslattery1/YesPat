import { Component } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";

import { Storage } from "@ionic/storage";
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history-detail',
  templateUrl: 'history-detail.html',
})
export class HistoryDetailPage {
  publishedOn: any;
  publisherDetails: any;
  publisher: boolean = false;
  requesterDetails: any;
  requestersArray: any = [];
  showNoRequesters:boolean = false;

  constructor(

    private storage: Storage,
    private navController: NavController,
    private navParams: NavParams

  ) {

    this.publisherDetails = this.navParams.get("publisherDetails");
    this.requesterDetails = this.navParams.get("requesterDetails");
    let i = 0;
    if (this.requesterDetails != undefined) {
      while (Object.keys(this.requesterDetails)[i] != undefined) {
        let key = Object.keys(this.requesterDetails)[i]
        let myobj = this.requesterDetails[key]
        var mykey = Object.keys(myobj);

        this.requestersArray.push(myobj[mykey[mykey.length - 1]]);
        i++;
      }

    }
    else{
      this.showNoRequesters = true;
    }

  
    this.publishedOn = this.navParams.get("publishedOn");
    // this.publisherDetails(spot_uuid);
    // this.requestersDetails(spot_uuid);
  }

}
