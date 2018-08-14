import { OneSignal } from '@ionic-native/onesignal';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { NavController, LoadingController, ToastController, AlertController } from "ionic-angular";
import { Http, Headers } from '@angular/http';

import { Storage } from "@ionic/storage";
import { IonicPage } from 'ionic-angular';
import { Auth } from "../../providers/auth/auth";

import firebase from 'firebase';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {
  signupForm: FormGroup;
  loading: any;
  hideSignUpButton: boolean;

  constructor(
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private oneSignal: OneSignal,
    private storage: Storage,
    private auth: Auth,
    private http: Http,
    private alertCtrl: AlertController,
    private af: AngularFireDatabase,
  ) {

    let userData = firebase.database().ref();
    userData.child('AppSettings').once("value", (snapshot) => {
      this.hideSignUpButton = snapshot.val().UserSignUp || false;
    });
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10,10}")]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
      ]),
      password: new FormControl('', [
        Validators.minLength(6),
        Validators.required
      ]),
      confirmpass: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
        ])
    }, passwordMatchValidator);

    function passwordMatchValidator(g: FormGroup) {
      return g.get('password').value === g.get('confirmpass').value
        ? null : { 'mismatch': true };
    }
  }

  public NoWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  userSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);


      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
      });

      this.loading.present();

      let user = this.signupForm.value;

      this.oneSignal.getIds().then((ids) => {
        let playerId: any = ids.userId;
        let pushToken: any = ids.pushToken;

        this.auth.signupUser(user.email, user.password, user.name, user.phoneNumber, playerId, pushToken, 'normalUser')
          .then(() => {
            this.prepareRequest('http://yaspat.deapps.io:3002/users/api/is_referred/' + user.phoneNumber, null, 'post').subscribe((data) => {

              console.log('Data =>>', JSON.parse(data._body));

              let responseData = JSON.parse(data._body);

              if (responseData.status) {

                if (this.loading) {
                  this.loading.dismiss();
                }

                let userData = firebase.database().ref('/userProfile/');
                userData.child(responseData.user_key).once("value", (snapshot) => {

                  let alert = this.alertCtrl.create({
                    title: snapshot.val().name,
                    subTitle: 'You have been rewarded 20 points by referral sucessfull registration',
                    buttons: ['OK']
                  });
                  alert.present();

                  let toast = this.toastCtrl.create({
                    message: 'Account created successfully',
                    duration: 2000,
                    position: 'middle'
                  });
                  this.storage.clear();
                  this.auth.logoutUser()
                    .then(() => {
                    })
                  localStorage.clear();

                  toast.present();

                  this.navCtrl.pop();
                  this.signupForm.reset();

                  let referralRewardData = {
                    userName: user.name
                  }

                  this.af.object('/userProfile/' + responseData.user_key).update({ referralRewardData: referralRewardData });

                  var notificationObj = {
                    "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
                    headings: { "en": 'Referral Reward' },
                    "contents": { "en": 'You have been rewarded 20 points from ' + user.name + ' sucessfull registration' },
                    data: { Root: false, DirectNavigatePage: false },
                    include_player_ids: [snapshot.val().playerId]
                  };

                  console.log('Hello One Signal object', notificationObj);

                  window["plugins"].OneSignal.postNotification(notificationObj,
                    function (successResponse) {
                      // console.log("Notification Success: ", successResponse);
                    },
                    function (failedResponse) {
                      // console.log("Notification Post Failed: ", failedResponse);
                    }
                  );


                });

              } else {

                if (this.loading) {
                  this.loading.dismiss();
                }

                let toast = this.toastCtrl.create({
                  message: 'Account created successfully',
                  duration: 2000,
                  position: 'middle'
                });
                this.storage.clear();
                this.auth.logoutUser()
                  .then(() => {
                  })
                localStorage.clear();

                toast.present();

                this.navCtrl.pop();
                this.signupForm.reset();
              }
            }, (error) => {
              // Exceptional case but more than rewards login of user is important. Cant stop user from sign up if rewards API Fail..
              console.log('Error =>>', error);

              if (this.loading) {
                this.loading.dismiss();
              }

              let toast = this.toastCtrl.create({
                message: 'Account created successfully',
                duration: 2000,
                position: 'middle'
              });
              this.storage.clear();
              this.auth.logoutUser()
                .then(() => {
                })
              localStorage.clear();

              toast.present();

              this.navCtrl.pop();
              this.signupForm.reset();

            });

          },
          error => {
            this.loading.dismiss();
            let toast = this.toastCtrl.create({
              message: error.message,
              duration: 2000,
              position: 'middle'
            });

            toast.present();

          }
          )
      });
    }
  }

  bussinessSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);


      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
      });

      this.loading.present();


      let user = this.signupForm.value;

      this.oneSignal.getIds().then((ids) => {
        let playerId: any = ids.userId;
        let pushToken: any = ids.pushToken;

        this.auth.signupUser(user.email, user.password, user.name, user.phoneNumber, playerId, pushToken, 'bussinesssUser')
          .then((data) => {
            this.prepareRequest('http://yaspat.deapps.io:3002/users/api/is_referred/' + user.phoneNumber, null, 'post').subscribe((data) => {

              console.log('Data =>>', JSON.parse(data._body));

              let responseData = JSON.parse(data._body);

              if (responseData.status) {

                if (this.loading) {
                  this.loading.dismiss();
                }

                let userData = firebase.database().ref('/userProfile/');
                userData.child(responseData.user_key).once("value", (snapshot) => {

                  let alert = this.alertCtrl.create({
                    title: snapshot.val().name,
                    subTitle: 'You have been rewarded 20 points by referral sucessfull registration',
                    buttons: ['OK']
                  });
                  alert.present();

                  let toast = this.toastCtrl.create({
                    message: 'Account created successfully',
                    duration: 2000,
                    position: 'middle'
                  });
                  this.storage.clear();
                  this.auth.logoutUser()
                    .then(() => {
                    })
                  localStorage.clear();

                  toast.present();

                  this.navCtrl.push('BussinessSignUpPage', { UID: data });
                  this.signupForm.reset();

                  let referralRewardData = {
                    userName: user.name
                  }

                  this.af.object('/userProfile/' + responseData.user_key).update({ referralRewardData: referralRewardData });

                  var notificationObj = {
                    "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
                    headings: { "en": 'Referral Reward' },
                    "contents": { "en": 'You have been rewarded 20 points from ' + user.name + ' sucessfull registration' },
                    data: { Root: false, DirectNavigatePage: false },
                    include_player_ids: [snapshot.val().playerId]
                  };

                  console.log('Hello One Signal object', notificationObj);

                  window["plugins"].OneSignal.postNotification(notificationObj,
                    function (successResponse) {
                      // console.log("Notification Success: ", successResponse);
                    },
                    function (failedResponse) {
                      // console.log("Notification Post Failed: ", failedResponse);
                    }
                  );


                });

              } else {

                if (this.loading) {
                  this.loading.dismiss();
                }

                let toast = this.toastCtrl.create({
                  message: 'Account created successfully',
                  duration: 2000,
                  position: 'middle'
                });
                this.storage.clear();
                this.auth.logoutUser()
                  .then(() => {
                  })
                localStorage.clear();

                toast.present();

                this.navCtrl.push('BussinessSignUpPage', { UID: data });
                this.signupForm.reset();
              }
            }, (error) => {
              // Exceptional case but more than rewards login of user is important. Cant stop user from sign up if rewards API Fail..
              console.log('Error =>>', error);

              if (this.loading) {
                this.loading.dismiss();
              }

              let toast = this.toastCtrl.create({
                message: 'Account created successfully',
                duration: 2000,
                position: 'middle'
              });
              this.storage.clear();
              this.auth.logoutUser()
                .then(() => {
                })
              localStorage.clear();

              toast.present();

              this.navCtrl.push('BussinessSignUpPage', { UID: data });
              this.signupForm.reset();

            });
          },
          error => {
            this.loading.dismiss();
            let toast = this.toastCtrl.create({
              message: error.message,
              duration: 2000,
              position: 'middle'
            });

            toast.present();

          }
          )

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


}
