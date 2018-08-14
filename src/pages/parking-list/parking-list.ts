import { Component, OnInit } from '@angular/core';

/*import { NotificationPage } from "../notification/notification";*/
import { NavController, NavParams, AlertController } from "ionic-angular";

import { Storage } from "@ionic/storage";
import { _ } from 'underscore';
import * as moment from 'moment';
import { IonicPage, ModalController, App } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { PushNotification } from "../../services/push-notification.service";
import { OneSignal } from '@ionic-native/onesignal';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-parking-list',
  templateUrl: 'parking-list.html',
})

export class ParkingListPage implements OnInit {
  spotData: boolean = true;
  submitRequest: boolean = false;
  spots: any = [];
  spotKeys: any = [];
  moment: any;
  username: string;
  uid: any;
  user: FirebaseListObservable<any>;
  requesterDetails: any;

  latitude: any;
  longitude: any;
  currentLocation: any;
  destinationLocation: any;
  geocoder: any;

  constructor(
    private navCtrl: NavController,
    private navparams: NavParams,
    private pushNotif: PushNotification,
    private storage: Storage,
    private alertCtrl: AlertController,
    private af: AngularFireDatabase,
    private oneSignal: OneSignal,
    private geolocation: Geolocation,
    private modalCtrl: ModalController,
    public appCtrl: App,


  ) { }


  ngOnInit() {
    this.storage.get('uid').then((uid) => {
      this.uid = uid;
      this.af.object('/userProfile/' + this.uid)
        .subscribe((response) => {
          console.log('User data', response);
          if (!response.contact) {
            response.contact = "Not Available";
          }
          if (!response.registrationId) {
            response.registrationId = "123456789";
          }
          this.requesterDetails = {
            "name": response.name,
            "contact": response.contact,
            "email": response.email,
            "registrationId": response.registrationId,
            "uid": response.$key,
            "requestedSpotDetails": response.requestedSpotDetails ? response.requestedSpotDetails : 'requestedSpotDetails',
            "status": 'Pending',
            "requestedTime": "requestedTime",
            "requestedDate": "requestedDate",
            "requestLocation": "requestLocation",
            "playerId": response.playerId,
            "payPointsUid": "payPointsUid",
            "phoneNumber": response.phoneNumber,
          }

        })

      this.spotKeys = this.navparams.get('spots');
      if (this.spotKeys) {
        console.log('this.spotKeys', this.spotKeys);
        this.spotKeys.forEach((element, index) => {
          console.log('element', element);
          this.af.object('/spots/' + element).subscribe((spotData) => {
            if (spotData.$exists() && spotData.publisherDetails.uid != this.uid && spotData.publisherDetails.status !== 'Accepted') {
              var mStart = moment.utc(spotData.date);
              console.log('Date', moment(mStart).format('L'), moment().format('L'));
              console.log('desiredtime', this.navparams.get('desiredtime'), spotData.endtime);

              var startTime = moment(spotData.endtime, "HH:mm");
              console.log('startTime', startTime);
              var endTime = moment(this.navparams.get('desiredtime'), "HH:mm");
              console.log('endTime', endTime);
              var dur = moment.duration(endTime.diff(startTime));
              console.log('dur min', dur.minutes());
              console.log('dur hr', dur.hours());
              //console.log('Time calculation', moment(spotData.end).subtract(45, 'minutes').from(moment(this.navparams.get('desiredtime'))));
              if (moment(mStart).format('L') == moment().format('L')) {
                if (dur.hours() == 0 && Math.abs(dur.minutes()) <= 30) {
                  //console.log('mStart=>>>>>>>>>>>', moment(mStart).format('L'), mStart);
                  //var mEnd = moment.utc(new Date());
                  //console.log('mEnd=>>>>>>>>>>>', mEnd);
                  if (this.requesterDetails.requestedSpotDetails !== 'requestedSpotDetails') {
                    //console.log('Spot Data OnInit', this.spotKeys[i], this.requesterDetails.requestedSpotDetails);
                    let keys = this.requesterDetails.requestedSpotDetails;
                    let array: any = [];
                    console.log('keys', keys);
                    Object.keys(keys).map((objectKey, index) => {
                      var value = keys[objectKey];
                      console.log('Each', value);
                      array.push(value);
                      // if(element !== value) {
                      //   console.log('spotData', spotData);
                      //   this.spots.push(spotData);
                      // }
                    });
                    console.log('Array', array);
                    let data = array.filter((res) => {
                      if (res !== element) {
                        return true;
                      } else {
                        return false;
                      }
                    })

                    console.log('Data', data);
                    if (data) {
                      spotData.starttime = moment(spotData.starttime, "hh:mm A");
                      spotData.starttime = moment(spotData.starttime).format('LT');
                      spotData.endtime = moment(spotData.endtime, "hh:mm A");
                      spotData.endtime = moment(spotData.endtime).format('LT');
                      this.spots.push(spotData);
                    }
                  } else {
                    spotData.starttime = moment(spotData.starttime, "hh:mm A");
                    spotData.starttime = moment(spotData.starttime).format('LT');
                    spotData.endtime = moment(spotData.endtime, "hh:mm A");
                    spotData.endtime = moment(spotData.endtime).format('LT');
                    this.spots.push(spotData);
                  }
                }
              }
            }

          })
        });

      }
      else {
        this.spotData = false;
      }

      this.latitude = this.navparams.get('latitude');
      this.longitude = this.navparams.get('longitude');
      this.currentLocation = this.navparams.get('currentLocation');
    })

    this.geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then((position) => {

      //this.latitude = position.coords.latitude;
      // this.longitude = position.coords.longitude;
      console.log('Jarvis lat and lang' + this.latitude + ' in ' + this.longitude)
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);


      this.getMapDetails(latLng).then((data: any) => {
        console.log('Jarvis Address', data);
        //this.currentLocation = data;
      }).catch((e) => {
        console.log('sorry Jarvis cant mapp anything');
      });


      // this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
      //   .then((result: NativeGeocoderReverseResult) => {
      //     this.currentLocation = result.street + "," + result.countryCode;
      //     console.log('The address is ' + result.street + ' in ' + result.countryCode)
      //   }
      //   )
      //   .catch((error: any) => console.log(error));
    }).catch((error) => {
      console.log('Error getting location', error);
      this.latitude = 19.0691322;
      this.longitude = 72.9971602;
      console.log('Jarvis lat and lang' + this.latitude + ' in ' + this.longitude)
      let latLng = new google.maps.LatLng(this.latitude, this.longitude);


      this.getMapDetails(latLng).then((data: any) => {
        console.log('Jarvis Address', data);
        this.currentLocation = data;
      }).catch((e) => {
        console.log('sorry Jarvis cant mapp anything');
      });
    });
  }

  getMapDetails(latLng) {

    return new Promise((resolve, reject) => {
      this.geocoder = new google.maps.Geocoder();
      let mapRespone: any = {};

      this.geocoder.geocode({ 'latLng': latLng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            //formatted address
            console.log('Address', results[0].formatted_address);
            mapRespone = results[0].formatted_address;
            resolve(mapRespone);

          } else {
            reject('No results found');
          }
        } else {
          reject(status);
        }
      });
    });
  }

  requestSpot(spot, i) {
    this.requesterDetails.requestedTime = spot.endtime;
    let date = new Date();
    this.requesterDetails.requestedDate = date.toString();
    this.requesterDetails.requestLocation = spot.parkLocation;
    this.requesterDetails.payPointsUid = spot.publisherDetails.uid;
    this.requesterDetails.publisherName = spot.publisherDetails.name;
    this.requesterDetails.publisherContact = spot.publisherDetails.phoneNumber;


    console.log(1, spot);
    console.log(2, spot.$key, this.requesterDetails.uid, this.requesterDetails);
    this.af.list('/spots/' + spot.$key + '/requesterDetails/' + this.requesterDetails.uid).push(this.requesterDetails)
      .then((response) => {
        console.log(2);
        console.log("all good");
        this.af.list('/userProfile/' + this.uid + '/requestedSpotDetails').push(spot.$key)
          .then((response) => {
            console.log("all good");
            // this.navCtrl.pop();
          }, (error) => {
            console.log(error);
          })

      }, (error) => {
        console.log(error);
      })


    let alert = this.alertCtrl.create({
      title: 'Your request has been submitted successfully',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot('PostFindspotPage');
    // this.spots.splice(i, i + 1);
    // let message = {
    //   "username": spot.publisherDetails.name,
    //   "registrationId": spot.publisherDetails.registrationId,
    //   "type": "requestSpot"
    // }


    // this.pushNotif.sendPush(message).subscribe((response) => {
    //   //alert(JSON.stringify(response));
    // },
    //   (error) => {
    //     // alert(error);
    //   })

    console.log('Spot Details', spot);

    var notificationObj = {
      "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
      headings: { "en": 'Parking Request' },
      "contents": { "en": this.requesterDetails.name + ' has request to your spot.' },
      data: { Root: false, DirectNavigatePage: 'NotificationPage' },
      include_player_ids: [spot.publisherDetails.playerId]
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

  }

  navigateLocation(end) {
    let modal = this.modalCtrl.create('LocationPage', { end: end, currentLocation: this.currentLocation, lat: this.latitude, lang: this.longitude });
    modal.present();

    // console.log('Start Location ', this.currentLocation);
    // console.log('End Location', end);
    // this.destinationLocation = end;
    // var directionsService = new google.maps.DirectionsService;
    // var directionsDisplay = new google.maps.DirectionsRenderer;
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 7,
    //   center: {lat: this.latitude, lng: this.longitude}
    // });
    // directionsDisplay.setMap(map);
    // this.calculateAndDisplayRoute(directionsService, directionsDisplay);
  }

  public getTime(time) {
    console.log('Time to cal', time);
    return 0;
  }

}

