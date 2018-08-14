import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NavController, ModalController } from "ionic-angular";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Storage } from "@ionic/storage";
import { AlertController } from 'ionic-angular';
import { Observable } from "rxjs";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'bussiness-add-menu',
  templateUrl: 'bussiness-add-menu.html',
})

export class BussinessAddMenuPage {

  menuItem: any = [];
  user: any;
  userData: any;
  slideData: any;
  userDataLoaded: any = true;

  constructor(private http: Http, public alertCtrl: AlertController, private barcodeScanner: BarcodeScanner, private navCtrl: NavController, private af: AngularFireDatabase, private storage: Storage, public modalCtrl: ModalController) {

  }

  public ngOnInit() {
    if (!this.user && this.userDataLoaded) {
      this.storage.get('uid').then((response) => {
        this.user = this.af.object('/businessProfile/' + response);
        this.user.subscribe((data) => {
          console.log('Business USER DATA', data);
          this.userDataLoaded = false;
          this.userData = data;
          this.slideData = data.bussinessImages;
          if (this.userData.menuList) {
            this.menuItem = this.userData.menuList;
          }

          // Check the user subscription status
          let userData = firebase.database().ref('/userProfile/');
          userData.child(response).once("value", (snapshot) => {
            if (snapshot.val().subscription == false) {
              this.navCtrl.setRoot('SubscriptionPage', { subscriptionType: 'business', uid: response });
            } else {
              this.prepareRequest('http://yaspat.deapps.io:3002/users/get_agreement', `agreement_id=${snapshot.val().subscription}`, 'post').subscribe((data) => {
                let agreementDetails = JSON.parse(data._body);
                console.log('Agreement Details', agreementDetails);
                if (agreementDetails.state !== 'Active') {
                  this.navCtrl.setRoot('SubscriptionPage', { subscriptionType: 'business', uid: response });
                } else {
                  console.log('Jarvis look every thing fine Business Page');
                }
              });
            }
          });
        });
      }, (error) => {
        console.log('something went wrong', error);
      });
    }
  }

  prepareRequest(url, body, method) {
    let options: any = {
      url: url,
      method: method,
      headers: this.prepareHeaders(),
      body: body
    }

    return this.http.request(url, options)
      .map((res) => this.prepareData(res)).catch((error) => this.handleError(error));
  }

  private handleError(err: any) {
    // console.log('handleError',err)
    if (err) {
      console.log('ERROR', err);

      // Handled for cases where might be Api not able to response error message
    }
    return Observable.throw(2, err);
  }

  private prepareData(res: any) {
    return res;
  }

  prepareHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  openUserBarcode() {
    this.navCtrl.push('QrCodePage');
  }

  scanQrCode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('User Data ==> ', barcodeData);
      // Success! Barcode data is here
    }, (err) => {
      // An error occurred
    });
  }

  addMenuItem() {
    var opts = {
      cssClass: 'addItem'
    }
    let profileModal = this.modalCtrl.create('AdditemPage', '', opts);

    profileModal.onDidDismiss((data) => {
      if (data) {
        data['recent'] = true;
        this.menuItem.unshift(data);
      }
    });

    profileModal.present();
  }

  publishMenuItem() {
    console.log('Publish menu item');
    this.menuItem.forEach((element, index) => {
      this.menuItem[index].recent = false;
      if (this.menuItem[index].disable == true) {
        this.menuItem.splice(index, 1);
      }
    });
    let menuData = { menuList: this.menuItem };
    this.storage.get('uid').then((response) => {
      this.af.object('/businessProfile/' + response).update(menuData);
    })
  }

  deleteMenuItem(index, item) {
    console.log('Delete with index', index, item);
    let confirm = this.alertCtrl.create({
      title: 'Delete item - ' + item.itemName + ' ??',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            item['disable'] = true;
            this.menuItem[index] = item;
            console.log('asdasd', this.menuItem);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
    // this.menuItem.splice(index, 1);
  }

  revertMenuItem(index, item) {
    console.log(item);
    item['disable'] = false;
    this.menuItem[index] = item;
  }
}

