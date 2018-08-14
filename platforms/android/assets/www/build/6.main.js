webpackJsonp([6],{

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileDetailsPageModule", function() { return ProfileDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_details__ = __webpack_require__(916);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var ProfileDetailsPageModule = (function () {
    function ProfileDetailsPageModule() {
    }
    return ProfileDetailsPageModule;
}());
ProfileDetailsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__profile_details__["a" /* ProfileDetailsPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__profile_details__["a" /* ProfileDetailsPage */])],
    })
], ProfileDetailsPageModule);

//# sourceMappingURL=profile-details.module.js.map

/***/ }),

/***/ 916:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*import { EditProfilePage } from "./edit-profile/edit-profile";*/








var ProfileDetailsPage = (function () {
    function ProfileDetailsPage(storage, navCtrl, af, auth, alertCtrl, loadingCtrl, toastCtrl, http) {
        var _this = this;
        this.storage = storage;
        this.navCtrl = navCtrl;
        this.af = af;
        this.auth = auth;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.showUserDetails = false;
        this.storage.get('uid').then(function (response) {
            var userData = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/userProfile/' + response);
            userData.once("value", function (snapshot) {
                _this.userDetails = snapshot.val();
            });
        });
    }
    ProfileDetailsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.get('uid').then(function (uid) {
            var userData = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database().ref('/userProfile/');
            userData.child(uid).once("value", function (snapshot) {
                _this.prepareRequest('http://yaspat.deapps.io:3002/users/get_agreement', "agreement_id=" + snapshot.val().subscription).subscribe(function (data) {
                    var agreementDetails = JSON.parse(data._body);
                    _this.subscriptionStatus = agreementDetails.user_state;
                    if (agreementDetails && agreementDetails.agreement_details.next_billing_date) {
                        var str = agreementDetails.agreement_details.next_billing_date;
                        var date = new Date(str);
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        _this.renewalDate = { day: day, month: month, year: year, agreementId: agreementDetails.id };
                    }
                    else {
                        _this.renewalDate = null;
                    }
                });
            });
        });
    };
    ProfileDetailsPage.prototype.unSubscribe = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Unsubscribe',
            message: 'Are you sure you want to unsubscribe?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.loader = _this.loadingCtrl.create({
                            content: 'Unsubscribing...'
                        });
                        _this.loader.present();
                        _this.prepareRequest('http://yaspat.deapps.io:3002/users/cancel_agreement', "agreement_id=" + _this.renewalDate.agreementId).subscribe(function (data) {
                            var cancelData = JSON.parse(data._body);
                            if (cancelData.statusCode == 204) {
                                _this.loader.dismiss();
                                var toast = _this.toastCtrl.create({
                                    message: 'Unsubscribed Successfully',
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.onDidDismiss(function () {
                                    _this.ionViewDidEnter();
                                });
                                toast.present();
                            }
                            else {
                                _this.loader.dismiss();
                                var toast = _this.toastCtrl.create({
                                    message: 'Something went wrong',
                                    duration: 3000,
                                    position: 'top'
                                });
                                toast.present();
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    ProfileDetailsPage.prototype.prepareRequest = function (url, body) {
        var _this = this;
        var options = {
            headers: this.prepareHeaders(),
        };
        return this.http.post(url, body, options)
            .map(function (res) { return _this.prepareData(res); }).catch(function (error) { return _this.handleError(error); });
    };
    ProfileDetailsPage.prototype.handleError = function (err) {
        if (err) {
        }
        return __WEBPACK_IMPORTED_MODULE_7_rxjs__["Observable"].throw(2, err);
    };
    ProfileDetailsPage.prototype.prepareData = function (res) {
        return res;
    };
    ProfileDetailsPage.prototype.prepareHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_6__angular_http__["c" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    };
    ProfileDetailsPage.prototype.gotoEditProfilePage = function () {
        this.navCtrl.push('EditProfilePage');
    };
    return ProfileDetailsPage;
}());
ProfileDetailsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-profile-details',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/profile-details/profile-details.html"*/'<ion-header>\n  <ion-navbar hide-back-button>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Profile Details</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid *ngIf="userDetails">\n      \n      <ion-row *ngIf="userDetails.user_role !== \'bussinesssUser\'">\n        <ion-col col-4>Points</ion-col>\n        <ion-col>{{userDetails.points}}</ion-col>\n      </ion-row>\n\n    <ion-row>\n      <ion-col col-4>Name</ion-col>\n      <ion-col>{{userDetails.name}}</ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-4>Email</ion-col>\n      <ion-col>{{userDetails.email}}</ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-4>Contact no.</ion-col>\n      <ion-col>{{userDetails.phoneNumber}}</ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-4>Address</ion-col>\n      <ion-col>{{userDetails.address}}</ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-row>\n    <ion-item margin-top *ngIf="renewalDate">\n      <h4>Subscription Renewal Date</h4>\n      <p>{{renewalDate?.day}}/{{renewalDate?.month}}/{{renewalDate?.year}}</p>\n\n\n      <a item-end (click)="unSubscribe()">\n            <img SRC="https://www.paypalobjects.com/en_US/i/btn/btn_unsubscribe_LG.gif" BORDER="0">\n          </a>\n    </ion-item>\n  </ion-row>\n\n  <ion-row>\n    <ion-item margin-top>\n      <h4>Subscription Status</h4>\n      <p>{{subscriptionStatus}}</p>\n    </ion-item>\n  </ion-row>\n\n  <ion-row class="editBtn">\n    <button ion-button round small (click)="gotoEditProfilePage()">Edit Profile</button>\n  </ion-row>\n\n\n</ion-content>'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/profile-details/profile-details.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */]])
], ProfileDetailsPage);

//# sourceMappingURL=profile-details.js.map

/***/ })

});
//# sourceMappingURL=6.main.js.map