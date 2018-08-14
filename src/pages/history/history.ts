import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
/*import { HistoryDetailPage } from "./history-detail/history-detail";*/

import { Storage } from "@ionic/storage";
import { IonicPage, AlertController, NavParams, ToastController, ModalController, App } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  history: string;
  showNoRequesters: boolean = false;
  spotDetails: any = [];
  user: FirebaseListObservable<any>;
  //spots: FirebaseListObservable<any>;
  publishers: any;

  //spots: any;
  created: any;
  toggleDetails: boolean = false;
  spotIds: any = [];
  requestingUserData: any = [];
  uid: any;
  constructor(
    public navCtrl: NavController,

    private storage: Storage,
    private af: AngularFireDatabase,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    public toast: ToastController,
    private oneSignal: OneSignal,

  ) {
    this.history = "spot";

    this.storage.get('uid').then((response) => {
      //spot.publisherDetails.uid = response;
      //let key = this.spots.push(spot).key;
      this.user = this.af.list('/userProfile/' + response + "/parkingDetails/");
      this.user.subscribe((response) => {
        // this.spotDetails = [];
        for (let i = 0; i < response.length; i++) {
          this.spotIds[i] = response[i].$value;

          firebase.database().ref('/spots/' + this.spotIds[i])
            .once("value", (snapshot) => {
              if (snapshot.val()) {
                let hold = snapshot.val();
                console.log(1, hold);
                hold.starttime = moment(hold.starttime, "hh:mm A");
                hold.starttime = moment(hold.starttime).format('LT');
                hold.endtime = moment(hold.endtime, "hh:mm A");
                hold.endtime = moment(hold.endtime).format('LT');
                console.log(2, hold);
                this.spotDetails.push(hold);
                this.showNoRequesters = true;

              }

            })
        }

      })

      // this.navCtrl.push('HistoryPage');

    })

    this.storage.get('uid').then((uid) => {
      this.uid = uid;
      //spot.publisherDetails.uid = response;
      //let key = this.spots.push(spot).key;
      this.user = this.af.list('/userProfile/' + uid + "/requestedSpotDetails/", {
        /* query: {
           limitToLast: 10,
         }*/
      });
      this.user.subscribe((userParkingDetails) => {
        console.log('555555555555');
        let actualIndex = 0;
        for (let i = 0; i < userParkingDetails.length; i++) {
          this.spotIds[i] = userParkingDetails[i].$value;

          let userData = firebase.database().ref('/spots/' + this.spotIds[i] + '/requesterDetails/');
          userData.once("value", (snapshot) => {
            console.log('initial each', snapshot.val());
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
                    let data = snapshot.val();
                    if (this.uid == data.uid) {
                      actualIndex++;
                      data.indexHold = actualIndex;
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
          //     //this.requestingUserData = [];
          //     if (requesterDetails.length) {
          //       for (let j = 0; j < requesterDetails.length; j++) {

          //         let k = 0;
          //         while (Object.keys(requesterDetails[j])[k] != undefined) {
          //           var firstKey = Object.keys(requesterDetails[j])[k];
          //           actualIndex ++;
          //           requesterDetails[j][firstKey].indexHold = actualIndex;
          //           console.log('++++++', requesterDetails[j][firstKey]);
          //           this.requestingUserData.push(requesterDetails[j][firstKey]);
          //           k++;

          //         }
          //       }
          //     }

          //   })
        }

      })

    })

  }

  public ngOnInit() {
    console.log('Jarvis root params', this.navParams.get('rootParams'));
    if (this.navParams.get('rootParams') == 'Requested') {
      this.history = "request";
    }
  }

  showData() {
    console.log(this.spotDetails);

  }

  historyDetail(publisherDetails, date, requester) {
    this.navCtrl.push('HistoryDetailPage', {
      "publisherDetails": publisherDetails,
      "publishedOn": date,
      "requesterDetails": requester
    });
  }

  toggleHistory() {
    this.toggleDetails = !this.toggleDetails;

  }

  deleteSpot(spot, i, slidingItem) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete spot',
      message: 'If you delete this spot, you would loose all the related information for this spot.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            slidingItem.close();
          }
        },
        {
          text: 'Delete this spot',
          handler: () => {
            this.af.object('/spots/' + spot.$key).remove().then((response) => {
              slidingItem.close();
              this.spotDetails.splice(i, i + 1);
              //this.requestingUserData.splice(i,i+1);
            })

          }
        }
      ]
    });
    alert.present();


  }

  ClaimPoints(requester) {
    console.log('Requester', requester.indexHold - 1, this.spotIds, this.spotIds[requester.indexHold - 1]);
    let prompt = this.alertCtrl.create({
      title: 'Parking Received ?',
      message: "Did you got the parking ?",
      inputs: [
        {
          name: 'comment',
          placeholder: 'comment'
        },
      ],
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked', data);
            if (data.comment != '') {
              let spotData = firebase.database().ref('/spots/' + this.spotIds[requester.indexHold - 1] + '/requesterDetails/');
              spotData.child(this.uid).once("value", (snapshot) => {
                let key = Object.keys(snapshot.val());
                console.log('Requester user', key);
                console.log('Requester user2', key[0]);
                let spotUpdateData = firebase.database().ref('/spots/' + this.spotIds[requester.indexHold - 1] + '/requesterDetails/' + this.uid);
                spotUpdateData.child(key[0]).update({ parkingFlow: 'UnSuccess', parkingFlowComment: data.comment });
                let options: any = {
                  message: 'Parking flow updated successfully.',
                  duration: 2000,
                  position: 'top'
                }
                let toast = this.toast.create(options);
                toast.present();
                this.navCtrl.setRoot('PostFindspotPage');
              })
            } else {
              let options: any = {
                message: 'Please add the reason for parking not received.',
                duration: 2000,
                position: 'top'
              }
              let toast = this.toast.create(options);
              toast.present();
            }
          }
        },
        {
          text: 'Yes',
          handler: data => {
            console.log('Saved clicked', data);
            let spotData = firebase.database().ref('/spots/' + this.spotIds[requester.indexHold - 1] + '/requesterDetails/');
            spotData.child(this.uid).once("value", (snapshot) => {
              let key = Object.keys(snapshot.val());
              console.log('Requester user', key);
              console.log('Requester user2', key[0]);
              let spotUpdateData = firebase.database().ref('/spots/' + this.spotIds[requester.indexHold - 1] + '/requesterDetails/' + this.uid);
              spotUpdateData.child(key[0]).update({ parkingFlow: 'Success', parkingFlowComment: data.comment != '' ? data.comment : '' });
            })
            let userData = firebase.database().ref('/userProfile/');
            userData.child(this.uid).once("value", (snapshot) => {
              console.log('Current user', snapshot.val());
              let currentUser = snapshot.val();
              let creditPoint = currentUser.points + 10;
              userData.child(this.uid).update({ points: creditPoint });

              let payUserData = firebase.database().ref('/userProfile/');
              userData.child(requester.payPointsUid).once("value", (snapshotData) => {
                console.log('Payee user', snapshotData.val());
                let payeeUser = snapshotData.val();
                let creditPoint = payeeUser.points + 20;
                userData.child(requester.payPointsUid).update({ points: creditPoint });
                var notificationObj = {
                  "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
                  headings: { "en": 'Points Credited' },
                  "contents": { "en": '20 points has been credited for your parking flow completion. Claimed by ' + currentUser.name },
                  include_player_ids: [payeeUser.playerId]
                };

                console.log('Hello One Signal object', notificationObj);

                let alert = this.alertCtrl.create({
                  title: 'Points Credited',
                  subTitle: '10 points has been credited for ' + payeeUser.name + ' parking claimed by you.',
                  buttons: ['OK']
                });
                alert.present();

                this.navCtrl.setRoot('PostFindspotPage');

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
            });
          }
        }
      ]
    });
    prompt.present();
  }

  //  calculateAndDisplayRoute(directionsService, directionsDisplay) {
  //   console.log('directionsService ', directionsService, directionsDisplay);
  //   directionsService.route({
  //     origin: this.currentLocation,
  //     destination: this.destinationLocation,
  //     travelMode: 'DRIVING'
  //   }, function(response, status) {
  //     if (status === 'OK') {
  //       directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }

}
