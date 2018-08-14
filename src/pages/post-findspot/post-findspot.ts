import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms/forms";
import { NavController, Platform } from "ionic-angular";
import { Http, Headers } from '@angular/http';

import { Storage } from "@ionic/storage";
// import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
// import { LocalNotifications } from '@ionic-native/local-notifications';
//import { MySharedService } from "../../app/my-shared-service";
import { IonicPage, AlertController, Events, LoadingController } from 'ionic-angular';




import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
/*import GeoFire from 'geofire';*/
declare var GeoFire: any;
import firebase from 'firebase';
import { Badge } from '@ionic-native/badge';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable } from "rxjs";

import * as moment from 'moment';

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-post-findspot',
  templateUrl: 'post-findspot.html',
  providers: [AngularFireDatabase] // NativeGeocoder
})

export class PostFindspotPage implements OnInit {
  postForm: FormGroup;
  @ViewChild('postForm') form;
  sametime: boolean = false;
  nearBySpotsKeys: any = [];
  requestingUserData: any = [];
  spotIds: any = [];
  uid: any;
  toggleSubmit: boolean = false;
  // notifCount: number = 0;
  // songs: FirebaseListObservable<any>;
  spots: FirebaseListObservable<any>;
  //user: FirebaseListObservable<any>;
  user: FirebaseObjectObservable<any>;
  userProfile: any;
  //user: any;
  autocompleteItems: any;
  autocomplete: any;
  currentAutocomplete: any;
  acService: any;
  placesService: any;
  spotDetails: any = [
    { "parkLocation": "", "endtime": "", "uuid": "" }
  ];
  data: any;
  notifCounter: number;
  desiredLocation: any;
  desiredTime: any;
  requesters: any = [];
  parkingSpots: any;
  currentLocation: string;
  geocoder: any;
  longitude: any;
  latitude: any;

  postfindSpot;
  nearbySpots: any;
  username: string;
  notifCount: number = 0;
  dontShowPredictions: boolean = false;
  dontShowCurrentPredictions: boolean = false;
  temp: any;
  date: any;
  findForm: FormGroup;
  loading: any;


  constructor(
    private navCtrl: NavController,
    private http: Http, 
    private storage: Storage,
    // private nativeGeocoder: NativeGeocoder,
    // private localNotifications: LocalNotifications,

    private alertCtrl: AlertController,
    private af: AngularFireDatabase,
    private platform: Platform,
    private geolocation: Geolocation,
    private badge: Badge,
    private event: Events,
    public loadingCtrl: LoadingController


    /*    private geoFire :GeoFire*/

  ) {
    // this.customValidator = this.customValidator.bind(this);

    this.postForm = new FormGroup({
      carInfo: new FormControl('', [Validators.required, this.NoWhitespaceValidator]),
      parkLocation: new FormControl('', [Validators.required, this.NoWhitespaceValidator]),
      starttime: new FormControl('', Validators.required),
      endtime: new FormControl('', Validators.required)
    }, customValidator)

    function customValidator(g: FormGroup) {
      return (parseFloat(g.get('endtime').value) - parseFloat(g.get('starttime').value)) >= 1 ? null : { isEqual: true };
    }

    this.findForm = new FormGroup({
      currentLocation: new FormControl('', [Validators.required, this.NoWhitespaceValidator]),
      parkLocation: new FormControl('', [Validators.required, this.NoWhitespaceValidator]),
      desiredtime: new FormControl('', Validators.required),

    })




    this.storage.get('uid').then((response) => {

      this.user = this.af.object('/userProfile/' + response);

      this.user
        .subscribe((response) => {
          this.userProfile = response;

        })


    })

    this.date = new Date();

    this.spots = af.list('/spots');


    // this.geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then((position) => {

    //   this.latitude = position.coords.latitude;
    //   this.longitude = position.coords.longitude;
    //   console.log('Jarvis lat and lang' + this.latitude + ' in ' + this.longitude)
    //   let latLng = new google.maps.LatLng(this.latitude, this.longitude);


    //   this.getMapDetails(latLng).then((data: any) => {
    //     console.log('Jarvis Address', data);
    //     this.currentLocation = data;
    //   }).catch((e) => {
    //     console.log('sorry Jarvis cant mapp anything');
    //   });


    //   // this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
    //   //   .then((result: NativeGeocoderReverseResult) => {
    //   //     this.currentLocation = result.street + "," + result.countryCode;
    //   //     console.log('The address is ' + result.street + ' in ' + result.countryCode)
    //   //   }
    //   //   )
    //   //   .catch((error: any) => console.log(error));
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    this.postfindSpot = "postaspot";


  }
  ionViewWillEnter() {

    this.storage.get('uid').then((uid) => {
      this.uid = uid;
      //spot.publisherDetails.uid = response;
      //let key = this.spots.push(spot).key;
      this.af.list('/userProfile/' + uid + "/parkingDetails/")
        .subscribe((userParkingDetails) => {
          this.notifCount = 0;
          for (let i = 0; i < userParkingDetails.length; i++) {
            this.spotIds[i] = userParkingDetails[i].$value;


            this.af.list('/spots/' + this.spotIds[i] + '/requesterDetails/')
              .subscribe((requesterDetails) => {
                if (requesterDetails.length) {
                  let notify: any = 0;
                  for (let j = 0; j < requesterDetails.length; j++) {

                    let k = 0;
                    while (Object.keys(requesterDetails[j])[k] != undefined) {
                      var firstKey = Object.keys(requesterDetails[j])[k];
                      if (requesterDetails[j][firstKey].status == 'Pending') {
                        this.requestingUserData.push(requesterDetails[j][firstKey]);
                        notify++;
                        console.log('Jarvis notify count', notify);
                      }

                      k++;

                    }
                  }
                  console.log('Jarvis Final notify count', notify);
                  this.notifyPromisr(notify, 1);
                }
                else {
                  this.badge.clear();
                  // this.notifyPromisr(0, 2);

                }

              })
          }

        })

    })


  }

  ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.currentAutocomplete = {
      query: ''
    }


    // Check the user subscription status
    this.storage.get('uid').then((uid) => {
      let userData = firebase.database().ref('/userProfile/');
      userData.child(uid).once("value", (snapshot) => {
        if (snapshot.val().subscription == false) {
          this.navCtrl.setRoot('SubscriptionPage', { subscriptionType: 'user', uid: uid });
        } else {
          this.prepareRequest('http://yaspat.deapps.io:3002/users/get_agreement', `agreement_id=${snapshot.val().subscription}`, 'post').subscribe((data) => {
            let agreementDetails = JSON.parse(data._body);
            console.log('Agreement Details', agreementDetails);
            if (agreementDetails.state !== 'Active') {
              this.navCtrl.setRoot('SubscriptionPage', { subscriptionType: 'user', uid: uid });
            } else {
              console.log('Jarvis look every thing fine parking page');
            }
          });
        }
      });
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

  notifyPromisr(notify, i) {
    console.log('Promise', notify, i);

    return new Promise((resolve, reject) => {
      this.notifCount = this.notifCount + notify;
      this.badge.set(this.notifCount);
      console.log('Promise notify count', this.notifCount);
      resolve();
    })
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

  public NoWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  // private customValidator(control: FormControl) {
  //   // check if control is equal to the password1 control
  //   console.log('qsdwdqwdqw', control);
  //   if (this.postForm) {
  //     console.log('qsdwdqwdqw', this.postForm.controls['endtime'].value, this.postForm.controls['starttime'].value);
  //     return (parseFloat(this.postForm.controls['endtime'].value) - parseFloat(this.postForm.controls['starttime'].value)) >= 1 ? null : { isEqual: true };

  //   }

  // }


  updateSearch() {
    this.dontShowPredictions = false;
    // console.log('modal > updateSearch');
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query,
      componentRestrictions: {}
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      //dontShowPredictions = false;
      // console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];
      if (status != 'ZERO_RESULTS' && predictions) {
        predictions.forEach(function (prediction) {
          self.autocompleteItems.push(prediction);
        });

      }
      else {
        self.dontShowPredictions = true;
      }

    });
  }

  updateCurrentSearch() {
    this.dontShowCurrentPredictions = false;
    // console.log('modal > updateSearch');
    if (this.currentAutocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.currentAutocomplete.query,
      componentRestrictions: {}
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      //dontShowPredictions = false;
      // console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];
      if (status != 'ZERO_RESULTS' && predictions) {
        predictions.forEach(function (prediction) {
          self.autocompleteItems.push(prediction);
        });

      }
      else {
        self.dontShowCurrentPredictions = true;
      }

    });
  }

  chooseItem(item) {
    this.autocomplete.query = item.description;
    this.dontShowPredictions = true;
  }

  chooseCurrentItem(item) {
    this.currentAutocomplete.query = item.description;
    this.dontShowCurrentPredictions = true;
  }

  // hidePredictions() {
  //   this.dontShowPredictions = true;

  // }
  dismiss() {
    this.autocomplete.query = '';
    this.dontShowPredictions = true;
  }

  currentdismiss() {
    this.currentAutocomplete.query = '';
    this.dontShowCurrentPredictions = true;
  }

  postFormSubmit(form: NgForm) {
    console.log('POST FORM', form);
    this.loading = this.loadingCtrl.create({
      content: 'Posting your spot...'
    });
    this.loading.present();
    let spot = form.value;
    let date = new Date();
    spot.date = date.toString();
    var geocoder = new google.maps.Geocoder();
    let address = this.postForm.get('parkLocation').value;
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let location = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() };
        console.log('Location', location);
        spot.location = {
          latitude: location.latitude,
          longitude: location.longitude
        }
        spot.publisherDetails = {
          "address": "address",
          "contact": "contact",
          "email": "email",
          "name": "name",
          "uid": "uid",
          "playerId": "playerId"
        }
        if (this.userProfile.address) {
          spot.publisherDetails.address = this.userProfile.address;
        }

        if (this.userProfile.phoneNumber) {
          spot.publisherDetails.phoneNumber = this.userProfile.phoneNumber

        }

        spot.publisherDetails.email = this.userProfile.email
        spot.publisherDetails.name = this.userProfile.name
        spot.publisherDetails.playerId = this.userProfile.playerId
        this.storage.get('uid').then((uid) => {

          var userData = firebase.database().ref('/userProfile/');
          userData.child(uid + "/parkingDetails/").once("value", (snapshot) => {
            if (snapshot.val()) {
              let currentTime: any = new Date()
              console.log('currentTime=>>>>>>>>>>>', currentTime);

              var startdatetime: any = new Date(snapshot.val().lastParkingTime);
              console.log('startdatetime =>>>>>>>>>>>', startdatetime);
              // var enddatetime = currentTime.toString();
              // Parse input
              var mStart = moment.utc(startdatetime);
              console.log('mStart=>>>>>>>>>>>', mStart);
              var mEnd = moment.utc(currentTime);
              console.log('mEnd=>>>>>>>>>>>', mEnd);
              // Calculate difference and create duration
              var dur = moment.duration(mEnd.diff(mStart));
              // Uncomment if you comment the bellow code.
              // this.addParking(spot, uid, location);


              // Logic comment if want to stop one hour restriction.

              if (dur.hours() == 0) {
                if (this.loading) {
                  this.loading.dismiss();
                }
                let remainTime = 60 - dur.minutes();
                let alert = this.alertCtrl.create({
                  title: 'You can post next parking spot after ' + remainTime + ' minutes',
                  buttons: ['OK']
                });
                alert.present();
              } else {
                this.addParking(spot, uid, location);
              }
            } else {
              this.addParking(spot, uid, location);
            }
          });


        })

      } else {
        if (this.loading) {
          this.loading.dismiss();
        }
        let alert = this.alertCtrl.create({
          title: 'Can not find this address.',
          buttons: ['OK']
        });
        alert.present();
      }
    });

  }

  addParking(spot, uid, location) {
    console.log(1, spot, uid);
    spot.publisherDetails.uid = uid;

    let key = this.spots.push(spot).key;

    let lastParkingTime: any = new Date();
    console.log(5);
    this.af.object('/userProfile/' + uid + "/parkingDetails/").update({ lastParkingTime: lastParkingTime.toString() });
    console.log(10);
    this.af.list('/userProfile/' + uid + "/parkingDetails/").push(key);
    var firebaseRef = firebase.database().ref('/geofire/');
    var geoFire = new GeoFire(firebaseRef);

    geoFire.set({
      [key]: [location.latitude, location.longitude]
    }).then(() => {
      console.log(11);
      if (this.loading) {
        this.loading.dismiss();
      }
      let alert = this.alertCtrl.create({
        title: 'Spot published successfully ',
        buttons: ['OK']
      });
      alert.present();
      console.log(22);
      this.navCtrl.setRoot('HistoryPage');
    }, (error) => {
      if (this.loading) {
        this.loading.dismiss();
      }
      console.log("Error: " + error);
    });
  }



  findFormSubmit(form: NgForm) {
    console.log('Find FORM', form);
    console.log();
    this.loading = this.loadingCtrl.create({
      content: 'Finding a spots near by you...'
    });

    this.loading.present();

    this.toggleSubmit = true;
    this.nearBySpotsKeys = [];

    //this.geoFire.query({center:[this.latitude,this.longitude],radius:2});
    //console.log(this.geoFire.query({center:[this.latitude,this.longitude],radius:2}));
    //var geoFire = new GeoFire(this.af.list('/spots/'+'-KmfiqxL_hW0L2FjhXDy'));
    /*   var geoQuery = geoFire.query({
         center: [46.310774, 2.423515],
         radius: 2//kilometers
       });*/


    var firebaseRef = firebase.database().ref('/geofire/');
    var geoFire = new GeoFire(firebaseRef);

    var ref = geoFire.ref();
    console.log("geofire" + JSON.stringify(ref));

    var geocoder = new google.maps.Geocoder();
    let address = this.findForm.get('parkLocation').value;
    geocoder.geocode({ 'address': address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let location = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() };
        console.log('Location', location);

        var geoQuery = geoFire.query({
          center: [location.latitude, location.longitude],
          radius: 10
        });

        geoQuery.on("key_entered", (key, location, distance) => {
          // console.log("Bicycle shop " + key + " found at " + location + " (" + distance + " km away)");
          console.log('---->>>', key, location, distance)
          this.nearBySpotsKeys.push(key);
        })

        console.log('this.nearBySpotsKeys', this.nearBySpotsKeys);
        //console.log("geoQuery" + JSON.stringify(geoQuery));
        geoQuery.on("ready", () => {
          console.log("GeoQuery has loaded and fired all other events for initial data");
          let currentAddress = this.findForm.get('currentLocation').value;
          geocoder.geocode({ 'address': currentAddress }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              let currentLocation = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() };
              let desiredtime = this.findForm.get('desiredtime').value;
              geoQuery.cancel();
              this.navCtrl.push('ParkingListPage', {
                "latitude": currentLocation.latitude,
                "longitude": currentLocation.longitude,
                "currentLocation": currentAddress,
                "spots": this.nearBySpotsKeys,
                "desiredtime": desiredtime
              });
              if (this.loading) {
                this.loading.dismiss();
              }
            }
          })

        })


      } else {
        if (this.loading) {
          this.loading.dismiss();
        }
        let alert = this.alertCtrl.create({
          title: 'Can not find this address.',
          buttons: ['OK']
        });
        alert.present();
      }
    });


    /*  var onKeyExitedRegistration = geoQuery.on("key_exited", function (key, location, distance) {
        console.log(key + " exited query to " + location + " (" + distance + " km from center)");
      });*/

    // this.af.list('/spots').subscribe((response) => {
    //   //console.log(response);

    // })

  }

  gotoNotificationPage() {
    this.navCtrl.push('NotificationPage', {
      "desiredTime": this.desiredTime,
      "desiredLocation": this.desiredLocation,
      "spotDetails": this.spotDetails,
      "requesters": this.requesters
    });
  }

  openBusiness() {
    this.navCtrl.setRoot('UserhomePage');
  }

  public ngOnDestroy() {
    console.log('Destroy Angular component');
  }

  segmentChanged() {
    this.postForm.reset();
    this.findForm.reset();
  }
}
