
import { Component } from '@angular/core';

import { Storage } from "@ionic/storage";
import { NavController } from "ionic-angular";
import { IonicPage } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Auth } from "../../../providers/auth/auth";
import { ImageProvider } from "../../../providers/image-provider";
import { Camera, CameraOptions } from "@ionic-native/camera";

import { Geolocation } from '@ionic-native/geolocation';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  uid: any;
  editprofilePage = EditProfilePage;
  userDetails: any;
  username: string;
  showUserDetails: boolean = false;
  user: FirebaseListObservable<any>;
  geocoder: any;
  editForm: FormGroup;

  autocompleteItems: any;
  dontShowPredictions: any = true;
  acService: any;
  location: any;
  finalSearchValue: any;

  constructor(
    public geolocation: Geolocation,
    private storage: Storage,
    private navCtrl: NavController,
    private af: AngularFireDatabase,
    private auth: Auth,
    private imageSrv: ImageProvider,
    private camera: Camera,
  ) {

    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10,10}")]),
      address: new FormControl(''),
    });


      this.storage.get('uid').then((response) => {
      this.uid = response;
      this.af.object('/userProfile/' + response)
      .subscribe((data) => {
        this.userDetails = data;
        console.log('userDetails', data);
      })
    })

  }

  public ngOnInit() {

    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];

    this.geolocation.getCurrentPosition({ timeout: 30000, enableHighAccuracy: true }).then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.getMapDetails(latLng).then( (data: any) => {
          if(!this.userDetails.address) {
            this.userDetails.address = data;
          }
         }).catch((e) => {
           console.log('sorry Jarvis cant mapp anything');
         });
       }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getMapDetails(latLng) {
    return new Promise((resolve, reject) => {
       this.geocoder = new google.maps.Geocoder();
       let mapRespone: any = {};
    
       this.geocoder.geocode({'latLng': latLng}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // console.log('Map Result', results)
            if (results[1]) {
                  console.log('Address', results[0].formatted_address);
                  resolve(results[0].formatted_address);
    
          } else {
              reject('No results found');
            }
          } else {
            reject(status);
          }
        });
        });
      }

  onSubmit(form) {
    this.storage.get('uid').then((response) => {
      console.log(form.value);
      this.af.object('/userProfile/' + response).update(form.value);
      this.navCtrl.setRoot('ProfileDetailsPage');
    })
  }

  updateSearch() {
    console.log('Update me', this.finalSearchValue, this.userDetails.address);
    // console.log('modal > updateSearch');
    if (this.userDetails.address == '' || this.userDetails.address === this.finalSearchValue) {
      this.autocompleteItems = [];
      return;
    }
    let self = this;
    let config = {
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.userDetails.address,
      componentRestrictions: {}
    }
    this.acService.getPlacePredictions(config, function (predictions, status) {
      //dontShowPredictions = false;
      // console.log('modal > getPlacePredictions > status > ', status);
      self.autocompleteItems = [];
      if (status != 'ZERO_RESULTS' && predictions) {
        self.dontShowPredictions = false;
        predictions.forEach(function (prediction, abc) {
          self.autocompleteItems.push(prediction);
        });

      }
      else {
        self.dontShowPredictions = true;
      }

    });
  }

   chooseItem(item) {
    var geocoder = new google.maps.Geocoder();
    this.userDetails.address = item.description;
    this.finalSearchValue = item.description;
    this.dontShowPredictions = true;
  }

  dismiss() {
    this.userDetails.address = '';
    this.dontShowPredictions = true;
  }


}


