import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, MenuController, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Auth } from "../../providers/auth/auth";
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs";
import firebase from 'firebase';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";



@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  public subscriptionType: any;
  public userId: any;
  public loader: any;

  constructor(private loadingCtrl: LoadingController,private af: AngularFireDatabase,private iab: InAppBrowser, public menuCtrl: MenuController, private toastCtrl: ToastController, private http: Http, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private auth: Auth) {
  }

  public ngOnInit() {
    this.menuCtrl.enable(false);
    this.subscriptionType = this.navParams.get('subscriptionType');
    this.userId = this.navParams.get('uid');
  }

  public logOutuser() {
    console.log('logOut');
    this.storage.clear();
    this.auth.logoutUser()
      .then(() => {
        this.navCtrl.setRoot('LoginPage');
        // this.app.getRootNav().setRoot('LoginPage');
      })
    localStorage.clear();
  }

  public subscribeUser() {
    console.log('Jarvis subscribe this user');
    this.loader = this.loadingCtrl.create({
      content: 'Subscribing...'
    });
    this.loader.present();
    let subscriptionType = this.subscriptionType == 'business' ? 'business' : 'user';
    this.prepareRequest('http://yaspat.deapps.io:3002/users/create_plan', `type=${subscriptionType}`, 'post').subscribe((data) => {
      let response = JSON.parse(data._body);
      console.log('Create Plan Data', response);
      if (response[0].statusCode == 200) {
        let planID = response[0].value.plan_id;
        console.log('Plan Id ', planID);
        setTimeout(() => {
          this.prepareRequest('http://yaspat.deapps.io:3002/users/create_agreement', `plan_id=${planID}`, 'post').subscribe((data) => {
            let response = JSON.parse(data._body);
            console.log('Create Agreement', response);
            if (response[0].statusCode == 200) {
              setTimeout(() => {
                const browser = this.iab.create(response[0].value.approval_url, '_blank', 'location=yes');

                browser.on('exit').subscribe(() => {
                  console.log(1);
                  this.prepareRequest('http://yaspat.deapps.io:3002/users/execute_agreement', `token=${response[0].value.token}`, 'post').subscribe((data) => {
                    let tempAgreementID = JSON.parse(data._body);
                    console.log('execute_agreement', tempAgreementID);
                    if (tempAgreementID.statusCode == 200) {
                      let agreementId = tempAgreementID.agreement_id;
                      console.log('AgreementId', agreementId, this.userId);
                      this.af.object('/userProfile/' + this.userId).update({ subscription: agreementId }).then(() => {
                        if(this.loader) {
                          this.loader.dismiss();
                        }
                        this.menuCtrl.enable(true);
                        this.navCtrl.setRoot(this.subscriptionType == 'business' ? 'BussinessAddMenuPage' : 'PostFindspotPage');
                      }, (error) => {
                        if(this.loader) {
                          this.loader.dismiss();
                        }
                        this.showToast();
                      });
                      // firebase.database().ref().child(this.userId).update({ subscription: agreementId }).then(() => {
                      //   this.menuCtrl.enable(true, 'authenticated');
                      //   this.navCtrl.setRoot('HomePage');
                      // }, (error) => {
                      //   this.showToast();
                      // });
                    } else {
                      if(this.loader) {
                        this.loader.dismiss();
                      }
                      this.showToast(tempAgreementID.message);
                    }
                  }, (error) => {
                    if(this.loader) {
                      this.loader.dismiss();
                    }
                    this.showToast();
                  });
                })
              }, 1000);
            } else {
              if(this.loader) {
                this.loader.dismiss();
              }
              this.showToast();
            }
          }, (error) => {
            if(this.loader) {
              this.loader.dismiss();
            }
            this.showToast();
          });
        }, 1000);
      } else {
        if(this.loader) {
          this.loader.dismiss();
        }
        this.showToast(response.message);
      }
    }, (error) => {
      if(this.loader) {
        this.loader.dismiss();
      }
      this.showToast();
    });
  }

  showToast(message?: any) {
    let toast = this.toastCtrl.create({
      message: message || 'Something went wrong.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
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


}
