webpackJsonp([11],{

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomedetailsPageModule", function() { return HomedetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__homedetails__ = __webpack_require__(909);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomedetailsPageModule = (function () {
    function HomedetailsPageModule() {
    }
    return HomedetailsPageModule;
}());
HomedetailsPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__homedetails__["a" /* HomedetailsPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__homedetails__["a" /* HomedetailsPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__homedetails__["a" /* HomedetailsPage */]
        ]
    })
], HomedetailsPageModule);

//# sourceMappingURL=homedetails.module.js.map

/***/ }),

/***/ 909:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomedetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_push_notification_service__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the HomedetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HomedetailsPage = (function () {
    function HomedetailsPage(toastCtrl, pushNotif, event, storage, alertCtrl, af, navCtrl, navParams, barcodeScanner) {
        this.toastCtrl = toastCtrl;
        this.pushNotif = pushNotif;
        this.event = event;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.af = af;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcodeScanner = barcodeScanner;
        this.menuItem = [];
        this.scanBool = false;
    }
    HomedetailsPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log('Nav Params Items', this.navParams.get('navigateKey'));
        var businessData = __WEBPACK_IMPORTED_MODULE_6_firebase___default.a.database().ref('/businessProfile/');
        businessData.child(this.navParams.get('navigateKey')).once("value", function (snapshot) {
            _this.userData = snapshot.val();
            console.log('Snapshot Data', snapshot.val());
            _this.callPhoneNumber = 'tel:' + snapshot.val().phoneNumber;
            _this.callAlternateNumbare = 'tel:' + snapshot.val().alternateNumber;
            _this.mailToEmail = 'mailto:' + snapshot.val().email;
            _this.slideData = snapshot.val().bussinessImages;
            _this.menuItem = snapshot.val().menuList ? snapshot.val().menuList : [];
        });
        // this.user = this.af.object('/businessProfile/' + this.navParams.get('navigateKey'));
        // this.user.subscribe((data) => {
        //   this.userData = data;
        //   this.callPhoneNumber = 'tel:' + data.phoneNumber;
        //   this.callAlternateNumbare = 'tel:' + data.alternateNumber;
        //   this.mailToEmail = 'mailto:' + data.email;
        //   this.slideData = data.bussinessImages;
        //   this.menuItem = data.menuList ? data.menuList : [] ;
        // });
        this.storage.get('uid').then(function (response) {
            _this.userBuyerId = response;
            _this.user = _this.af.object('/userProfile/' + response);
            _this.user.subscribe(function (currentUser) {
                _this.productBuyer = currentUser;
                _this.points = currentUser.points;
            });
        });
    };
    HomedetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomedetailsPage');
    };
    HomedetailsPage.prototype.jarvisMakeMeBold = function (name) {
        return '<strong>' + name + '</strong>';
    };
    HomedetailsPage.prototype.scanQrCode = function (menu) {
        var _this = this;
        this.scanBool = true;
        this.barcodeScanner.scan().then(function (barcodeData) {
            console.log('Jarvis Barcode Reply ==> ', barcodeData);
            _this.barcodeDataText = barcodeData.text;
            if (_this.barcodeDataText && _this.barcodeDataText == _this.navParams.get('navigateKey')) {
                _this.user = _this.af.object('/businessProfile/' + barcodeData.text);
                _this.user.subscribe(function (data) {
                    if (_this.scanBool) {
                        console.log('Jarvis Business user info from barcode san data', data);
                        _this.businessUserData = data;
                        _this.paymentAlertBox = _this.alertCtrl.create({
                            title: 'Confirm purchase',
                            message: 'Are you sure you want to pay ' + data.bussinessName + ' ' + menu.points + ' points for ' + _this.jarvisMakeMeBold(menu.itemName) + '.',
                            cssClass: 'payment-alert',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'Buy',
                                    handler: function () {
                                        _this.userConfirmToPay(menu);
                                    }
                                }
                            ]
                        });
                        _this.paymentAlertBox.present();
                    }
                });
                // Success! Barcode data is here
            }
            else {
                var toast = _this.toastCtrl.create({
                    message: 'Please scan a valid QR code to buy this product.',
                    duration: 2000,
                    position: 'middle'
                });
                toast.present();
            }
        }, function (err) {
            // An error occurred
        });
    };
    HomedetailsPage.prototype.userConfirmToPay = function (currentMenu) {
        var _this = this;
        this.points = this.points - currentMenu.points;
        console.log('Updating user New points', this.points);
        this.af.object('/userProfile/' + this.userBuyerId).update({ points: this.points }).then(function () {
            _this.scanBool = false;
            console.log('Inform business user');
            _this.af.object('/businessProfile/' + _this.barcodeDataText).update({ paymentSuccessUser: Object.assign(_this.productBuyer, currentMenu) }).then(function (response) {
                console.log('Added user details who did the payment', response);
                var alert = _this.alertCtrl.create({
                    title: 'Payment Success',
                    message: 'Your current points are ' + _this.points + '.',
                    buttons: ['OK']
                });
                alert.present();
                _this.ngOnInit();
            }, function (error) {
                console.log('Failed Error ');
            });
        }, function (error) {
            console.log('Error', error);
        });
        // let message = {
        //   "username": this.businessUserData.name,
        //   "registrationId": this.businessUserData.registrationId,
        //   "type": "requestSpot"
        // }
        // console.log('Push notify MESSAGE ==>', message)
        // this.pushNotif.sendPush(message).subscribe((response) => {
        //   //alert(JSON.stringify(response));
        //   console.log('Push notify SUCCESS ==>', JSON.stringify(response))
        // },
        //   (error) => {
        //     console.log('Push notify ABC ERROR ==>', error);
        //   })
    };
    return HomedetailsPage;
}());
HomedetailsPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-homedetails',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/homedetails/homedetails.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{userData ? userData.bussinessName : \'homedetails\'}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <ion-slides pager="true" *ngIf="slideData">\n        <ion-slide *ngFor="let image of slideData;">\n          <img src="assets/images/overlay.png" alt="" class="overlay">\n    \n          <img [src]="image" alt="">\n          <div class="card-subtitle">{{userData.address}}</div>\n        </ion-slide>\n    </ion-slides>\n\n  <ion-grid class="details">\n    <ion-row>\n      <ion-col>\n        <h4>Call</h4>\n        <h6><a [href]="callPhoneNumber">{{userData.phoneNumber}}</a></h6>\n      </ion-col>\n      <ion-col col-6>\n        <h4>Alternate Call</h4>\n        <h6><a [href]="callAlternateNumbare">{{userData.alternateNumber}}</a></h6>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col>\n        <h4>Type</h4>\n        <h6>{{userData.bussinessType}}</h6>\n      </ion-col>\n      <ion-col col-6>\n          <h4>Website</h4>\n          <h6>{{userData.website}}</h6>\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n        <ion-col>\n          <h4>Email</h4>\n          <h6><a [href]="mailToEmail">{{userData.email}}</a></h6>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <ion-grid class="menulist">\n        \n            <h4>Menu</h4>\n        \n            <table>\n              <tr>\n                <th>Name of item</th>\n                <th>Price</th>\n                <th>Points</th>\n                <th></th>\n              </tr>\n              <ng-template [ngIf]="menuItem && menuItem.length">\n              <tr *ngFor="let menu of menuItem; let i = index">\n                <td>{{menu.itemName}} <span style="\n                  background-color: #54bc15;\n                  padding: 3px 11px;\n                  border-radius: 50px;\n                  font-size: 10px;\n                  /* float: right; */\n                  margin-left: 3px;\n                  color: #fff;\n                " *ngIf="menu.recent"> New</span></td>\n                <td>$ {{menu.price}}</td>\n                <td class="points">{{menu.points}}</td>\n                <td>\n                    <button ion-button color=\'secondary\' round (click)="scanQrCode(menu)" [disabled]="points < menu.points"> <!-- color=\'redeem\'--> \n                        Redeem\n                    </button>\n                </td>\n              </tr>\n              </ng-template>\n              <!-- <tr>\n                <td>Cappuccino Lois</td>\n                <td>$120</td>\n                <td class="points">150</td>\n                <td>\n                  <button ion-button color=\'lightdark\' round>\n                      Delete\n                      </button>\n                </td>\n              </tr> -->\n            </table>\n          <!-- <div *ngIf="!menuItem.length"> Menu seems to be empty for now. It will be visible as soon as user add menu.</div> -->\n\n          <ion-row *ngIf="!menuItem.length">\n              <img src="assets/images/empty.png" alt="">\n              <h4>This menu list is empty</h4>	\n              <p>Will be visible as soon as user add menu.</p>\n          </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/homedetails/homedetails.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__services_push_notification_service__["a" /* PushNotification */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Events */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */]])
], HomedetailsPage);

//# sourceMappingURL=homedetails.js.map

/***/ })

});
//# sourceMappingURL=11.main.js.map