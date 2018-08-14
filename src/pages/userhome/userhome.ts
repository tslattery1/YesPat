import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { PaginationService } from "./userhomePagination.service";
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import * as _ from "lodash";
declare var GeoFire: any;
import firebase from 'firebase';

/**
 * Generated class for the UserhomePage page
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userhome',
  templateUrl: 'userhome.html',
})
export class UserhomePage {

  businessList: any = [];
  spotDetails: any = [
    { "parkLocation": "", "endtime": "", "uuid": "" }
  ];
  notifCounter: number;
  desiredLocation: any;
  desiredTime: any;
  requesters: any = [];

  notifCount: number = 0;

  user: any;

  /* Fake */

  comments: any;
  offset = 2;
  nextKey: any;
  subscription: any;
  latitude: any;
  longitude:any;

  loading: any;

  constructor(private alertCtrl: AlertController, public diagnostic: Diagnostic,public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, private af: AngularFireDatabase, public paginationSvc: PaginationService, private geolocation: Geolocation,) {
  }

  public ngOnInit() {
    console.log('In business list for parking users');
    this.loading = this.loadingCtrl.create({
      content: 'Checking business in your location...'
    });

    this.loading.present();

    this.geolocation.getCurrentPosition({ timeout: 10000, enableHighAccuracy: true }).then((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.user = this.af.object('/businessProfile/');
        this.user.subscribe((data) => {
          this.businessList = [];
          this.loading.dismiss();
          for (var key in data) {
            if(key) {
              data[key]['navigate'] = key;
              let checkPoint = data[key].location;
              let centerPoint = {latitude: 19.0688, longitude: 72.99359249999999};
              if(this.arePointsNear(checkPoint, centerPoint, 10)) {
                this.businessList.push(data[key]);
              }
            }
        }
        });
    }, (error) => {     
      this.loading.dismiss();
      this.diagnostic.isLocationAvailable().then((res: any) => {
          if(res == false) {
              let confirm = this.alertCtrl.create({
              title: 'Allow location',
              message: 'The app requires current location of device.',
              buttons: [
                {
                  text: 'DENY',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: 'ALLOW',
                  handler: () => {
                    document.addEventListener("resume", this.onResume.bind(this), false);
                    this.diagnostic.switchToLocationSettings();
                  }
                }
              ]
            });
            confirm.present();
          }
      }, (err: any) => {
        this.loading.dismiss();
        console.log('Location err => ', err);
      });
    }).catch((error) => {
      this.loading.dismiss();
      console.log('Error getting location', error);
    });
   }

   onResume() {
     console.log('In on resume');
     this.ngOnInit();
   }
  arePointsNear(checkPoint, centerPoint, km = 10) {
    if(checkPoint) {
      var ky = 40000 / 360;
      var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
      var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
      var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
      return Math.sqrt(dx * dx + dy * dy) <= km;
    }
  }

  nextPage() {
    console.log('Jarvis load next data');
    this.getBusinesses(this.nextKey)
  }

  getBusinesses(key?) {
    this.subscription = this.paginationSvc.getBusinessData('samplePost1', this.offset, key)
    .subscribe(data => {
       this.comments = _.slice(data, 0, this.offset)
       this.nextKey =_.get(data[this.offset], '$key')
       console.log('comments ==>', this.comments, this.nextKey);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserhomePage');
  }

  openFindSpot(){
    this.navCtrl.setRoot('PostFindspotPage');
  }

  gotoNotificationPage() {
    this.navCtrl.push('NotificationPage', {
      "desiredTime": this.desiredTime,
      "desiredLocation": this.desiredLocation,
      "spotDetails": this.spotDetails,
      "requesters": this.requesters
    });
  }

  openBusiness(item) {
    console.log('jarvis please open item', item);
    this.navCtrl.push('HomedetailsPage', {navigateKey: item.navigate});
  }

}
