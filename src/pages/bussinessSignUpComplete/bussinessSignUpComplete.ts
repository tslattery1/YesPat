import { Push } from '@ionic-native/push';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage } from 'ionic-angular';
import { NavController, LoadingController, ToastController, NavParams } from "ionic-angular";

import { Geolocation } from '@ionic-native/geolocation';
import { DomSanitizer } from '@angular/platform-browser';

import { Storage } from "@ionic/storage";
import { Auth } from "../../providers/auth/auth";

import { ActionSheetController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImageProvider } from "../../providers/image-provider";
import { Base64 } from '@ionic-native/base64';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';


declare var google: any;


@IonicPage()
@Component({
  selector: 'bussiness-signup',
  templateUrl: 'bussinessSignUpComplete.html',
})

export class BussinessSignUpPage {

  bussinessSignUpForm: FormGroup;
  gallery: any = [];
  newGallery: any = [];
  imageCount: any = 1;
  loading: any;
  lat: any;
  lng: any;
  geocoder: any;

  autocomplete: any;
  autocompleteItems: any;
  dontShowPredictions: any = true;
  acService: any;
  location: any;
  finalSearchValue: any;
  uid: any;

  constructor(public navParams: NavParams,
    public geolocation: Geolocation,
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public imagePicker: ImagePicker,
    private storage: Storage,
    private auth: Auth,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private imageSrv: ImageProvider,
    private base64: Base64,
    private file: File,
    private sanitizer: DomSanitizer,
    public platform: Platform
  ) {

    this.bussinessSignUpForm = new FormGroup({
      bussinessName: new FormControl('',  Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
      ]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10,10}")]),
      alternateNumber: new FormControl('', Validators.pattern("[0-9]{10,10}")),
      bussinessType: new FormControl('Coffee'),
      website: new FormControl(''),
      bussinessImages: new FormControl(''),
    });

  }

  public ngOnInit() {
    if(this.navParams.get('UID')) {
      this.uid = this.navParams.get('UID');
      console.log('UID', this.uid);
    } else {
      this.storage.get('uid').then((response) => {
        this.uid = response;
        console.log('Storage', this.uid);
      });
    }

    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

    this.geolocation.getCurrentPosition({ timeout: 30000, enableHighAccuracy: true }).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      let latLng = new google.maps.LatLng(this.lat, this.lng);
      this.getMapDetails(latLng).then((data: any) => {
        this.bussinessSignUpForm.get('address').setValue(data);
        
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': data }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            this.location = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() };
          } else {
            alert("Can't find address: " + status);
          }
        });

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

      this.geocoder.geocode({ 'latLng': latLng }, function (results, status) {
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

  uploadMedia(filePath) {
    console.log('Image Upload path', filePath);
    this.base64.encodeFile(filePath).then((base64File: string) => {
      let newUrl: any = base64File.replace(/\*;charset=utf-8/g, "jpeg");
      console.log('data:image/jpeg;base64,', newUrl);
      this.imageSrv.uploadImage(newUrl, 'Bussiness')
        .then(data => {
          console.log('Uploaded Path', data.metadata.downloadURLs[0]);
          this.newGallery.push(data.metadata.downloadURLs[0]);
          if (this.gallery.length !== this.imageCount) {
            this.imageCount++;
            console.log('Add for image number from array', this.imageCount);
            this.uploadMedia(this.gallery[this.imageCount - 1]);
          } else {
            console.log('All set done', this.newGallery);
            this.bussinessSignUpForm.get('bussinessImages').setValue(this.newGallery);
            this.saveBussinessForm();
          }
        }, (error) => {
          console.log('Uploaded error', error);
        });
    });

  }

  bussinessSubmit() {
    if (this.bussinessSignUpForm.valid) {
      if (this.bussinessSignUpForm.get('alternateNumber').value !== this.bussinessSignUpForm.get('phoneNumber').value) {

        if (this.gallery.length <= 5) {
          if (this.gallery.length) {
            this.loading = this.loadingCtrl.create({
              content: 'Creating your business...'
            });

            this.loading.present();

            this.uploadMedia(this.gallery[0]);
          } else {
            let toast = this.toastCtrl.create({
              message: 'Please add business images.',
              duration: 2000,
              position: 'middle'
            });
            toast.present();
          }
        } else {
          let toast = this.toastCtrl.create({
            message: 'You can add maximum 5 images.',
            duration: 2000,
            position: 'middle'
          });
          toast.present();
        }
      } else {
        let toast = this.toastCtrl.create({
          message: 'Alternate number and phone number can not be same.',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }

    }
  }

  saveBussinessForm() {
    let user = this.bussinessSignUpForm.value;
    console.log('Bussiness User', user);
    user['location'] = this.location;

    this.auth.signupBussiness(this.uid, user.email, user.bussinessName, user.address, user.phoneNumber, user.alternateNumber, user.bussinessType, user.website, user.bussinessImages, user.location, 'bussinesssUser')
      .then(() => {
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Account created successfully. Once bussiness will be veified you will get the Notification',
          duration: 3000,
          position: 'middle'
        });
        this.storage.clear();
        this.auth.logoutUser()
          .then(() => {
          })
        localStorage.clear();

        toast.present();
        this.navCtrl.setRoot('LoginPage');
        this.bussinessSignUpForm.reset();
      },
      error => {
        console.log(error);
        this.loading.dismiss();
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 2000,
          position: 'middle'
        });

        toast.present();

      }
      )


  }
  actionSheet: any;
  pickImage() {
    this.actionSheet = this.actionSheetCtrl.create({
      title: 'Select file for Upload  ',


      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.pickImg()
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    this.actionSheet.present();
  }

  pickImg() {
    var options = {
      maximumImagesCount: (5 - this.gallery.length),
      quality: 50,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.imagePicker.getPictures(options).then((results) => {
      if (results != 'OK' && results.length !== 0) {
        for (var i = 0; i < results.length; i++) {
          if (this.platform.is('ios')) {
            // This will only print when on iOS
            console.log('I am an iOS device!');
            let localFile = results[i].replace(/^file:\/\//, 'http://localhost:8080');
            this.gallery.push(localFile);
          } else {
            // This will only print when on Android
            console.log('I am an Android device!');
            this.gallery.push(results[i]);
          }
        }
      }
      // if (results != 'OK' && results.length !== 0) {
      //   for (var i = 0; i < results.length; i++) {
      //     console.log('Gallery selected', results[i]);
      //     this.file.resolveLocalFilesystemUrl(results[i]).then((fileUrl) => {
      //       console.log('resolveLocalFilesystemUrl success', fileUrl);
      //       let internalUrl = this.sanitizer.bypassSecurityTrustUrl(fileUrl.toInternalURL());
      //       console.log('a success', internalUrl);
      //       this.gallery.push(internalUrl);
      //     }, (error) => {
      //       console.log('resolveLocalFilesystemUrl error', error);
      //     }).catch((error) => {
      //       console.log('resolveLocalFilesystemUrl Catch error', error);
      //     })

      //   }
      // }
    }, (err) => { });
  }

  public takePicture(sourceType) {
    var options = {
      maximumImagesCount: 1,
      quality: 1,
      sourceType: sourceType,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imagePath) => {
      console.log('Camera clicked', imagePath);
      // this.gallery.push(imagePath);
      if (this.platform.is('ios')) {
        // This will only print when on iOS
        console.log('I am an iOS device!');
        let localFile = imagePath.replace(/^file:\/\//, 'http://localhost:8080');
        this.gallery.push(localFile);
      } else {
        // This will only print when on Android
        console.log('I am an Android device!');
        this.gallery.push(imagePath);
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteImage(i) {
    console.log('Index', i);
    this.gallery.splice(i, 1);
  }

  updateSearch() {
    console.log('Update me', this.finalSearchValue, this.autocomplete.query);
    // console.log('modal > updateSearch');
    if (this.autocomplete.query == '' || this.autocomplete.query === this.finalSearchValue) {
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
    geocoder.geocode({ 'address': item.description }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.location = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() };
      } else {
        alert("Can't find address: " + status);
      }
    });
    this.autocomplete.query = item.description;
    this.finalSearchValue = item.description;
    this.dontShowPredictions = true;
  }

  dismiss() {
    this.autocomplete.query = '';
    this.dontShowPredictions = true;
  }

}