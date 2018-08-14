import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController  } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PushNotification } from "../../services/push-notification.service";

import firebase from 'firebase';

/**
 * Generated class for the HomedetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-homedetails',
  templateUrl: 'homedetails.html',
})
export class HomedetailsPage {

  userData: any;
  businessUserData: any;
  barcodeDataText: any;
  productBuyer: any;
  userBuyerId: any;
  paymentAlertBox: any;
  slideData: any;
  menuItem: any = [];
  user: any;
  points: any;
  scanBool: any = false;

  public callPhoneNumber: any;
  public callAlternateNumbare: any;
  public mailToEmail: any;

  constructor(private toastCtrl: ToastController, private pushNotif: PushNotification, private event: Events, private storage: Storage, private alertCtrl: AlertController, private af: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
  }

  public ngOnInit() {
    console.log('Nav Params Items', this.navParams.get('navigateKey'));
    let businessData = firebase.database().ref('/businessProfile/');
    businessData.child(this.navParams.get('navigateKey')).once("value", (snapshot) => {
      this.userData = snapshot.val();
      console.log('Snapshot Data', snapshot.val());
      this.callPhoneNumber = 'tel:' + snapshot.val().phoneNumber;
      this.callAlternateNumbare = 'tel:' + snapshot.val().alternateNumber;
      this.mailToEmail = 'mailto:' + snapshot.val().email;
      this.slideData = snapshot.val().bussinessImages;
      this.menuItem = snapshot.val().menuList ? snapshot.val().menuList : [] ;
    });
    // this.user = this.af.object('/businessProfile/' + this.navParams.get('navigateKey'));

    // this.user.subscribe((data) => {
    //   this.userData = data;
    //   this.callPhoneNumber = 'tel:' + data.phoneNumber;
    //   this.callAlternateNumbare = 'tel:' + data.alternateNumber;
    //   this.mailToEmail = 'mailto:' + data.email;
    //   this.slideData = data.bussinessImages;
    //   this.menuItem = data.menuList ? data.menuList : [] ;
    // });

    

    this.storage.get('uid').then((response) => {
      this.userBuyerId = response;
      this.user = this.af.object('/userProfile/' + response);
      this.user.subscribe((currentUser) => {
        this.productBuyer = currentUser;
        this.points = currentUser.points;
    })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomedetailsPage');
  }

  jarvisMakeMeBold(name) {
    return '<strong>' + name + '</strong>'
  }

  scanQrCode(menu: any) {
    this.scanBool = true;
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log('Jarvis Barcode Reply ==> ', barcodeData);
      this.barcodeDataText = barcodeData.text;
      if(this.barcodeDataText && this.barcodeDataText == this.navParams.get('navigateKey')) {
        this.user = this.af.object('/businessProfile/' + barcodeData.text);
        this.user.subscribe((data) => {
          if(this.scanBool) {
            console.log('Jarvis Business user info from barcode san data', data);
            this.businessUserData = data;
            this.paymentAlertBox = this.alertCtrl.create({
              title: 'Confirm purchase',
              message: 'Are you sure you want to pay ' + data.bussinessName + ' ' + menu.points + ' points for ' + this.jarvisMakeMeBold(menu.itemName) + '.',
              cssClass: 'payment-alert',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Buy',
                  handler: () => {
                    this.userConfirmToPay(menu);
                  }
                }
              ]
            });
            this.paymentAlertBox.present();
          }
        });
        // Success! Barcode data is here
      } else {
        let toast = this.toastCtrl.create({
          message: 'Please scan a valid QR code to buy this product.',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }
      
       
     }, (err) => {
         // An error occurred
     });
  }

  userConfirmToPay(currentMenu) {
        this.points = this.points - currentMenu.points;
        console.log('Updating user New points', this.points);
        this.af.object('/userProfile/' + this.userBuyerId).update({points: this.points}).then(() => {
          this.scanBool = false;
          console.log('Inform business user');
            this.af.object('/businessProfile/' + this.barcodeDataText).update({paymentSuccessUser: Object.assign(this.productBuyer, currentMenu)}).then((response) => {
            console.log('Added user details who did the payment', response);
            let alert = this.alertCtrl.create({
              title: 'Payment Success',
              message: 'Your current points are ' + this.points + '.',
              buttons: ['OK']
            });
            alert.present();
            this.ngOnInit();
            }, (error)=> {
                console.log('Failed Error ');
            });
        }, (error) => {
          console.log('Error', error);
            
        });




         // let message = {
        //   "username": this.businessUserData.name,
        //   "registrationId": this.businessUserData.registrationId,
        //   "type": "requestSpot"
        // }
    
        // console.log('Push notify MESSAGE ==>', message)
        // this.pushNotif.sendPush(message).subscribe((response) => {
        //   //alert(JSON.stringify(response));
        //   console.log('Push notify SUCCESS ==>', JSON.stringify(response))
        // },
        //   (error) => {
        //     console.log('Push notify ABC ERROR ==>', error);
        //   })
  }

}
