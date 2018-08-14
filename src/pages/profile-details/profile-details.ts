import { Component } from '@angular/core';

/*import { EditProfilePage } from "./edit-profile/edit-profile";*/

import { Storage } from "@ionic/storage";
import { NavController, AlertController, ToastController, LoadingController } from "ionic-angular";
import { IonicPage } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Auth } from "../../providers/auth/auth";

import firebase from 'firebase';

import { Http, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: 'page-profile-details',
  templateUrl: 'profile-details.html',
})
export class ProfileDetailsPage {
/*  editprofilePage = EditProfilePage;*/
user: FirebaseListObservable<any>;
  userDetails : any;
  username : string;
  showUserDetails : boolean = false;
  public renewalDate: any;
  public loader: any;
  public subscriptionStatus: any;

  constructor(

    private storage: Storage,
    private navCtrl : NavController,
    private af: AngularFireDatabase,
    private auth : Auth,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public http: Http
  ) {
    
      this.storage.get('uid').then((response)=>{
        let userData = firebase.database().ref('/userProfile/' + response);
        userData.once("value", (snapshot) => {
          this.userDetails =  snapshot.val();
        })
      })
      

  }

  ionViewDidEnter() {
    this.storage.get('uid').then((uid) => {
      let userData = firebase.database().ref('/userProfile/');
      userData.child(uid).once("value", (snapshot) => {
          this.prepareRequest('http://yaspat.deapps.io:3002/users/get_agreement', `agreement_id=${snapshot.val().subscription}`).subscribe((data) => {
            let agreementDetails = JSON.parse(data._body);
            this.subscriptionStatus = agreementDetails.user_state;
            if(agreementDetails && agreementDetails.agreement_details.next_billing_date) {
              var str = agreementDetails.agreement_details.next_billing_date;
              var date = new Date(str);
              var day = date.getDate();
              var month = date.getMonth() + 1;
              var year = date.getFullYear();
              this.renewalDate = { day: day, month: month, year: year, agreementId: agreementDetails.id };
            } else {
              this.renewalDate = null;
            }
          });
      });
    });

  }

  unSubscribe() {
    let alert = this.alertCtrl.create({
      title: 'Unsubscribe',
      message: 'Are you sure you want to unsubscribe?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.loader = this.loadingCtrl.create({
              content: 'Unsubscribing...'
            });
            this.loader.present();
            this.prepareRequest('http://yaspat.deapps.io:3002/users/cancel_agreement', `agreement_id=${this.renewalDate.agreementId}`).subscribe((data) => {

              let cancelData = JSON.parse(data._body);
              if (cancelData.statusCode == 204) {
                this.loader.dismiss();
                let toast = this.toastCtrl.create({
                  message: 'Unsubscribed Successfully',
                  duration: 3000,
                  position: 'top'
                });

                toast.onDidDismiss(() => {
                  this.ionViewDidEnter();
                });

                toast.present();
              } else {
                this.loader.dismiss();
                let toast = this.toastCtrl.create({
                  message: 'Something went wrong',
                  duration: 3000,
                  position: 'top'
                });

                toast.present();
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  prepareRequest(url, body) {
    let options = {
      headers: this.prepareHeaders(),
    }

    return this.http.post(url, body, options)
      .map((res) => this.prepareData(res)).catch((error) => this.handleError(error));
  }

  private handleError(err: any) {
    if (err) {
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

  gotoEditProfilePage(){
    this.navCtrl.push('EditProfilePage');
  }


}


