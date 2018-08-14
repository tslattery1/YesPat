import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'qr-code',
  templateUrl: 'QRCode.html',
})

export class QrCodePage {
  createdQrCode: any = null;
  userInfo: any;
  user: FirebaseObjectObservable<any>;
  generateQRCodeBool: any = false;
  currentBrightness: any;

  constructor(private storage: Storage, private af: AngularFireDatabase) {

  }
  
  public ngOnInit() {
    this.generateQRCodeBool = true;
        this.storage.get('uid').then((response) => {
        this.createdQrCode = response;
  
        this.user = this.af.object('/businessProfile/' + response);
        this.user.subscribe((data) => {
          if(this.generateQRCodeBool) {
          console.log('QR Code component USER DATA', data);
          this.userInfo = data;
          this.generateQRCodeBool = false;
          }
        });
      });
  }
}

