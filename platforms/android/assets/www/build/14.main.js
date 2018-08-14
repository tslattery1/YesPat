webpackJsonp([14],{

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BussinessSignupPageModule", function() { return BussinessSignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bussinessSignUpComplete__ = __webpack_require__(904);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var BussinessSignupPageModule = (function () {
    function BussinessSignupPageModule() {
    }
    return BussinessSignupPageModule;
}());
BussinessSignupPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__bussinessSignUpComplete__["a" /* BussinessSignUpPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__bussinessSignUpComplete__["a" /* BussinessSignUpPage */])],
    })
], BussinessSignupPageModule);

//# sourceMappingURL=bussinessSignUpComplete.module.js.map

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BussinessSignUpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_image_provider__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__ = __webpack_require__(184);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var BussinessSignUpPage = (function () {
    function BussinessSignUpPage(navParams, geolocation, navCtrl, loadingCtrl, toastCtrl, imagePicker, storage, auth, actionSheetCtrl, camera, imageSrv, base64, file, sanitizer, platform) {
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.imagePicker = imagePicker;
        this.storage = storage;
        this.auth = auth;
        this.actionSheetCtrl = actionSheetCtrl;
        this.camera = camera;
        this.imageSrv = imageSrv;
        this.base64 = base64;
        this.file = file;
        this.sanitizer = sanitizer;
        this.platform = platform;
        this.gallery = [];
        this.newGallery = [];
        this.imageCount = 1;
        this.dontShowPredictions = true;
        this.bussinessSignUpForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* FormGroup */]({
            bussinessName: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            address: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
            ]),
            phoneNumber: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].pattern("[0-9]{10,10}")]),
            alternateNumber: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].pattern("[0-9]{10,10}")),
            bussinessType: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormControl */]('Coffee'),
            website: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormControl */](''),
            bussinessImages: new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["f" /* FormControl */](''),
        });
    }
    BussinessSignUpPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.navParams.get('UID')) {
            this.uid = this.navParams.get('UID');
            console.log('UID', this.uid);
        }
        else {
            this.storage.get('uid').then(function (response) {
                _this.uid = response;
                console.log('Storage', _this.uid);
            });
        }
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
        this.geolocation.getCurrentPosition({ timeout: 30000, enableHighAccuracy: true }).then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.lng = resp.coords.longitude;
            var latLng = new google.maps.LatLng(_this.lat, _this.lng);
            _this.getMapDetails(latLng).then(function (data) {
                _this.bussinessSignUpForm.get('address').setValue(data);
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'address': data }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        _this.location = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() };
                    }
                    else {
                        alert("Can't find address: " + status);
                    }
                });
            }).catch(function (e) {
                console.log('sorry Jarvis cant mapp anything');
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    BussinessSignUpPage.prototype.getMapDetails = function (latLng) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.geocoder = new google.maps.Geocoder();
            var mapRespone = {};
            _this.geocoder.geocode({ 'latLng': latLng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // console.log('Map Result', results)
                    if (results[1]) {
                        console.log('Address', results[0].formatted_address);
                        resolve(results[0].formatted_address);
                    }
                    else {
                        reject('No results found');
                    }
                }
                else {
                    reject(status);
                }
            });
        });
    };
    BussinessSignUpPage.prototype.uploadMedia = function (filePath) {
        var _this = this;
        console.log('Image Upload path', filePath);
        this.base64.encodeFile(filePath).then(function (base64File) {
            var newUrl = base64File.replace(/\*;charset=utf-8/g, "jpeg");
            console.log('data:image/jpeg;base64,', newUrl);
            _this.imageSrv.uploadImage(newUrl, 'Bussiness')
                .then(function (data) {
                console.log('Uploaded Path', data.metadata.downloadURLs[0]);
                _this.newGallery.push(data.metadata.downloadURLs[0]);
                if (_this.gallery.length !== _this.imageCount) {
                    _this.imageCount++;
                    console.log('Add for image number from array', _this.imageCount);
                    _this.uploadMedia(_this.gallery[_this.imageCount - 1]);
                }
                else {
                    console.log('All set done', _this.newGallery);
                    _this.bussinessSignUpForm.get('bussinessImages').setValue(_this.newGallery);
                    _this.saveBussinessForm();
                }
            }, function (error) {
                console.log('Uploaded error', error);
            });
        });
    };
    BussinessSignUpPage.prototype.bussinessSubmit = function () {
        if (this.bussinessSignUpForm.valid) {
            if (this.bussinessSignUpForm.get('alternateNumber').value !== this.bussinessSignUpForm.get('phoneNumber').value) {
                if (this.gallery.length <= 5) {
                    if (this.gallery.length) {
                        this.loading = this.loadingCtrl.create({
                            content: 'Creating your business...'
                        });
                        this.loading.present();
                        this.uploadMedia(this.gallery[0]);
                    }
                    else {
                        var toast = this.toastCtrl.create({
                            message: 'Please add business images.',
                            duration: 2000,
                            position: 'middle'
                        });
                        toast.present();
                    }
                }
                else {
                    var toast = this.toastCtrl.create({
                        message: 'You can add maximum 5 images.',
                        duration: 2000,
                        position: 'middle'
                    });
                    toast.present();
                }
            }
            else {
                var toast = this.toastCtrl.create({
                    message: 'Alternate number and phone number can not be same.',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();
            }
        }
    };
    BussinessSignUpPage.prototype.saveBussinessForm = function () {
        var _this = this;
        var user = this.bussinessSignUpForm.value;
        console.log('Bussiness User', user);
        user['location'] = this.location;
        this.auth.signupBussiness(this.uid, user.email, user.bussinessName, user.address, user.phoneNumber, user.alternateNumber, user.bussinessType, user.website, user.bussinessImages, user.location, 'bussinesssUser')
            .then(function () {
            _this.loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: 'Account created successfully. Once bussiness will be veified you will get the Notification',
                duration: 3000,
                position: 'middle'
            });
            _this.storage.clear();
            _this.auth.logoutUser()
                .then(function () {
            });
            localStorage.clear();
            toast.present();
            _this.navCtrl.setRoot('LoginPage');
            _this.bussinessSignUpForm.reset();
        }, function (error) {
            console.log(error);
            _this.loading.dismiss();
            var toast = _this.toastCtrl.create({
                message: error.message,
                duration: 2000,
                position: 'middle'
            });
            toast.present();
        });
    };
    BussinessSignUpPage.prototype.pickImage = function () {
        var _this = this;
        this.actionSheet = this.actionSheetCtrl.create({
            title: 'Select file for Upload  ',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.pickImg();
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        this.actionSheet.present();
    };
    BussinessSignUpPage.prototype.pickImg = function () {
        var _this = this;
        var options = {
            maximumImagesCount: (5 - this.gallery.length),
            quality: 50,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.imagePicker.getPictures(options).then(function (results) {
            if (results != 'OK' && results.length !== 0) {
                for (var i = 0; i < results.length; i++) {
                    if (_this.platform.is('ios')) {
                        // This will only print when on iOS
                        console.log('I am an iOS device!');
                        var localFile = results[i].replace(/^file:\/\//, 'http://localhost:8080');
                        _this.gallery.push(localFile);
                    }
                    else {
                        // This will only print when on Android
                        console.log('I am an Android device!');
                        _this.gallery.push(results[i]);
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
        }, function (err) { });
    };
    BussinessSignUpPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
            quality: 1,
            sourceType: sourceType,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imagePath) {
            console.log('Camera clicked', imagePath);
            // this.gallery.push(imagePath);
            if (_this.platform.is('ios')) {
                // This will only print when on iOS
                console.log('I am an iOS device!');
                var localFile = imagePath.replace(/^file:\/\//, 'http://localhost:8080');
                _this.gallery.push(localFile);
            }
            else {
                // This will only print when on Android
                console.log('I am an Android device!');
                _this.gallery.push(imagePath);
            }
        }, function (err) {
            console.log(err);
        });
    };
    BussinessSignUpPage.prototype.deleteImage = function (i) {
        console.log('Index', i);
        this.gallery.splice(i, 1);
    };
    BussinessSignUpPage.prototype.updateSearch = function () {
        console.log('Update me', this.finalSearchValue, this.autocomplete.query);
        // console.log('modal > updateSearch');
        if (this.autocomplete.query == '' || this.autocomplete.query === this.finalSearchValue) {
            this.autocompleteItems = [];
            return;
        }
        var self = this;
        var config = {
            //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input: this.autocomplete.query,
            componentRestrictions: {}
        };
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
    };
    BussinessSignUpPage.prototype.chooseItem = function (item) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': item.description }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                _this.location = { latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng() };
            }
            else {
                alert("Can't find address: " + status);
            }
        });
        this.autocomplete.query = item.description;
        this.finalSearchValue = item.description;
        this.dontShowPredictions = true;
    };
    BussinessSignUpPage.prototype.dismiss = function () {
        this.autocomplete.query = '';
        this.dontShowPredictions = true;
    };
    return BussinessSignUpPage;
}());
BussinessSignUpPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'bussiness-signup',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/bussinessSignUpComplete/bussinessSignUpComplete.html"*/'<ion-header>\n  <ion-navbar>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid class="signUpHeader">\n    <h1>COMPLETE BUSINESS SIGN UP</h1>\n  </ion-grid>\n\n  <ion-grid class="signUpForm">\n\n    <form [formGroup]="bussinessSignUpForm" novalidate>\n      <ion-list no-lines>\n        <ion-item>\n          <img src="assets/images/user.png" alt="" item-left>\n          <ion-input type="text" placeholder="Business Name" formControlName="bussinessName"></ion-input>\n        </ion-item>\n        <div *ngIf="!bussinessSignUpForm.controls.bussinessName.valid && (bussinessSignUpForm.controls.bussinessName.dirty ||bussinessSignUpForm.controls.bussinessName.touched)"\n          class="error">\n          <div [hidden]="!bussinessSignUpForm.controls.bussinessName.errors.required">\n            *Business name is required.\n          </div>\n        </div>\n\n        <ion-item>\n          <img src="assets/images/address.png" alt="" item-left class="webimg">\n          <ion-searchbar type="text" placeholder="Address" formControlName="address" [(ngModel)]="autocomplete.query" (ionInput)="updateSearch()" (ionCancel)="dismiss()"\n            required></ion-searchbar>\n        </ion-item>\n        <div *ngIf="!bussinessSignUpForm.controls.address.valid && (bussinessSignUpForm.controls.address.dirty ||bussinessSignUpForm.controls.address.touched)"\n          class="error">\n          <div [hidden]="!bussinessSignUpForm.controls.address.errors.required">\n            *Address is required.\n          </div>\n        </div>\n\n        <ion-list [hidden]="dontShowPredictions">\n          <ion-item *ngFor="let item of autocompleteItems" (click)="chooseItem(item)">\n            {{ item.description }}\n          </ion-item>\n        </ion-list>\n\n        <!-- <ion-label stacked>Desired Location</ion-label>\n					<ion-searchbar required \n					formControlName="address" [(ngModel)]="autocomplete.query" [showCancelButton]="true" (ionInput)="updateSearch()" (ionCancel)="dismiss()"\n					placeholder="Start typing and select ...">\n				</ion-searchbar>\n\n				<div *ngIf="!bussinessSignUpForm.controls.address.valid && (bussinessSignUpForm.controls.address.dirty ||bussinessSignUpForm.controls.address.touched)" class="error">\n					<div [hidden]="!bussinessSignUpForm.controls.address.errors.required">\n						*Address is required.\n					</div>\n				</div> -->\n\n\n\n        <ion-item>\n          <img src="assets/images/phone.png" alt="" item-left>\n          <ion-input type="number" placeholder="Phone Number" formControlName="phoneNumber" required></ion-input>\n        </ion-item>\n        <div *ngIf="!bussinessSignUpForm.controls.phoneNumber.valid && (bussinessSignUpForm.controls.phoneNumber.dirty ||bussinessSignUpForm.controls.phoneNumber.touched)"\n          class="error">\n          <div [hidden]="!bussinessSignUpForm.controls.phoneNumber.errors.required">\n            *Phone number is required.\n          </div>\n          <div [hidden]="!bussinessSignUpForm.controls.phoneNumber.errors.pattern">\n            *10 digits are allowed.\n          </div>\n        </div>\n\n        <ion-item>\n          <img src="assets/images/phone.png" alt="" item-left>\n          <ion-input type="number" placeholder="Alternate Number" formControlName="alternateNumber" required></ion-input>\n        </ion-item>\n        <div *ngIf="!bussinessSignUpForm.controls.alternateNumber.valid && (bussinessSignUpForm.controls.alternateNumber.dirty || bussinessSignUpForm.controls.alternateNumber.touched)"\n          class="error">\n          <div [hidden]="!bussinessSignUpForm.controls.alternateNumber.errors.pattern">\n            *10 digits are allowed.\n          </div>\n        </div>\n\n        <ion-item>\n          <ion-icon ios="ios-mail" md="md-mail" item-left></ion-icon>\n          <ion-input type="email" placeholder="Business Email Address" formControlName="email" required></ion-input>\n        </ion-item>\n        <div *ngIf="!bussinessSignUpForm.controls.email.valid && (bussinessSignUpForm.controls.email.dirty ||bussinessSignUpForm.controls.email.touched)"\n          class="error">\n          <div [hidden]="!bussinessSignUpForm.controls.email.errors.required">\n            *Business email is required.\n          </div>\n          <div [hidden]="!bussinessSignUpForm.controls.email.errors.pattern">\n            *Email is not valid.\n          </div>\n        </div>\n\n        <ion-item>\n          <img src="assets/images/bus_type.png" alt="" item-left class="webimg">\n          <ion-label>Business Type</ion-label>\n          <ion-select class="dropdown" formControlName="bussinessType">\n            <ion-option value="Coffee">Coffee</ion-option>\n            <ion-option value="Tea">Tea</ion-option>\n          </ion-select>\n        </ion-item>\n\n        <ion-item>\n          <img src="assets/images/web.png" alt="" item-left class="webimg">\n          <ion-input type="text" placeholder="Website" formControlName="website"></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <img src="assets/images/add_photo.png" alt="" item-left class="webimg">\n\n          <ion-input disabled="true" type="text" placeholder=\'Add your business photo\'></ion-input>\n\n          <button ion-button clear item-right type="button" (click)="pickImage()" [disabled]="gallery.length == 5">\n            <img src="assets/images/camera.png" alt="">\n          </button>\n        </ion-item>\n\n        <ion-row>\n          <ion-col col-4 *ngFor=\'let image of gallery; let i = index\'>\n            <button ion-button clear (click)="deleteImage(i)">\n              <img src="assets/images/close.png" alt="">\n            </button>\n            <img [src]="image" alt="" class="pics">\n          </ion-col>\n        </ion-row>\n\n        <button type="button" (click)="bussinessSubmit()" ion-button round block margin-top [disabled]="!bussinessSignUpForm.valid">SIGN UP AS BUSINESS</button>\n\n      </ion-list>\n    </form>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/bussinessSignUpComplete/bussinessSignUpComplete.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__["a" /* ImagePicker */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["q" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_8__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_9__providers_image_provider__["a" /* ImageProvider */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_base64__["a" /* Base64 */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["e" /* DomSanitizer */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Platform */]])
], BussinessSignUpPage);

//# sourceMappingURL=bussinessSignUpComplete.js.map

/***/ })

});
//# sourceMappingURL=14.main.js.map