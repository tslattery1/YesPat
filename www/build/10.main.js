webpackJsonp([10],{

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login__ = __webpack_require__(910);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    return LoginPageModule;
}());
LoginPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__login__["a" /* LoginPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__login__["a" /* LoginPage */])],
    })
], LoginPageModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_onesignal__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_component__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(navCtrl, menuCtrl, auth, storage, alertCtrl, af, app, event, oneSignal, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.auth = auth;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.af = af;
        this.app = app;
        this.event = event;
        this.oneSignal = oneSignal;
        this.loadingCtrl = loadingCtrl;
        this.validLoginDetails = true;
    }
    LoginPage.prototype.ngOnInit = function () {
        this.menuCtrl.enable(false);
    };
    LoginPage.prototype.onSubmit = function (form) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'logging you in...'
        });
        this.loading.present();
        var user = form.value;
        this.auth.loginUser(form.value.email, form.value.password)
            .then(function (authData) {
            _this.storage.set("uid", authData.uid);
            var userData = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('/userProfile/');
            userData.child(authData.uid).once("value", function (snapshot) {
                var userInfo = {
                    username: snapshot.val().username,
                    user_role: snapshot.val().user_role,
                    points: snapshot.val().points
                };
                _this.oneSignal.getIds().then(function (ids) {
                    var userData = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('/userProfile/');
                    userData.child(authData.uid).update({
                        playerId: ids.userId,
                        pushToken: ids.pushToken,
                    });
                    _this.storage.set("userInfo", userInfo);
                    _this.event.publish('userLogin', { "name": snapshot.val().name, "user_role": snapshot.val().user_role, "points": snapshot.val().points });
                    _this.menuCtrl.enable(true);
                    console.log('Role Login', snapshot.val().user_role);
                    if (snapshot.val().user_role !== 'bussinesssUser') {
                        console.log('Normal User');
                        if (_this.loading) {
                            _this.loading.dismiss();
                        }
                        _this.navCtrl.setRoot('PostFindspotPage');
                    }
                    else {
                        console.log('Bussiness User', authData.uid);
                        _this.users = _this.af.object('/businessProfile/' + authData.uid);
                        _this.users.subscribe(function (data) {
                            if (data.$value !== null) {
                                if (!data.bussiness_verify) {
                                    if (_this.loading) {
                                        _this.loading.dismiss();
                                    }
                                    _this.navCtrl.setRoot('BussinessVerificationAlertPage');
                                }
                                else {
                                    if (_this.loading) {
                                        _this.loading.dismiss();
                                    }
                                    _this.navCtrl.setRoot('BussinessAddMenuPage');
                                }
                            }
                            else {
                                if (_this.loading) {
                                    _this.loading.dismiss();
                                }
                                _this.navCtrl.setRoot('BussinessSignUpPage');
                            }
                        }, function (error) {
                            if (_this.loading) {
                                _this.loading.dismiss();
                            }
                            console.log('Error', error);
                        });
                    }
                    // this.navCtrl.setRoot(MyApp);
                });
                //console.log(JSON.stringify(data));
            }).catch(function (error) {
                if (_this.loading) {
                    _this.loading.dismiss();
                }
            });
            //this.users.push({'username':'prasadr'});
            // console.log(this.users);
            /*   setTimeout(()=>{
                 window.location.reload();
               },150)*/
        }, function (error) {
            console.log(error.message);
            _this.validLoginDetails = false;
            if (_this.loading) {
                _this.loading.dismiss();
            }
        });
    };
    LoginPage.prototype.gotoSignUpPage = function () {
        this.navCtrl.push('SignupPage');
    };
    LoginPage.prototype.forgotpassPage = function () {
        this.navCtrl.push('ForgotpasswordPage');
    };
    return LoginPage;
}());
LoginPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_5" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/login/login.html"*/'<ion-header>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid class="mainHeader">\n    <img src="assets/images/Sign_In.png" alt="logo">\n    <!-- <h1>Parking Sharing</h1> -->\n  </ion-grid>\n\n  <ion-grid class="loginForm">\n    <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">\n      <ion-list no-lines>\n        <ion-item margin-bottom>\n          <ion-icon ios="ios-mail" md="md-mail" item-left></ion-icon>\n          <ion-input type="email" placeholder="email" name="email" ngModel required></ion-input>\n        </ion-item>\n\n        <ion-item>\n          <ion-icon ios="ios-lock" md="md-lock" item-left></ion-icon>\n          <ion-input type="password" placeholder="Password" name="password" ngModel required></ion-input>\n        </ion-item>\n      </ion-list>\n\n      <p text-center>\n        <a (click)="forgotpassPage()">Forgot Password?</a>\n      </p>\n\n      <button ion-button round block margin-top [disabled]="!loginForm.valid">LOGIN</button>\n      <div *ngIf="!validLoginDetails" class="error">\n        <div style="text-align: center" [hidden]="validLoginDetails">\n          *Invalid Email / Password.\n        </div>\n      </div>\n    </form>\n  </ion-grid>\n\n  <ion-grid class="signUp">\n    <p text-center>New User?</p>\n    <button ion-button round block margin-top color="dark" (click)="gotoSignUpPage()">SIGN UP</button>\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_7__app_app_component__["a" /* MyApp */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* Events */],
        __WEBPACK_IMPORTED_MODULE_0__ionic_native_onesignal__["a" /* OneSignal */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

});
//# sourceMappingURL=10.main.js.map