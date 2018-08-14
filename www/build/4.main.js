webpackJsonp([4],{

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubscriptionPageModule", function() { return SubscriptionPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subscription__ = __webpack_require__(918);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SubscriptionPageModule = (function () {
    function SubscriptionPageModule() {
    }
    return SubscriptionPageModule;
}());
SubscriptionPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__subscription__["a" /* SubscriptionPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__subscription__["a" /* SubscriptionPage */]),
        ],
    })
], SubscriptionPageModule);

//# sourceMappingURL=subscription.module.js.map

/***/ }),

/***/ 918:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubscriptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SubscriptionPage = (function () {
    function SubscriptionPage(loadingCtrl, af, iab, menuCtrl, toastCtrl, http, navCtrl, navParams, storage, auth) {
        this.loadingCtrl = loadingCtrl;
        this.af = af;
        this.iab = iab;
        this.menuCtrl = menuCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.auth = auth;
    }
    SubscriptionPage.prototype.ngOnInit = function () {
        this.menuCtrl.enable(false);
        this.subscriptionType = this.navParams.get('subscriptionType');
        this.userId = this.navParams.get('uid');
    };
    SubscriptionPage.prototype.logOutuser = function () {
        var _this = this;
        console.log('logOut');
        this.storage.clear();
        this.auth.logoutUser()
            .then(function () {
            _this.navCtrl.setRoot('LoginPage');
            // this.app.getRootNav().setRoot('LoginPage');
        });
        localStorage.clear();
    };
    SubscriptionPage.prototype.subscribeUser = function () {
        var _this = this;
        console.log('Jarvis subscribe this user');
        this.loader = this.loadingCtrl.create({
            content: 'Subscribing...'
        });
        this.loader.present();
        var subscriptionType = this.subscriptionType == 'business' ? 'business' : 'user';
        this.prepareRequest('http://yaspat.deapps.io:3002/users/create_plan', "type=" + subscriptionType, 'post').subscribe(function (data) {
            var response = JSON.parse(data._body);
            console.log('Create Plan Data', response);
            if (response[0].statusCode == 200) {
                var planID_1 = response[0].value.plan_id;
                console.log('Plan Id ', planID_1);
                setTimeout(function () {
                    _this.prepareRequest('http://yaspat.deapps.io:3002/users/create_agreement', "plan_id=" + planID_1, 'post').subscribe(function (data) {
                        var response = JSON.parse(data._body);
                        console.log('Create Agreement', response);
                        if (response[0].statusCode == 200) {
                            setTimeout(function () {
                                var browser = _this.iab.create(response[0].value.approval_url, '_blank', 'location=yes');
                                browser.on('exit').subscribe(function () {
                                    console.log(1);
                                    _this.prepareRequest('http://yaspat.deapps.io:3002/users/execute_agreement', "token=" + response[0].value.token, 'post').subscribe(function (data) {
                                        var tempAgreementID = JSON.parse(data._body);
                                        console.log('execute_agreement', tempAgreementID);
                                        if (tempAgreementID.statusCode == 200) {
                                            var agreementId = tempAgreementID.agreement_id;
                                            console.log('AgreementId', agreementId, _this.userId);
                                            _this.af.object('/userProfile/' + _this.userId).update({ subscription: agreementId }).then(function () {
                                                if (_this.loader) {
                                                    _this.loader.dismiss();
                                                }
                                                _this.menuCtrl.enable(true);
                                                _this.navCtrl.setRoot(_this.subscriptionType == 'business' ? 'BussinessAddMenuPage' : 'PostFindspotPage');
                                            }, function (error) {
                                                if (_this.loader) {
                                                    _this.loader.dismiss();
                                                }
                                                _this.showToast();
                                            });
                                            // firebase.database().ref().child(this.userId).update({ subscription: agreementId }).then(() => {
                                            //   this.menuCtrl.enable(true, 'authenticated');
                                            //   this.navCtrl.setRoot('HomePage');
                                            // }, (error) => {
                                            //   this.showToast();
                                            // });
                                        }
                                        else {
                                            if (_this.loader) {
                                                _this.loader.dismiss();
                                            }
                                            _this.showToast(tempAgreementID.message);
                                        }
                                    }, function (error) {
                                        if (_this.loader) {
                                            _this.loader.dismiss();
                                        }
                                        _this.showToast();
                                    });
                                });
                            }, 1000);
                        }
                        else {
                            if (_this.loader) {
                                _this.loader.dismiss();
                            }
                            _this.showToast();
                        }
                    }, function (error) {
                        if (_this.loader) {
                            _this.loader.dismiss();
                        }
                        _this.showToast();
                    });
                }, 1000);
            }
            else {
                if (_this.loader) {
                    _this.loader.dismiss();
                }
                _this.showToast(response.message);
            }
        }, function (error) {
            if (_this.loader) {
                _this.loader.dismiss();
            }
            _this.showToast();
        });
    };
    SubscriptionPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message || 'Something went wrong.',
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    SubscriptionPage.prototype.prepareRequest = function (url, body, method) {
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
    SubscriptionPage.prototype.handleError = function (err) {
        // console.log('handleError',err)
        if (err) {
            console.log('ERROR', err);
            // Handled for cases where might be Api not able to response error message
        }
        return __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].throw(2, err);
    };
    SubscriptionPage.prototype.prepareData = function (res) {
        return res;
    };
    SubscriptionPage.prototype.prepareHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    };
    return SubscriptionPage;
}());
SubscriptionPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-subscription',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/subscription/subscription.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons>\n      <button ion-button clear (click)="logOutuser()">\n        Logout\n      </button>\n    </ion-buttons>\n    <ion-title>Subscription</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-grid *ngIf="subscriptionType">\n    <ng-template [ngIf]="subscriptionType == \'user\'">\n      <ion-row>\n        <img src="assets/images/Standard-Icon.png" alt="">\n      </ion-row>\n  \n      <ion-row>\n        <h2>Standard</h2>\n        <h6>Get access to find and post parking spot right at your fingertips.</h6>\n      </ion-row>\n  \n      <ion-row>\n        <h1>$1.99 <span>/ per month</span></h1>\n        <p>This ammount will automatically deduct from your account every month.</p>\n      </ion-row>\n    </ng-template>\n    \n    <ng-template [ngIf]="subscriptionType == \'business\'">\n      <ion-row>\n        <img src="assets/images/Business-Icon.png" alt="">\n      </ion-row>\n  \n      <ion-row>\n        <h2>Business</h2>\n        <h6>Get access to create list of redemption and expand your business like never before.</h6>\n      </ion-row>\n  \n      <ion-row>\n        <h1>$9.99 <span>/ per month</span></h1>\n        <p>This ammount will automatically deduct from your account every month.</p>\n      </ion-row>\n    </ng-template>\n\n    <ion-row>\n      <button ion-button round (click)="subscribeUser()">\n        SUBSCRIBE\n      </button>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/subscription/subscription.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* Auth */]])
], SubscriptionPage);

//# sourceMappingURL=subscription.js.map

/***/ })

});
//# sourceMappingURL=4.main.js.map