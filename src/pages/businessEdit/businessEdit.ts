import { Component } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionSheetController } from 'ionic-angular';
import { NavController, LoadingController, ToastController, NavParams } from "ionic-angular";

import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from "@ionic-native/camera";

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Storage } from "@ionic/storage";

import { ImageProvider } from "../../providers/image-provider";
import { Base64 } from '@ionic-native/base64';

declare var google: any;

@IonicPage()
@Component({
  selector: 'bussiness-edit',
  templateUrl: 'businessEdit.html',
})

export class BussinessEditPage {
  businessEditForm: FormGroup;
  businessUserData: any;
  loading: any;
  acService: any;
  location: any;
  dontShowPredictions: any = true;

  autocomplete: any;
  autocompleteItems: any;

  finalSearchValue: any;
  gallery: any = [];
  newAddedGallery: any = [];
  imageCount: any = 1;
  deleteGallery: any = [];
  deleteImageCount: any = 1;
  user: any;
  newUploadGallery: any = [];

  constructor(private storage: Storage, private af: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, public imagePicker: ImagePicker, private camera: Camera, public loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private imageSrv: ImageProvider, private base64: Base64, private navCtrl: NavController, public platform: Platform) {

  }

  public ngOnInit() {
    this.storage.get('uid').then((response) => {
      this.user = this.af.object('/businessProfile/' + response);
      this.user.subscribe((data) => {
        this.businessUserData = data;
        console.log(data.bussinessImages);
        this.gallery = data.bussinessImages;
        console.log('Business Edit USER DATA', this.businessUserData);
        Object.keys(this.businessUserData).forEach((key: any) => {
          if (this.businessEditForm.get(key) !== null) {
            this.businessEditForm.get(key).setValue(this.businessUserData[key]);
          }
        });
      });
    }, (error) => {
      console.log('something went wrong', error);
    });

    this.acService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];

    this.autocomplete = {
      query: this.businessUserData ? this.businessUserData['address'] : ''
    };

    this.buildEditBusinessForm();
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

  buildEditBusinessForm() {
    console.log('build form');
    this.businessEditForm = new FormGroup({
      bussinessName: new FormControl(this.businessUserData ? this.businessUserData.bussinessName : '', Validators.required),
      address: new FormControl(this.businessUserData ? this.businessUserData['address'] : '', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
      ]),
      phoneNumber: new FormControl(this.businessUserData ? this.businessUserData['phoneNumber'] : '', [Validators.required, Validators.pattern("[0-9]{10,10}")]),
      alternateNumber: new FormControl(this.businessUserData ? this.businessUserData['alternateNumber'] : '', Validators.pattern("[0-9]{10,10}")),
      bussinessType: new FormControl(this.businessUserData ? this.businessUserData['bussinessType'] : ''),
      website: new FormControl(this.businessUserData ? this.businessUserData['website'] : ''),
      bussinessImages: new FormControl(''),
    });

  }

  updateBusiness() {
    if (this.businessEditForm.valid) {

      if (this.gallery.length) {
        this.loading = this.loadingCtrl.create({
          content: 'Updating your business...'
        });

        this.loading.present();
        if (this.deleteGallery.length) {
          this.deleteMedia(this.deleteGallery[0]);
        } else if (this.newAddedGallery.length) {
          this.uploadMedia(this.newAddedGallery[0]);
        } else {
          this.saveBussinessForm();
        }
      } else {
        let toast = this.toastCtrl.create({
          message: 'Please add business images.',
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }

      // if(this.gallery.length) {
      //   this.loading = this.loadingCtrl.create({
      //     content: 'Please wait...'
      //   });

      //   this.loading.present();

      //    // this.uploadMedia(this.gallery[0]);
      // } else {
      //   let toast = this.toastCtrl.create({
      //     message: 'Please add business images.',
      //     duration: 2000,
      //     position: 'middle'
      //   });
      //   toast.present();
      // }
    }
  }

  deleteMedia(filePath) {
    this.imageSrv.deleteImageFile(filePath, 'Bussiness').then(() => {
      if (this.deleteGallery.length !== this.deleteImageCount) {
        this.deleteImageCount++;
        console.log('Add for image number from array', this.deleteImageCount);
        this.deleteMedia(this.deleteGallery[this.deleteImageCount - 1]);
      } else {
        console.log('Jarvis did Image clean UP');
        if (this.newAddedGallery.length) {
          this.uploadMedia(this.newAddedGallery[0]);
        } else {
          this.businessEditForm.get('bussinessImages').setValue(this.gallery);
          this.saveBussinessForm();
        }
      }
    })
  }

  uploadMedia(filePath) {
    console.log('Image Upload path', filePath);
    this.base64.encodeFile(filePath).then((base64File: string) => {
      let newUrl: any = base64File.replace(/\*;charset=utf-8/g, "jpeg");
      console.log('data:image/jpeg;base64,', newUrl);
      this.imageSrv.uploadImage(newUrl, 'Bussiness')
        .then(data => {
          console.log('Uploaded Path', data.metadata.downloadURLs[0]);
          this.newUploadGallery.push(data.metadata.downloadURLs[0]);
          if (this.newAddedGallery.length !== this.imageCount) {
            this.imageCount++;
            console.log('Add for image number from array', this.imageCount);
            this.uploadMedia(this.newAddedGallery[this.imageCount - 1]);
          } else {
            this.gallery.forEach((element, index) => {
              if (this.platform.is('ios')) {
                if (!this.gallery[index].match(/http:\/\//g)) {
                  this.newUploadGallery.push(this.gallery[index]);
                }
              } else {
                if (!this.gallery[index].match(/file:\/\/\//g)) {
                  this.newUploadGallery.push(this.gallery[index]);
                }
              }
            })
            console.log('All set done', this.newUploadGallery);
            this.businessEditForm.get('bussinessImages').setValue(this.newUploadGallery);
            this.saveBussinessForm();
          }
        }, (error) => {
          console.log('Uploaded error', error);
        });
    });
  }

  saveBussinessForm() {
    console.log('save business form');
    let user = this.businessEditForm.value;
    if (this.location) {
      user['location'] = this.location;
    }
    this.storage.get('uid').then((response) => {
      this.af.object('/businessProfile/' + response).update(user);
      this.loading.dismiss();
      this.navCtrl.setRoot('BussinessAddMenuPage');
    })
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
            console.log('Gallery selected', localFile);
            this.gallery.push(localFile);
            this.newAddedGallery.push(localFile);
          } else {
            // This will only print when on Android
            console.log('I am an Android device!');
            this.gallery.push(results[i]);
            this.newAddedGallery.push(results[i]);
          }
        }
      }
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
        this.newAddedGallery.push(localFile);
      } else {
        // This will only print when on Android
        console.log('I am an Android device!');
        this.gallery.push(imagePath);
        this.newAddedGallery.push(imagePath);
      }
    }, (err) => {
      console.log(err);
    });
  }

  deleteImage(i) {
    this.deleteGallery.push(this.gallery[i]);
    this.gallery.splice(i, 1);
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

