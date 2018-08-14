webpackJsonp([5],{

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__signup__ = __webpack_require__(917);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var SignupPageModule = (function () {
    function SignupPageModule() {
    }
    return SignupPageModule;
}());
SignupPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__signup__["a" /* SignupPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__signup__["a" /* SignupPage */])],
    })
], SignupPageModule);

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 917:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_onesignal__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var SignupPage = (function () {
    function SignupPage(navCtrl, loadingCtrl, toastCtrl, oneSignal, storage, auth, http, alertCtrl, af) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.oneSignal = oneSignal;
        this.storage = storage;
        this.auth = auth;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.af = af;
        var userData = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database().ref();
        userData.child('AppSettings').once("value", function (snapshot) {
            _this.hideSignUpButton = snapshot.val().UserSignUp || false;
        });
        this.signupForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormGroup */]({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[a-zA-Z][a-zA-Z ]+")]),
            phoneNumber: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[0-9]{10,10}")]),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}")
            ]),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(6),
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required
            ]),
            confirmpass: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', [
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required,
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].minLength(6),
            ])
        }, passwordMatchValidator);
        function passwordMatchValidator(g) {
            return g.get('password').value === g.get('confirmpass').value
                ? null : { 'mismatch': true };
        }
    }
    SignupPage.prototype.NoWhitespaceValidator = function (control) {
        var isWhitespace = (control.value || '').trim().length === 0;
        var isValid = !isWhitespace;
        return isValid ? null : { 'whitespace': true };
    };
    SignupPage.prototype.userSubmit = function () {
        var _this = this;
        if (this.signupForm.valid) {
            console.log(this.signupForm.value);
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...',
            });
            this.loading.present();
            var user_1 = this.signupForm.value;
            this.oneSignal.getIds().then(function (ids) {
                var playerId = ids.userId;
                var pushToken = ids.pushToken;
                _this.auth.signupUser(user_1.email, user_1.password, user_1.name, user_1.phoneNumber, playerId, pushToken, 'normalUser')
                    .then(function () {
                    _this.prepareRequest('http://yaspat.deapps.io:3002/users/api/is_referred/' + user_1.phoneNumber, null, 'post').subscribe(function (data) {
                        console.log('Data =>>', JSON.parse(data._body));
                        var responseData = JSON.parse(data._body);
                        if (responseData.status) {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            var userData = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database().ref('/userProfile/');
                            userData.child(responseData.user_key).once("value", function (snapshot) {
                                var alert = _this.alertCtrl.create({
                                    title: snapshot.val().name,
                                    subTitle: 'You have been rewarded 20 points by referral sucessfull registration',
                                    buttons: ['OK']
                                });
                                alert.present();
                                var toast = _this.toastCtrl.create({
                                    message: 'Account created successfully',
                                    duration: 2000,
                                    position: 'middle'
                                });
                                _this.storage.clear();
                                _this.auth.logoutUser()
                                    .then(function () {
                                });
                                localStorage.clear();
                                toast.present();
                                _this.navCtrl.pop();
                                _this.signupForm.reset();
                                var referralRewardData = {
                                    userName: user_1.name
                                };
                                _this.af.object('/userProfile/' + responseData.user_key).update({ referralRewardData: referralRewardData });
                                var notificationObj = {
                                    "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
                                    headings: { "en": 'Referral Reward' },
                                    "contents": { "en": 'You have been rewarded 20 points from ' + user_1.name + ' sucessfull registration' },
                                    data: { Root: false, DirectNavigatePage: false },
                                    include_player_ids: [snapshot.val().playerId]
                                };
                                console.log('Hello One Signal object', notificationObj);
                                window["plugins"].OneSignal.postNotification(notificationObj, function (successResponse) {
                                    // console.log("Notification Success: ", successResponse);
                                }, function (failedResponse) {
                                    // console.log("Notification Post Failed: ", failedResponse);
                                });
                            });
                        }
                        else {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            var toast = _this.toastCtrl.create({
                                message: 'Account created successfully',
                                duration: 2000,
                                position: 'middle'
                            });
                            _this.storage.clear();
                            _this.auth.logoutUser()
                                .then(function () {
                            });
                            localStorage.clear();
                            toast.present();
                            _this.navCtrl.pop();
                            _this.signupForm.reset();
                        }
                    }, function (error) {
                        // Exceptional case but more than rewards login of user is important. Cant stop user from sign up if rewards API Fail..
                        console.log('Error =>>', error);
                        if (_this.loading) {
                            _this.loading.dismiss();
                        }
                        var toast = _this.toastCtrl.create({
                            message: 'Account created successfully',
                            duration: 2000,
                            position: 'middle'
                        });
                        _this.storage.clear();
                        _this.auth.logoutUser()
                            .then(function () {
                        });
                        localStorage.clear();
                        toast.present();
                        _this.navCtrl.pop();
                        _this.signupForm.reset();
                    });
                }, function (error) {
                    _this.loading.dismiss();
                    var toast = _this.toastCtrl.create({
                        message: error.message,
                        duration: 2000,
                        position: 'middle'
                    });
                    toast.present();
                });
            });
        }
    };
    SignupPage.prototype.bussinessSubmit = function () {
        var _this = this;
        if (this.signupForm.valid) {
            console.log(this.signupForm.value);
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...',
            });
            this.loading.present();
            var user_2 = this.signupForm.value;
            this.oneSignal.getIds().then(function (ids) {
                var playerId = ids.userId;
                var pushToken = ids.pushToken;
                _this.auth.signupUser(user_2.email, user_2.password, user_2.name, user_2.phoneNumber, playerId, pushToken, 'bussinesssUser')
                    .then(function (data) {
                    _this.prepareRequest('http://yaspat.deapps.io:3002/users/api/is_referred/' + user_2.phoneNumber, null, 'post').subscribe(function (data) {
                        console.log('Data =>>', JSON.parse(data._body));
                        var responseData = JSON.parse(data._body);
                        if (responseData.status) {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            var userData = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database().ref('/userProfile/');
                            userData.child(responseData.user_key).once("value", function (snapshot) {
                                var alert = _this.alertCtrl.create({
                                    title: snapshot.val().name,
                                    subTitle: 'You have been rewarded 20 points by referral sucessfull registration',
                                    buttons: ['OK']
                                });
                                alert.present();
                                var toast = _this.toastCtrl.create({
                                    message: 'Account created successfully',
                                    duration: 2000,
                                    position: 'middle'
                                });
                                _this.storage.clear();
                                _this.auth.logoutUser()
                                    .then(function () {
                                });
                                localStorage.clear();
                                toast.present();
                                _this.navCtrl.push('BussinessSignUpPage', { UID: data });
                                _this.signupForm.reset();
                                var referralRewardData = {
                                    userName: user_2.name
                                };
                                _this.af.object('/userProfile/' + responseData.user_key).update({ referralRewardData: referralRewardData });
                                var notificationObj = {
                                    "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
                                    headings: { "en": 'Referral Reward' },
                                    "contents": { "en": 'You have been rewarded 20 points from ' + user_2.name + ' sucessfull registration' },
                                    data: { Root: false, DirectNavigatePage: false },
                                    include_player_ids: [snapshot.val().playerId]
                                };
                                console.log('Hello One Signal object', notificationObj);
                                window["plugins"].OneSignal.postNotification(notificationObj, function (successResponse) {
                                    // console.log("Notification Success: ", successResponse);
                                }, function (failedResponse) {
                                    // console.log("Notification Post Failed: ", failedResponse);
                                });
                            });
                        }
                        else {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            var toast = _this.toastCtrl.create({
                                message: 'Account created successfully',
                                duration: 2000,
                                position: 'middle'
                            });
                            _this.storage.clear();
                            _this.auth.logoutUser()
                                .then(function () {
                            });
                            localStorage.clear();
                            toast.present();
                            _this.navCtrl.push('BussinessSignUpPage', { UID: data });
                            _this.signupForm.reset();
                        }
                    }, function (error) {
                        // Exceptional case but more than rewards login of user is important. Cant stop user from sign up if rewards API Fail..
                        console.log('Error =>>', error);
                        if (_this.loading) {
                            _this.loading.dismiss();
                        }
                        var toast = _this.toastCtrl.create({
                            message: 'Account created successfully',
                            duration: 2000,
                            position: 'middle'
                        });
                        _this.storage.clear();
                        _this.auth.logoutUser()
                            .then(function () {
                        });
                        localStorage.clear();
                        toast.present();
                        _this.navCtrl.push('BussinessSignUpPage', { UID: data });
                        _this.signupForm.reset();
                    });
                }, function (error) {
                    _this.loading.dismiss();
                    var toast = _this.toastCtrl.create({
                        message: error.message,
                        duration: 2000,
                        position: 'middle'
                    });
                    toast.present();
                });
            });
        }
    };
    SignupPage.prototype.prepareRequest = function (url, body, method) {
        var _this = this;
        var options = {
            url: url,
            method: method,
            headers: this.prepareHeaders(),
            body: body
        };
        return this.http.request(url, options)
            .map(function (res) { return _this.prepareData(res); }).catch(function (error) { return _this.handleError(error); });
    };
    SignupPage.prototype.handleError = function (err) {
        // console.log('handleError',err)
        if (err) {
            console.log('ERROR', err);
            // Handled for cases where might be Api not able to response error message
        }
        return __WEBPACK_IMPORTED_MODULE_9_rxjs__["Observable"].throw(2, err);
    };
    SignupPage.prototype.prepareData = function (res) {
        return res;
    };
    SignupPage.prototype.prepareHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["c" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    };
    return SignupPage;
}());
SignupPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_5" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid class="signUpHeader">\n    <h1>SIGN UP</h1>\n  </ion-grid>\n\n  <ion-grid class="signUpForm">\n\n    <form [formGroup]="signupForm" novalidate>\n      <ion-list no-lines>\n        <ion-item>\n          <ion-icon ios="ios-person" md="md-person" item-left></ion-icon>\n          <ion-input type="text" placeholder="Name" formControlName="name"></ion-input>\n        </ion-item>\n        <div *ngIf="!signupForm.controls.name.valid && (signupForm.controls.name.dirty ||signupForm.controls.name.touched)" class="error">\n          <div [hidden]="!signupForm.controls.name.errors.required">\n            *Name is required.\n          </div>\n          <div [hidden]="!signupForm.controls.name.errors.pattern">\n            *Invalid Name format.\n          </div>\n        </div>\n        <!-- <ion-item>\n          <ion-icon ios="ios-person" md="md-person" item-left></ion-icon>\n          <ion-input type="text" placeholder="Username" formControlName="username" required></ion-input>\n        </ion-item>\n        <div *ngIf="!signupForm.controls.username.valid && (signupForm.controls.username.dirty ||signupForm.controls.username.touched)"\n          class="error">\n          <div [hidden]="!signupForm.controls.username.errors.required">\n            *Username is required.\n          </div>\n        </div> -->\n\n        <ion-item>\n          <ion-icon ios="ios-phone-portrait" md="md-phone-portrait" item-left></ion-icon>\n          <ion-input type="number" placeholder="Phone Number" formControlName="phoneNumber" required></ion-input>\n        </ion-item>\n        <div *ngIf="!signupForm.controls.phoneNumber.valid && (signupForm.controls.phoneNumber.dirty || signupForm.controls.phoneNumber.touched)"\n          class="error">\n          <div [hidden]="!signupForm.controls.phoneNumber.errors.required">\n            *Phone number is required.\n          </div>\n          <div [hidden]="!signupForm.controls.phoneNumber.errors.pattern">\n            *10 digits are allowed.\n          </div>\n        </div>\n\n        <ion-item>\n          <ion-icon ios="ios-mail" md="md-mail" item-left></ion-icon>\n          <ion-input type="email" placeholder="Email Address" formControlName="email" required></ion-input>\n        </ion-item>\n        <div *ngIf="!signupForm.controls.email.valid && (signupForm.controls.email.dirty ||signupForm.controls.email.touched)" class="error">\n          <div [hidden]="!signupForm.controls.email.errors.required">\n            *Email is required.\n          </div>\n          <div [hidden]="!signupForm.controls.email.errors.pattern">\n            *Email is not valid.\n          </div>\n        </div>\n\n        <ion-item>\n          <ion-icon ios="ios-lock" md="md-lock" item-left></ion-icon>\n          <ion-input type="password" placeholder="Password" formControlName="password" required></ion-input>\n        </ion-item>\n        <div *ngIf="!signupForm.controls.password.valid && (signupForm.controls.password.dirty || signupForm.controls.password.touched)"\n          class="error">\n          <div [hidden]="!signupForm.controls.password.errors.required">\n            *password is required.\n          </div>\n          <div [hidden]="!signupForm.controls.password.errors.minLength">\n            *Password must be 8 characters long.\n          </div>\n        </div>\n\n\n        <ion-item>\n          <ion-icon ios="ios-lock" md="md-lock" item-left></ion-icon>\n          <ion-input type="password" placeholder="Confirm Password" formControlName="confirmpass" required></ion-input>\n        </ion-item>\n      </ion-list>\n\n      <button *ngIf="!hideSignUpButton" type="button" (click)="userSubmit()" ion-button round block margin-top [disabled]="!signupForm.valid">SIGN UP AS USER</button>\n      <button type="button" (click)="bussinessSubmit()" ion-button round block margin-top color="dark" [disabled]="!signupForm.valid">SIGN UP AS BUSINESS</button>\n    </form>\n\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/signup/signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_0__ionic_native_onesignal__["a" /* OneSignal */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_6__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=5.main.js.map