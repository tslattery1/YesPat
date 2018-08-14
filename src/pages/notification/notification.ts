import { ToastController } from 'ionic-angular';
import { Component, EventEmitter } from '@angular/core';
import { Usergrid } from "../../services/usergrid.service";
import { Storage } from "@ionic/storage";
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { PushNotification } from "../../services/push-notification.service";
import { OneSignal } from '@ionic-native/onesignal';

import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
  /*  outputs: [`notifCountEvent`]*/
})

export class NotificationPage {
  notifData: boolean = true;
  reject: boolean = false;
  publishers: any = [];
  notifCountEvent: any;
  notifCount: number = 0;
  username: string;
  parkingSpots: any;
  requesters: any = [];
  spotDetails: any = [];
  spotIds: any = [];
  requestingUserData: any = [];
  user: FirebaseListObservable<any>;
  uid: any;
  currentUser: any;

  constructor(
    private pushNotif: PushNotification,
    private storage: Storage,
    private navParams: NavParams,
    private navController: NavController,
    private alertCtrl: AlertController,

    private _http: Http,
    private af: AngularFireDatabase,
    private oneSignal: OneSignal,
    public toast: ToastController


  ) {

    this.storage.get('uid').then((uid) => {
      this.uid = uid;
      let userData = firebase.database().ref('/userProfile/');
      userData.child(uid).once("value", (snapshot) => {
        // console.log('value', snapshot.val());
        this.currentUser = snapshot.val();
      })
      //spot.publisherDetails.uid = response;
      //let key = this.spots.push(spot).key;
      this.user = this.af.list('/userProfile/' + uid + "/parkingDetails/");
      this.user.subscribe((userParkingDetails) => {
        // console.log('1111111 Change in parkingDetails==> ', this.spotIds, this.requestingUserData);
        if (userParkingDetails.length) {
          for (let i = 0; i < userParkingDetails.length; i++) {
            this.spotIds[i] = userParkingDetails[i].$value;
            //console.log(this.spotIds[i]);

            let userData = firebase.database().ref('/spots/' + this.spotIds[i] + '/requesterDetails/');
            userData.once("value", (snapshot) => {
              // console.log('initial each', snapshot.val());
              if (snapshot.val() != null) {
                Object.keys(snapshot.val()).forEach((key) => {
                  let primaryKey = key;
                  var value = snapshot.val()[key];
                  console.log('primaryKey ', primaryKey);
                  Object.keys(value).forEach((key) => {
                    let secondaryKey = key;
                    console.log('secondaryKey ', secondaryKey);
                    let getData = firebase.database().ref('/spots/' + this.spotIds[i] + '/requesterDetails/' + primaryKey);
                    getData.child(secondaryKey).once("value", (snapshot) => {
                      console.log('each', snapshot.val());
                      if (snapshot.val().status == 'Pending') {
                        let data = snapshot.val();
                        data.mykey = secondaryKey;
                        data.spotId = this.spotIds[i];
                        this.requestingUserData.push(data);
                      }
                    })
                  });
                });
                // let key = Object.keys(snapshot.val());
                // console.log('earch', key);
              }
              // console.log('snapshot', snapshot.val());

            })

            // this.af.list('/spots/' + this.spotIds[i] + '/requesterDetails/')
            //   .subscribe((requesterDetails) => {
            //     console.log('1111111 Change in requesterDetails==> ', requesterDetails);
            // if (requesterDetails.length) {

            //   for (let j = 0; j < requesterDetails.length; j++) {

            //     let k = 0;
            //     while (Object.keys(requesterDetails[j])[k] != undefined) {
            //       var firstKey = Object.keys(requesterDetails[j])[k];
            //       if (requesterDetails[j][firstKey].status == 'Pending') {
            //         console.log('each', requesterDetails[j][firstKey]);
            //         this.notifData = true;
            //         requesterDetails[j][firstKey].mykey = firstKey;
            //         requesterDetails[j][firstKey].spotId = this.spotIds[i];
            //         this.requestingUserData.push(requesterDetails[j][firstKey]);
            //       }


            //       k++;

            //     }

            //   }
            //   console.log('Data', this.requestingUserData);
            //   if (this.requestingUserData.length == 0) {
            //     this.notifData = false;

            //   }
            //   else {
            //     this.notifData = true;

            //   }
            // }


            // })
          }


        }
        else {
          this.notifData = false;
        }


        //console.log(this.spotDetails);

      })


      // this.navCtrl.push('HistoryPage');

    })

  }



  acceptRequest(requester, index) {
    console.log('Requester', requester);
    let userData = firebase.database().ref('/spots/' + requester.spotId + '/publisherDetails/');
    userData.once("value", (snapshot) => {
      console.log('snapshot.val()', snapshot.val());
      if (snapshot.val() && snapshot.val().status) {
        let options: any = {
          message: 'You can not accept this parking as you has already accepted this location parking for another user.',
          duration: 2000,
          position: 'top'
        }
        let toast = this.toast.create(options);
        toast.present();
      } else {
        //this.requestingUserData.splice(index,index+1);

        //spot.publisherDetails.uid = response;
        //let key = this.spots.push(spot).key;
        this.user = this.af.list('/userProfile/' + this.uid + "/parkingDetails/");
        this.user.subscribe((userParkingDetails) => {
          for (let i = 0; i < userParkingDetails.length; i++) {
            this.spotIds[i] = userParkingDetails[i].$value;
            //console.log(this.spotIds[i]);

            this.af.list('/spots/' + this.spotIds[i] + '/requesterDetails/')
              .subscribe((requesterDetails) => {
                if (requesterDetails.length) {
                  for (let j = 0; j < requesterDetails.length; j++) {
                    let k = 0;
                    while (Object.keys(requesterDetails[j])[k] != undefined) {
                      var firstKey = Object.keys(requesterDetails[j])[k];
                      if (requesterDetails[j][firstKey].uid == requester.uid && firstKey == requester.mykey) {
                        this.af.object('/spots/' + this.spotIds[i] + '/requesterDetails/' + requester.uid + '/' + firstKey).update({ status: 'Accepted' })
                          .then((response) => {
                            // console.log("all good bruh");
                            this.af.object('/spots/' + this.spotIds[i] + '/publisherDetails/').update({ status: 'Accepted' })
                              .then((response) => {
                                console.log("all good bruh");
                              })
                            let options: any = {
                              message: requester.name + ' Parking aceepted successfully.',
                              duration: 2000,
                              position: 'top'
                            }
                            console.log('ToastOptions', options);
                            let toast = this.toast.create(options);
                            toast.present();
                            this.navController.setRoot('PostFindspotPage');

                            var notificationObj = {
                              "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
                              headings: { "en": 'Parking Accepted' },
                              "contents": { "en": this.currentUser.name + ' has Accepted your spot request.' },
                              data: { Root: true, DirectNavigatePage: 'HistoryPage', rootParams: 'Requested' },
                              include_player_ids: [requester.playerId]
                            };

                            console.log('Hello One Signal object', notificationObj);

                            window["plugins"].OneSignal.postNotification(notificationObj,
                              function (successResponse) {
                                // alert(successResponse);
                              },
                              function (failedResponse) {
                                //  console.log("Notification Post Failed: ", failedResponse);
                                // alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
                              }
                            );

                          })
                          .catch(error => {
                            let options: any = {
                              message: 'Something went wrong.',
                              duration: 2000,
                              position: 'top'
                            }
                            let toast = this.toast.create(options);
                            toast.present();
                          });
                        // let message = {
                        //   "username": requester.name,
                        //   "registrationId": requester.registrationId,
                        //   "type": "acceptRequest"
                        // }
                        // this.pushNotif.sendPush(message).subscribe((response) => {
                        //   //alert(JSON.stringify(response));
                        // },
                        //   (error) => {
                        //     // alert(error);
                        //   })

                      }

                      k++;

                    }

                  }
                }

              })
          }

        })
        this.requestingUserData.splice(index, index + 1);

      }
    })

    // let myAlert = this.alertCtrl.create({
    //   title: 'You accepted the parking request of ',
    //   subTitle: requester.name,
    //   buttons: ['OK']
    // });

    // myAlert.present();


  }


  rejectRequest(requester, i) {

    this.af.object('/spots/' + requester.spotId + '/requesterDetails/' + requester.uid + '/' + requester.mykey).update({ status: 'Rejected' }).then((response) => {
      console.log("response");
      //this.requestingUserData.splice(i,i+1);
      let options: any = {
        message: requester.name + ' Parking Rejected successfully.',
        duration: 2000,
        position: 'top'
      }
      let toast = this.toast.create(options);
      toast.present();
      // this.navController.setRoot('PostFindspotPage');
    })

    // this.requestingUserData.splice(i, i + 1);

    // let alert = this.alertCtrl.create({
    //   title: 'You rejected the parking request of ',
    //   subTitle: requester.name,
    //   buttons: ['OK']
    // });
    // alert.present();
    var notificationObj = {
      "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
      headings: { "en": 'Parking Rejected' },
      "contents": { "en": this.currentUser.name + ' has rejected your spot request.' },
      data: { Root: true, DirectNavigatePage: 'HistoryPage', rootParams: 'Requested' },
      include_player_ids: [requester.playerId]
    };

    console.log('Hello One Signal object', notificationObj);

    window["plugins"].OneSignal.postNotification(notificationObj,
      function (successResponse) {
        // alert(successResponse);
      },
      function (failedResponse) {
        //  console.log("Notification Post Failed: ", failedResponse);
        // alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
      }
    );
    this.navController.setRoot('PostFindspotPage');
  }

}
