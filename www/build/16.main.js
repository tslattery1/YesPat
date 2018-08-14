webpackJsonp([16],{

/***/ 761:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BussinessAddMenuPageModule", function() { return BussinessAddMenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bussiness_add_menu__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var BussinessAddMenuPageModule = (function () {
    function BussinessAddMenuPageModule() {
    }
    return BussinessAddMenuPageModule;
}());
BussinessAddMenuPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__bussiness_add_menu__["a" /* BussinessAddMenuPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__bussiness_add_menu__["a" /* BussinessAddMenuPage */])],
    })
], BussinessAddMenuPageModule);

//# sourceMappingURL=bussiness-add-menu.module.js.map

/***/ }),

/***/ 902:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BussinessAddMenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var BussinessAddMenuPage = (function () {
    function BussinessAddMenuPage(http, alertCtrl, barcodeScanner, navCtrl, af, storage, modalCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.barcodeScanner = barcodeScanner;
        this.navCtrl = navCtrl;
        this.af = af;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.menuItem = [];
        this.userDataLoaded = true;
    }
    BussinessAddMenuPage.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.user && this.userDataLoaded) {
            this.storage.get('uid').then(function (response) {
                _this.user = _this.af.object('/businessProfile/' + response);
                _this.user.subscribe(function (data) {
                    console.log('Business USER DATA', data);
                    _this.userDataLoaded = false;
                    _this.userData = data;
                    _this.slideData = data.bussinessImages;
                    if (_this.userData.menuList) {
                        _this.menuItem = _this.userData.menuList;
                    }
                    // Check the user subscription status
                    var userData = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database().ref('/userProfile/');
                    userData.child(response).once("value", function (snapshot) {
                        if (snapshot.val().subscription == false) {
                            _this.navCtrl.setRoot('SubscriptionPage', { subscriptionType: 'business', uid: response });
                        }
                        else {
                            _this.prepareRequest('http://yaspat.deapps.io:3002/users/get_agreement', "agreement_id=" + snapshot.val().subscription, 'post').subscribe(function (data) {
                                var agreementDetails = JSON.parse(data._body);
                                console.log('Agreement Details', agreementDetails);
                                if (agreementDetails.state !== 'Active') {
                                    _this.navCtrl.setRoot('SubscriptionPage', { subscriptionType: 'business', uid: response });
                                }
                                else {
                                    console.log('Jarvis look every thing fine Business Page');
                                }
                            });
                        }
                    });
                });
            }, function (error) {
                console.log('something went wrong', error);
            });
        }
    };
    BussinessAddMenuPage.prototype.prepareRequest = function (url, body, method) {
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
    BussinessAddMenuPage.prototype.handleError = function (err) {
        // console.log('handleError',err)
        if (err) {
            console.log('ERROR', err);
            // Handled for cases where might be Api not able to response error message
        }
        return __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].throw(2, err);
    };
    BussinessAddMenuPage.prototype.prepareData = function (res) {
        return res;
    };
    BussinessAddMenuPage.prototype.prepareHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return headers;
    };
    BussinessAddMenuPage.prototype.openUserBarcode = function () {
        this.navCtrl.push('QrCodePage');
    };
    BussinessAddMenuPage.prototype.scanQrCode = function () {
        this.barcodeScanner.scan().then(function (barcodeData) {
            console.log('User Data ==> ', barcodeData);
            // Success! Barcode data is here
        }, function (err) {
            // An error occurred
        });
    };
    BussinessAddMenuPage.prototype.addMenuItem = function () {
        var _this = this;
        var opts = {
            cssClass: 'addItem'
        };
        var profileModal = this.modalCtrl.create('AdditemPage', '', opts);
        profileModal.onDidDismiss(function (data) {
            if (data) {
                data['recent'] = true;
                _this.menuItem.unshift(data);
            }
        });
        profileModal.present();
    };
    BussinessAddMenuPage.prototype.publishMenuItem = function () {
        var _this = this;
        console.log('Publish menu item');
        this.menuItem.forEach(function (element, index) {
            _this.menuItem[index].recent = false;
            if (_this.menuItem[index].disable == true) {
                _this.menuItem.splice(index, 1);
            }
        });
        var menuData = { menuList: this.menuItem };
        this.storage.get('uid').then(function (response) {
            _this.af.object('/businessProfile/' + response).update(menuData);
        });
    };
    BussinessAddMenuPage.prototype.deleteMenuItem = function (index, item) {
        var _this = this;
        console.log('Delete with index', index, item);
        var confirm = this.alertCtrl.create({
            title: 'Delete item - ' + item.itemName + ' ??',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        item['disable'] = true;
                        _this.menuItem[index] = item;
                        console.log('asdasd', _this.menuItem);
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
        // this.menuItem.splice(index, 1);
    };
    BussinessAddMenuPage.prototype.revertMenuItem = function (index, item) {
        console.log(item);
        item['disable'] = false;
        this.menuItem[index] = item;
    };
    return BussinessAddMenuPage;
}());
BussinessAddMenuPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'bussiness-add-menu',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/bussiness-add-menu/bussiness-add-menu.html"*/'<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n						<ion-icon name="menu"></ion-icon>\n					  </button>\n		<ion-title>\n			{{userData ? userData.bussinessName : \'Bussiness Name\'}}\n		</ion-title>\n\n		<ion-buttons right (click)="openUserBarcode()">\n			<button ion-button clear>\n							<img style="height: 2rem;" src="assets/images/barcode.png">\n					</button>\n		</ion-buttons>\n	</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<ion-slides pager="true" *ngIf="slideData">\n		<ion-slide *ngFor="let image of slideData;">\n			<img src="assets/images/overlay.png" alt="" class="overlay">\n\n			<img [src]="image" alt="">\n			<div class="card-subtitle">{{userData.address}}</div>\n		</ion-slide>\n	</ion-slides>\n\n\n\n	<!-- <button (click)="scanQrCode()"> Scan QR Code</button> -->\n\n	<ion-grid>\n\n		<h4>Menu</h4>\n\n		<table>\n			<tr>\n				<th>Name of item</th>\n				<th>Price</th>\n				<th>Points</th>\n				<th></th>\n			</tr>\n			<ng-template [ngIf]="menuItem.length">\n			<tr *ngFor="let menu of menuItem; let i = index">\n				<td>{{menu.itemName}} <span style="\n					background-color: #54bc15;\n					padding: 3px 11px;\n					border-radius: 50px;\n					font-size: 10px;\n					/* float: right; */\n					margin-left: 3px;\n					color: #fff;\n				" *ngIf="menu.recent"> New</span></td>\n				<td>$ {{menu.price}}</td>\n				<td class="points">{{menu.points}}</td>\n				<td>\n					<button ion-button [color]="menu.disable ? \'secondary\' : \'lightdark\'" round (click)="menu.disable ? revertMenuItem(i, menu) : deleteMenuItem(i, menu)">\n							{{menu.disable ? \'Revert\' : \'Delete\'}}\n						  </button>\n				</td>\n			</tr>\n			</ng-template>\n			<!-- <tr>\n				<td>Cappuccino Lois</td>\n				<td>$120</td>\n				<td class="points">150</td>\n				<td>\n					<button ion-button color=\'lightdark\' round>\n							Delete\n						  </button>\n				</td>\n			</tr> -->\n		</table>\n		<!-- <div *ngIf="!menuItem.length"> Your menu seems to be empty. Add menu using ADD button.</div> -->\n		<ion-row *ngIf="!menuItem.length">\n			<img src="assets/images/empty.png" alt="">\n			<h4>This menu list is empty</h4>	\n			<p>Add a new menu below</p>\n		</ion-row>\n		\n	</ion-grid>\n</ion-content>\n\n<ion-footer>\n	<ion-row>\n		<ion-col col-6>\n			<button ion-button round color=\'lightBl\' (click)="publishMenuItem()">\n							SAVE\n						</button>\n		</ion-col>\n\n\n		<ion-col col-6>\n			<button ion-button round (click)="addMenuItem()">\n							ADD\n						</button>\n		</ion-col>\n	</ion-row>\n</ion-footer>'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/bussiness-add-menu/bussiness-add-menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ModalController */]])
], BussinessAddMenuPage);

//# sourceMappingURL=bussiness-add-menu.js.map

/***/ })

});
//# sourceMappingURL=16.main.js.map