webpackJsonp([19],{

/***/ 758:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QrCodePageModule", function() { return QrCodePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__QRCode__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var QrCodePageModule = (function () {
    function QrCodePageModule() {
    }
    return QrCodePageModule;
}());
QrCodePageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__QRCode__["a" /* QrCodePage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__QRCode__["a" /* QrCodePage */])],
    })
], QrCodePageModule);

//# sourceMappingURL=QRCode.module.js.map

/***/ }),

/***/ 899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrCodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(108);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var QrCodePage = (function () {
    function QrCodePage(storage, af) {
        this.storage = storage;
        this.af = af;
        this.createdQrCode = null;
        this.generateQRCodeBool = false;
    }
    QrCodePage.prototype.ngOnInit = function () {
        var _this = this;
        this.generateQRCodeBool = true;
        this.storage.get('uid').then(function (response) {
            _this.createdQrCode = response;
            _this.user = _this.af.object('/businessProfile/' + response);
            _this.user.subscribe(function (data) {
                if (_this.generateQRCodeBool) {
                    console.log('QR Code component USER DATA', data);
                    _this.userInfo = data;
                    _this.generateQRCodeBool = false;
                }
            });
        });
    };
    return QrCodePage;
}());
QrCodePage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'qr-code',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/QRCode/QRCode.html"*/'<ion-header>\n		<ion-navbar>\n			<ion-title>\n			QR Code\n			</ion-title>\n		</ion-navbar>\n	</ion-header>\n	\n	<ion-content padding>\n		<ion-card *ngIf="createdQrCode">\n			<div style="padding: 20px;">\n				<ion-card-header style="text-align: center; font-size: 2rem;">\n						To pay <span style="color: #f53d3d">{{userInfo?.bussinessName}}</span>\n				</ion-card-header>\n				<ion-card-content style="text-align: center; font-size: 1.6rem;">\n						scan below QR code\n				</ion-card-content>\n			</div>\n				<img src="https://chart.googleapis.com/chart?cht=qr&chl={{createdQrCode}}&chs=160x160&chld=L|0"/>\n		</ion-card>\n	</ion-content>	'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/QRCode/QRCode.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
], QrCodePage);

//# sourceMappingURL=QRCode.js.map

/***/ })

});
//# sourceMappingURL=19.main.js.map