webpackJsonp([17],{

/***/ 760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BussinessEditPageModule", function() { return BussinessEditPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__businessEdit__ = __webpack_require__(901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BussinessEditPageModule = (function () {
    function BussinessEditPageModule() {
    }
    return BussinessEditPageModule;
}());
BussinessEditPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__businessEdit__["a" /* BussinessEditPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__businessEdit__["a" /* BussinessEditPage */])],
    })
], BussinessEditPageModule);

//# sourceMappingURL=businessEdit.module.js.map

/***/ }),

/***/ 901:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BussinessEditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_image_provider__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_base64__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var BussinessEditPage = (function () {
    function BussinessEditPage(storage, af, actionSheetCtrl, imagePicker, camera, loadingCtrl, toastCtrl, imageSrv, base64, navCtrl, platform) {
        this.storage = storage;
        this.af = af;
        this.actionSheetCtrl = actionSheetCtrl;
        this.imagePicker = imagePicker;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.imageSrv = imageSrv;
        this.base64 = base64;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.dontShowPredictions = true;
        this.gallery = [];
        this.newAddedGallery = [];
        this.imageCount = 1;
        this.deleteGallery = [];
        this.deleteImageCount = 1;
        this.newUploadGallery = [];
    }
    BussinessEditPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('uid').then(function (response) {
            _this.user = _this.af.object('/businessProfile/' + response);
            _this.user.subscribe(function (data) {
                _this.businessUserData = data;
                console.log(data.bussinessImages);
                _this.gallery = data.bussinessImages;
                console.log('Business Edit USER DATA', _this.businessUserData);
                Object.keys(_this.businessUserData).forEach(function (key) {
                    if (_this.businessEditForm.get(key) !== null) {
                        _this.businessEditForm.get(key).setValue(_this.businessUserData[key]);
                    }
                });
            });
        }, function (error) {
            console.log('something went wrong', error);
        });
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.autocomplete = {
            query: this.businessUserData ? this.businessUserData['address'] : ''
        };
        this.buildEditBusinessForm();
    };
    BussinessEditPage.prototype.updateSearch = function () {
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
    BussinessEditPage.prototype.buildEditBusinessForm = function () {
        console.log('build form');
        this.businessEditForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormGroup */]({
            bussinessName: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */](this.businessUserData ? this.businessUserData.bussinessName : '', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            address: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */](this.businessUserData ? this.businessUserData['address'] : '', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
            ]),
            phoneNumber: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */](this.businessUserData ? this.businessUserData['phoneNumber'] : '', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[0-9]{10,10}")]),
            alternateNumber: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */](this.businessUserData ? this.businessUserData['alternateNumber'] : '', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[0-9]{10,10}")),
            bussinessType: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */](this.businessUserData ? this.businessUserData['bussinessType'] : ''),
            website: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */](this.businessUserData ? this.businessUserData['website'] : ''),
            bussinessImages: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */](''),
        });
    };
    BussinessEditPage.prototype.updateBusiness = function () {
        if (this.businessEditForm.valid) {
            if (this.gallery.length) {
                this.loading = this.loadingCtrl.create({
                    content: 'Updating your business...'
                });
                this.loading.present();
                if (this.deleteGallery.length) {
                    this.deleteMedia(this.deleteGallery[0]);
                }
                else if (this.newAddedGallery.length) {
                    this.uploadMedia(this.newAddedGallery[0]);
                }
                else {
                    this.saveBussinessForm();
                }
            }
            else {
                var toast = this.toastCtrl.create({
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
    };
    BussinessEditPage.prototype.deleteMedia = function (filePath) {
        var _this = this;
        this.imageSrv.deleteImageFile(filePath, 'Bussiness').then(function () {
            if (_this.deleteGallery.length !== _this.deleteImageCount) {
                _this.deleteImageCount++;
                console.log('Add for image number from array', _this.deleteImageCount);
                _this.deleteMedia(_this.deleteGallery[_this.deleteImageCount - 1]);
            }
            else {
                console.log('Jarvis did Image clean UP');
                if (_this.newAddedGallery.length) {
                    _this.uploadMedia(_this.newAddedGallery[0]);
                }
                else {
                    _this.businessEditForm.get('bussinessImages').setValue(_this.gallery);
                    _this.saveBussinessForm();
                }
            }
        });
    };
    BussinessEditPage.prototype.uploadMedia = function (filePath) {
        var _this = this;
        console.log('Image Upload path', filePath);
        this.base64.encodeFile(filePath).then(function (base64File) {
            var newUrl = base64File.replace(/\*;charset=utf-8/g, "jpeg");
            console.log('data:image/jpeg;base64,', newUrl);
            _this.imageSrv.uploadImage(newUrl, 'Bussiness')
                .then(function (data) {
                console.log('Uploaded Path', data.metadata.downloadURLs[0]);
                _this.newUploadGallery.push(data.metadata.downloadURLs[0]);
                if (_this.newAddedGallery.length !== _this.imageCount) {
                    _this.imageCount++;
                    console.log('Add for image number from array', _this.imageCount);
                    _this.uploadMedia(_this.newAddedGallery[_this.imageCount - 1]);
                }
                else {
                    _this.gallery.forEach(function (element, index) {
                        if (_this.platform.is('ios')) {
                            if (!_this.gallery[index].match(/http:\/\//g)) {
                                _this.newUploadGallery.push(_this.gallery[index]);
                            }
                        }
                        else {
                            if (!_this.gallery[index].match(/file:\/\/\//g)) {
                                _this.newUploadGallery.push(_this.gallery[index]);
                            }
                        }
                    });
                    console.log('All set done', _this.newUploadGallery);
                    _this.businessEditForm.get('bussinessImages').setValue(_this.newUploadGallery);
                    _this.saveBussinessForm();
                }
            }, function (error) {
                console.log('Uploaded error', error);
            });
        });
    };
    BussinessEditPage.prototype.saveBussinessForm = function () {
        var _this = this;
        console.log('save business form');
        var user = this.businessEditForm.value;
        if (this.location) {
            user['location'] = this.location;
        }
        this.storage.get('uid').then(function (response) {
            _this.af.object('/businessProfile/' + response).update(user);
            _this.loading.dismiss();
            _this.navCtrl.setRoot('BussinessAddMenuPage');
        });
    };
    BussinessEditPage.prototype.pickImage = function () {
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
    BussinessEditPage.prototype.pickImg = function () {
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
                        console.log('Gallery selected', localFile);
                        _this.gallery.push(localFile);
                        _this.newAddedGallery.push(localFile);
                    }
                    else {
                        // This will only print when on Android
                        console.log('I am an Android device!');
                        _this.gallery.push(results[i]);
                        _this.newAddedGallery.push(results[i]);
                    }
                }
            }
        }, function (err) { });
    };
    BussinessEditPage.prototype.takePicture = function (sourceType) {
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
                _this.newAddedGallery.push(localFile);
            }
            else {
                // This will only print when on Android
                console.log('I am an Android device!');
                _this.gallery.push(imagePath);
                _this.newAddedGallery.push(imagePath);
            }
        }, function (err) {
            console.log(err);
        });
    };
    BussinessEditPage.prototype.deleteImage = function (i) {
        this.deleteGallery.push(this.gallery[i]);
        this.gallery.splice(i, 1);
    };
    BussinessEditPage.prototype.chooseItem = function (item) {
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
    BussinessEditPage.prototype.dismiss = function () {
        this.autocomplete.query = '';
        this.dontShowPredictions = true;
    };
    return BussinessEditPage;
}());
BussinessEditPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'bussiness-edit',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/businessEdit/businessEdit.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>\n		Edit Business\n		</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<ion-grid class="businessEditForm">\n		\n			<form [formGroup]="businessEditForm" novalidate>\n				<ion-list no-lines>\n				<ion-item>\n					<img src="assets/images/user.png" alt="" item-left>\n					<ion-input type="text" placeholder="Business Name" formControlName="bussinessName" ></ion-input>\n				</ion-item>\n				<div *ngIf="!businessEditForm.controls.bussinessName.valid && (businessEditForm.controls.bussinessName.dirty ||businessEditForm.controls.bussinessName.touched)" class="error">\n					<div [hidden]="!businessEditForm.controls.bussinessName.errors.required">\n					  *Business name is required.\n					</div>\n				</div>\n\n				<ion-item>\n						<img src="assets/images/address.png" alt="" item-left class="webimg">\n					<!-- <ion-input type="text" placeholder="Address" formControlName="address" [(ngModel)]="autocomplete.query" (ngModelChange)="updateSearch()" required></ion-input> -->\n					<ion-searchbar type="text" placeholder="Address" formControlName="address" [(ngModel)]="autocomplete.query" (ionInput)="updateSearch()" (ionCancel)="dismiss()"\n					required></ion-searchbar>\n				</ion-item>\n				<div *ngIf="!businessEditForm.controls.address.valid && (businessEditForm.controls.address.dirty ||businessEditForm.controls.address.touched)" class="error">\n					<div [hidden]="!businessEditForm.controls.address.errors.required">\n					  *Address is required.\n					</div>\n				</div>\n\n				<ion-list [hidden]="dontShowPredictions">\n						<ion-item *ngFor="let item of autocompleteItems" (click)="chooseItem(item)">\n							{{ item.description }}\n						</ion-item>\n				</ion-list>\n		\n				<ion-item>\n					<img src="assets/images/phone.png" alt="" item-left>\n					<ion-input type="number" placeholder="Phone Number" formControlName="phoneNumber" required></ion-input>\n				</ion-item>\n				<div *ngIf="!businessEditForm.controls.phoneNumber.valid && (businessEditForm.controls.phoneNumber.dirty ||businessEditForm.controls.phoneNumber.touched)" class="error">\n					<div [hidden]="!businessEditForm.controls.phoneNumber.errors.required">\n					  *Phone number is required.\n					</div>\n					<div [hidden]="!businessEditForm.controls.phoneNumber.errors.pattern">\n					  *10 digits are allowed.\n					</div>\n				</div>\n\n				<ion-item>\n					<img src="assets/images/phone.png" alt="" item-left>\n					<ion-input type="number" placeholder="Alternate Number" formControlName="alternateNumber" required></ion-input>\n				</ion-item>\n				<div *ngIf="!businessEditForm.controls.alternateNumber.valid && (businessEditForm.controls.alternateNumber.dirty || businessEditForm.controls.alternateNumber.touched)" class="error">\n					<div [hidden]="!businessEditForm.controls.alternateNumber.errors.pattern">\n						*10 digits are allowed.\n					  </div>\n				</div>\n\n				<ion-item>\n						<ion-icon ios="ios-mail" md="md-mail" item-left></ion-icon>\n						<ion-input type="email" placeholder="Business Email Address" formControlName="email" required></ion-input>\n					  </ion-item>\n					  <div *ngIf="!businessEditForm.controls.email.valid && (businessEditForm.controls.email.dirty ||businessEditForm.controls.email.touched)" class="error">\n						<div [hidden]="!businessEditForm.controls.email.errors.required">\n						  *Business email is required.\n						</div>\n						<div [hidden]="!businessEditForm.controls.email.errors.pattern">\n						  *Email is not valid.\n						</div>\n					  </div>\n\n				<ion-item>\n					<img src="assets/images/bus_type.png" alt="" item-left class="webimg">\n					<ion-label>Business Type</ion-label>\n					<ion-select class="dropdown" formControlName="bussinessType">\n						<ion-option value="Coffee">Coffee</ion-option>\n						<ion-option value="Tea">Tea</ion-option>\n					</ion-select>\n				</ion-item>\n\n				<ion-item>\n					<img src="assets/images/web.png" alt="" item-left class="webimg">\n					<ion-input type="text" placeholder="Website" formControlName="website"></ion-input>\n				</ion-item>\n\n				<ion-item>\n						<img src="assets/images/add_photo.png" alt="" item-left class="webimg">\n\n						<ion-input disabled="true" type="text" placeholder=\'Add your business photo\'></ion-input>\n\n						<button ion-button clear  item-right type="button" (click)="pickImage()" [disabled]="gallery.length == 5">\n								<img src="assets/images/camera.png" alt="">\n						</button>\n					</ion-item>	\n\n					<ion-row>\n							<ion-col col-4 *ngFor=\'let image of gallery; let i = index\'>\n									<button ion-button clear (click)="deleteImage(i)">\n											<img src="assets/images/close.png" alt="">\n									</button>\n									<img [src]="image" alt="" class="pics">\n							</ion-col>\n						</ion-row>\n		\n				<button type="button" (click)="updateBusiness()" ion-button round block margin-top [disabled]="!businessEditForm.valid">UPDATE BUSINESS</button>\n\n				</ion-list>\n			</form>\n	</ion-grid>\n	\n	</ion-content>'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/businessEdit/businessEdit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__providers_image_provider__["a" /* ImageProvider */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_base64__["a" /* Base64 */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Platform */]])
], BussinessEditPage);

//# sourceMappingURL=businessEdit.js.map

/***/ })

});
//# sourceMappingURL=17.main.js.map