webpackJsonp([7],{

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditProfilePageModule", function() { return EditProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__edit_profile__ = __webpack_require__(915);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var EditProfilePageModule = (function () {
    function EditProfilePageModule() {
    }
    return EditProfilePageModule;
}());
EditProfilePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__edit_profile__["a" /* EditProfilePage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__edit_profile__["a" /* EditProfilePage */])],
    })
], EditProfilePageModule);

//# sourceMappingURL=edit-profile.module.js.map

/***/ }),

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_image_provider__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var EditProfilePage = EditProfilePage_1 = (function () {
    function EditProfilePage(geolocation, storage, navCtrl, af, auth, imageSrv, camera) {
        var _this = this;
        this.geolocation = geolocation;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.af = af;
        this.auth = auth;
        this.imageSrv = imageSrv;
        this.camera = camera;
        this.editprofilePage = EditProfilePage_1;
        this.showUserDetails = false;
        this.dontShowPredictions = true;
        this.editForm = new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["e" /* FormGroup */]({
            name: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* Validators */].pattern("[a-zA-Z][a-zA-Z ]+")]),
            phoneNumber: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["g" /* Validators */].pattern("[0-9]{10,10}")]),
            address: new __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* FormControl */](''),
        });
        this.storage.get('uid').then(function (response) {
            _this.uid = response;
            _this.af.object('/userProfile/' + response)
                .subscribe(function (data) {
                _this.userDetails = data;
                console.log('userDetails', data);
            });
        });
    }
    EditProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems = [];
        this.geolocation.getCurrentPosition({ timeout: 30000, enableHighAccuracy: true }).then(function (resp) {
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            _this.getMapDetails(latLng).then(function (data) {
                if (!_this.userDetails.address) {
                    _this.userDetails.address = data;
                }
            }).catch(function (e) {
                console.log('sorry Jarvis cant mapp anything');
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    EditProfilePage.prototype.getMapDetails = function (latLng) {
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
    EditProfilePage.prototype.onSubmit = function (form) {
        var _this = this;
        this.storage.get('uid').then(function (response) {
            console.log(form.value);
            _this.af.object('/userProfile/' + response).update(form.value);
            _this.navCtrl.setRoot('ProfileDetailsPage');
        });
    };
    EditProfilePage.prototype.updateSearch = function () {
        console.log('Update me', this.finalSearchValue, this.userDetails.address);
        // console.log('modal > updateSearch');
        if (this.userDetails.address == '' || this.userDetails.address === this.finalSearchValue) {
            this.autocompleteItems = [];
            return;
        }
        var self = this;
        var config = {
            //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
            input: this.userDetails.address,
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
    EditProfilePage.prototype.chooseItem = function (item) {
        var geocoder = new google.maps.Geocoder();
        this.userDetails.address = item.description;
        this.finalSearchValue = item.description;
        this.dontShowPredictions = true;
    };
    EditProfilePage.prototype.dismiss = function () {
        this.userDetails.address = '';
        this.dontShowPredictions = true;
    };
    return EditProfilePage;
}());
EditProfilePage = EditProfilePage_1 = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-edit-profile',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/profile-details/edit-profile/edit-profile.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Update Profile</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n<ion-content padding>\n\n\n\n  <form #editProfile="ngForm" [formGroup]="editForm" (ngSubmit)="onSubmit(editProfile)">\n\n    <ion-grid *ngIf="userDetails">\n\n\n\n      <ion-list no-lines>\n\n        <ion-item>\n\n          <ion-label stacked>Name</ion-label>\n\n          <ion-input type="text" placeholder="Name" name="name" formControlName="name" [(ngModel)]="userDetails.name" required></ion-input>\n\n        </ion-item>\n\n\n\n        <div *ngIf="!editForm.controls.name.valid && (editForm.controls.name.dirty || editForm.controls.name.touched)" class="error">\n\n          <div [hidden]="!editForm.controls.name.errors.required">\n\n            *Name is required.\n\n          </div>\n\n          <div [hidden]="!editForm.controls.name.errors.pattern">\n\n            *Invalid Name format.\n\n          </div>\n\n        </div>\n\n\n\n        <!-- <ion-item >\n\n          <ion-label stacked>Email</ion-label>\n\n          <ion-input type="email" placeholder="Email" name="email" [(ngModel)]="userDetails.email" required></ion-input>\n\n        </ion-item> -->\n\n\n\n        <ion-item>\n\n          <ion-label stacked>Contact no.</ion-label>\n\n          <ion-input type="number" placeholder="Contact" name="phoneNumber" formControlName="phoneNumber" [(ngModel)]="userDetails.phoneNumber"\n\n            required></ion-input>\n\n        </ion-item>\n\n\n\n        <div *ngIf="!editForm.controls.phoneNumber.valid && (editForm.controls.phoneNumber.dirty || editForm.controls.phoneNumber.touched)"\n\n          class="error">\n\n          <div [hidden]="!editForm.controls.phoneNumber.errors.required">\n\n            *Phone number is required.\n\n          </div>\n\n          <div [hidden]="!editForm.controls.phoneNumber.errors.pattern">\n\n            *10 digits are allowed.\n\n          </div>\n\n        </div>\n\n\n\n\n\n        <ion-label stacked>Address</ion-label>\n\n        <!-- <ion-input name="address" name="address" [(ngModel)]="userDetails.address" formControlName="address" (ngModelChange)="updateSearch()"\n\n            required></ion-input> -->\n\n        <ion-searchbar required name="address" [(ngModel)]="userDetails.address" formControlName="address" (ionInput)="updateSearch()"\n\n          (ionCancel)="dismiss()" placeholder="Start typing and select ...">\n\n        </ion-searchbar>\n\n        <ion-list [hidden]="dontShowPredictions">\n\n          <ion-item *ngFor="let item of autocompleteItems" (click)="chooseItem(item)">\n\n            {{ item.description }}\n\n          </ion-item>\n\n        </ion-list>\n\n      </ion-list>\n\n    </ion-grid>\n\n\n\n    <ion-row class="saveBtn">\n\n      <button ion-button round block margin-top color="secondary" [disabled]="!editProfile.valid">SAVE</button>\n\n    </ion-row>\n\n  </form>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/profile-details/edit-profile/edit-profile.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
        __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_5__providers_image_provider__["a" /* ImageProvider */],
        __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]])
], EditProfilePage);

var EditProfilePage_1;
//# sourceMappingURL=edit-profile.js.map

/***/ })

});
//# sourceMappingURL=7.main.js.map