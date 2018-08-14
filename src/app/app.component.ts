import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component, ViewChild, NgZone } from '@angular/core';
import { Platform, NavController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';
//import { LocalNotifications } from '@ionic-native/local-notifications';
//import { Observable } from 'rxjs/Rx';
//import { Usergrid } from '../services/usergrid.service';
import { AlertController, ToastController, LoadingController, App } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import firebase from 'firebase';
import { Auth } from "../providers/auth/auth";
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { ImageProvider } from "../providers/image-provider";
import { Network } from '@ionic-native/network';

import firebase from 'firebase';

import { OneSignal } from '@ionic-native/onesignal';
import { Market } from '@ionic-native/market';
import { Observable } from "rxjs";

import { SocialSharing } from '@ionic-native/social-sharing';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  name: any;
  role: any;
  points: any = 0;
  bussinessVerify: any;

  user: FirebaseObjectObservable<any>;
  userprofile: any;

  cameraOptions: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  uid: any;

  storageDirectory: string = '';
  imageURL: any;
  userDetails: any;
  requestingUser: any;
  requestCount: number = 0;
  rootPage: any;
  username: string;
  parkingDetails: any;
  acceptedRequestData: any;
  zone: NgZone;
  internetDisconnect: any;
  loading: any;
  directNotificationOpened: boolean = false;
  @ViewChild('nav') nav: NavController


  constructor(

    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
    private storage: Storage,
    // private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private auth: Auth,
    private afAuth: AngularFireAuth,
    private af: AngularFireDatabase,
    private imageSrv: ImageProvider,
    private event: Events,
    private network: Network,
    public loadingCtrl: LoadingController,
    private oneSignal: OneSignal,
    private screenOrientation: ScreenOrientation,
    public appCtrl: App,
    private market: Market,
    private http: Http,
    private socialSharing: SocialSharing





  ) {
    platform.ready().then(() => {

      splashScreen.hide();
      this.loading = this.loadingCtrl.create({
        content: 'Loading your app...'
      });

      this.loading.present();


      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

      let userData = firebase.database().ref('AppSettings');
      userData.child('Update').once("value", (snapshot) => {
        if (snapshot.val().severity == 1) {
          let confirm = this.alertCtrl.create({
            title: snapshot.val().message || 'Update Required',
            message: snapshot.val().description || 'Get the new app from app store to unlock new features.',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'EXIT',
                handler: () => {
                  platform.exitApp();
                }
              },
              {
                text: 'UPDATE',
                handler: () => {
                  this.market.open('id1316544233');
                  //yespat-app
                  platform.exitApp();
                }
              }
            ]
          });
          confirm.present();
        }
      })

      var notificationOpenedCallback = (jsonData) => {
        this.directNotificationOpened = true;
        if (this.loading) {
          this.loading.dismiss();
        }
        const authObserver = afAuth.authState.subscribe(user => {
          if (user) {
            this.storage.get('uid').then((response) => {
              let userData = firebase.database().ref('/userProfile/');
              userData.child(response).once("value", (snapshot) => {
                if(snapshot.val().user_role !== 'bussinesssUser') {
                  this.rootPage = 'PostFindspotPage';
                  this.performNotificationClickAction(jsonData);
                } else {
                  this.rootPage = 'BussinessAddMenuPage';
                  this.performNotificationClickAction(jsonData);
                }
              });
            });
          } else {
            this.rootPage = 'LoginPage';
          }
        });
      };

      window["plugins"].OneSignal
        .startInit('4a1163d9-1d7a-42d0-86f0-bc85a9621a3c', '66637562046')
        .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification)
        .handleNotificationOpened(notificationOpenedCallback)
        .handleNotificationReceived(function (jsonData) {
          //alert("Notification received:\n" + JSON.stringify(jsonData));
          console.log('didReceiveRemoteNotificationCallBack: ', jsonData);
        })
        .endInit();

      statusBar.styleDefault();

      this.network.onDisconnect().subscribe(() => {
        this.internetDisconnect = this.toastCtrl.create({
          message: 'Please connect to internet.',
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'X'
        });
        this.internetDisconnect.present();
      });

      this.network.onConnect().subscribe(() => {
        this.internetDisconnect.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Your internet is back. Reopen the app if data load fails.',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });

      this.event.subscribe('userLogin', (userInfo) => {
        console.log('userInfo', userInfo);
        this.name = userInfo.name;
        this.role = userInfo.user_role;
        this.points = userInfo.points;
        this.bussinessVerify = userInfo.bussiness_verify;
      })

      //this.geoFire = new GeoFire('');

      // this.userProfile.name = "user";
      this.storage.get('uid').then((response) => {
        console.log(123123, response)
        if (response == null) {
          if (this.loading) {
            this.loading.dismiss();
          }
          this.rootPage = 'LoginPage';
        } else {
          this.user = this.af.object('/businessProfile/' + response);
          this.user.subscribe((data) => {
            if (data.paymentSuccessUser) {
              let paymentDetails = data.paymentDetails ? data.paymentDetails : [];
              paymentDetails.push(data.paymentSuccessUser);
              let alert = this.alertCtrl.create({
                title: 'Payment Success',
                message: 'Payment successful from ' + data.paymentSuccessUser.name + ' of ' + data.paymentSuccessUser.points + ' points for menu item ' + this.jarvisMakeMeBold(data.paymentSuccessUser.itemName) + '.',
                buttons: ['OK']
              });
              alert.present();
              this.af.object('/businessProfile/' + response).update({ paymentSuccessUser: '', paymentDetails: paymentDetails }).then((response) => {
                console.log('cleaned Up');
              });
            }
          });

          // alert for the rewards
          // Check if current user has any rewards
          let userDataReward = this.af.object('/userProfile/' + response);
          userDataReward.subscribe((data) => {
            if (data.referralRewardData) {
              let alert = this.alertCtrl.create({
                title: 'Referral Reward',
                message: 'You have been rewarded 20 points from ' + data.referralRewardData.userName + ' sucessfull registration',
                buttons: ['OK']
              });
              alert.present();
              this.af.object('/userProfile/' + response).update({ referralRewardData: '' }).then((response) => {
                console.log('cleaned Up');
              });
            }
          });

          let userData = firebase.database().ref('/userProfile/');
          userData.child(response).once("value", (snapshot) => {

            console.log('value', snapshot.val());
            this.name = snapshot.val().name;
            this.role = snapshot.val().user_role;
            this.points = snapshot.val().points;
            this.userprofile = snapshot.val();
            this.bussinessVerify = snapshot.val().bussiness_verify;
            if (snapshot.val().profilePictureURL) {
              this.imageURL = snapshot.val().profilePictureURL;
            }
            const authObserver = afAuth.authState.subscribe(user => {
              console.log('user', user);
              if (this.loading) {
                this.loading.dismiss();
              }
              if (!this.directNotificationOpened) {
                if (user) {

                  this.menuCtrl.enable(true);

                  if (this.role !== 'bussinesssUser') {
                    console.log('Normal User');
                    this.rootPage = 'PostFindspotPage';
                    //this.rootPage = 'HistoryPage';
                  } else {
                    console.log('Bussiness User', response);
                    this.user = this.af.object('/businessProfile/' + response);
                    this.user.subscribe((data) => {
                      if (data.$value !== null) {
                        if (!data.bussiness_verify) {
                          this.rootPage = 'BussinessVerificationAlertPage';
                        } else {
                          this.rootPage = 'BussinessAddMenuPage';
                        }
                      } else {
                        this.rootPage = 'BussinessSignUpPage';
                      }
                    }, (error) => {
                      console.log('Error', error);
                    });
                  }

                  authObserver.unsubscribe();
                } else {
                  this.rootPage = 'LoginPage';
                  authObserver.unsubscribe();
                }
              }

            });

          })
        }

      })

      this.storage.get('uid').then((response) => {
        this.uid = response;
      })

      this.zone = new NgZone({});


      /*  const authObserver = afAuth.authState.subscribe(user => {
          if (user) {
            this.rootPage = 'PostFindspotPage';
            authObserver.unsubscribe();
          } else {
            this.rootPage = 'LoginPage';
            authObserver.unsubscribe();
          }
        });*/

    });
  }


  performNotificationClickAction(jsonData: any) {
    console.log('Jarvis has opened notification', jsonData.notification.payload.additionalData.DirectNavigatePage);
    if (jsonData.notification.payload.additionalData && jsonData.notification.payload.additionalData.DirectNavigatePage) {
      if (jsonData.notification.payload.additionalData.Root == true) {
        console.log('Jarvis has to set root');
        this.appCtrl.getRootNav().setRoot(jsonData.notification.payload.additionalData.DirectNavigatePage, { rootParams: jsonData.notification.payload.additionalData.rootParams });
      } else {
        console.log('Jarvis has to set root and then push');
        this.appCtrl.getRootNav().setRoot('PostFindspotPage').then(() => {
          this.appCtrl.getRootNav().push(jsonData.notification.payload.additionalData.DirectNavigatePage);
        });
      }
    }
  }

  jarvisMakeMeBold(name) {
    return '<strong>' + name + '</strong>'
  }


  onLogout() {
    console.log('logOut');
    this.menuCtrl.close();
    this.storage.clear();
    this.auth.logoutUser()
      .then(() => {
        this.nav.setRoot('LoginPage');
        // this.app.getRootNav().setRoot('LoginPage');
      })
    localStorage.clear();

  }

  goToMyBusiness() {
    console.log('nav', this.nav);
    this.menuCtrl.close();
    this.nav.setRoot('BussinessAddMenuPage');
  }

  goEditProfile() {
    console.log('nav', this.nav);
    this.menuCtrl.close();
    this.nav.setRoot('ProfileDetailsPage');
  }

  goToEditBusiness() {
    this.menuCtrl.close();
    this.nav.push('BussinessEditPage');
  }

  goHistoryPage() {
    this.menuCtrl.close();
    this.nav.setRoot('HistoryPage');
  }

  goPostaspot() {
    this.menuCtrl.close();
    this.nav.setRoot('PostFindspotPage');
  }

  referFriend() {
    this.menuCtrl.close();
    //this.nav.setRoot('PostFindspotPage');
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.loading.present();

    this.storage.get('uid').then((response) => {
      this.prepareRequest('http://yaspat.deapps.io:3002/users/api/share?uid=' + response, null, 'get').subscribe((data) => {
        console.log('Data =>>', JSON.parse(data._body));

        let responseData = JSON.parse(data._body)

        let options = {
          message: 'Check message',
          subject: 'Check subject',
          file: 'https://images.apple.com/itunes/images/og.jpg?201709191033',
          url: responseData.value,
        }

        if (this.loading) {
          this.loading.dismiss();
        }

        this.socialSharing.shareWithOptions(options).then(() => {
          // Sharing via email is possible
        }).catch(() => {
          // Sharing via email is not possible
          let toast = this.toastCtrl.create({
            message: 'Something went wrong.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });

      }, (error) => {
        alert('API Error');
        if (this.loading) {
          this.loading.dismiss();
        }

        let toast = this.toastCtrl.create({
          message: 'Something went wrong.',
          duration: 3000,
          position: 'top'
        });
        toast.present();

        console.log('Error =>>', error);
      });
    }, (error) => {
      if (this.loading) {
        this.loading.dismiss();
      }

      let toast = this.toastCtrl.create({
        message: 'Something went wrong.',
        duration: 3000,
        position: 'top'
      });
      toast.present();

      console.log('Storage Error =>>', error);
    });
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


