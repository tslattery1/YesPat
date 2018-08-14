webpackJsonp([13],{

/***/ 764:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotpasswordPageModule", function() { return ForgotpasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forgotpassword__ = __webpack_require__(905);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var ForgotpasswordPageModule = (function () {
    function ForgotpasswordPageModule() {
    }
    return ForgotpasswordPageModule;
}());
ForgotpasswordPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__forgotpassword__["a" /* ForgotpasswordPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__forgotpassword__["a" /* ForgotpasswordPage */])],
    })
], ForgotpasswordPageModule);

//# sourceMappingURL=forgotpassword.module.js.map

/***/ }),

/***/ 905:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotpasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { LoginPage } from "../login/login";



var ForgotpasswordPage = (function () {
    function ForgotpasswordPage(navCtrl, loadingCtrl, sanitizer, auth, toastCtrl) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.sanitizer = sanitizer;
        this.auth = auth;
        this.toastCtrl = toastCtrl;
        this.showSubmitMessage = false;
        this.showResponse = false;
        this.showEmail = true;
        this.showOTP = false;
        this.showPassword = false;
    }
    ForgotpasswordPage.prototype.onSubmit = function (form) {
        var _this = this;
        console.log(form.value);
        this.showSubmitMessage = true;
        this.auth.resetPassword(form.value.email)
            .then(function (user) {
            // let toast = this.toastCtrl.create({
            //   message: 'We have sent a link to reset password on your registered email-id',
            //   duration: 2000,
            //   position: 'middle'
            // });
            // toast.present();
        }, function (error) {
            var toast = _this.toastCtrl.create({
                message: error.message,
                duration: 2000,
                position: 'middle'
            });
            toast.present();
        });
    };
    return ForgotpasswordPage;
}());
ForgotpasswordPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-forgotpassword',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/forgotpassword/forgotpassword.html"*/'<ion-header>\n  <ion-navbar>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-grid class="signUpForm">\n    <form #forgotPassForm="ngForm" (ngSubmit)="onSubmit(forgotPassForm)">\n      <ion-list no-lines *ngIf="showEmail">\n        <ion-item>\n          <ion-icon ios="ios-mail" md="md-mail" item-left></ion-icon>\n          <ion-input type="email" placeholder="Email Address" name="email" ngModel required></ion-input>\n        </ion-item>\n\n         <button ion-button round block margin-top [disabled]="!forgotPassForm.valid">RESET PASSWORD</button>\n      </ion-list>\n      <div *ngIf= "showSubmitMessage">\n\n        <p style="text-align:center"> Instructions to reset password has been sent to the registered email-id </p>\n      </div>\n\n    \n\n     \n    </form>\n  </ion-grid>\n\n <!-- <label>Please enter the username</label>\n  <input type="text" [(ngModel)]="username" placeholder="username" />\n  <button ion-button color="primary" (click)="forgotPassword(username)">Reset Password</button>\n\n\n  <div *ngIf="showResponse" class="signUpForm">\n    <iframe [src]=\'sanitizer.bypassSecurityTrustResourceUrl(resetPasswordString)\' frameborder="5">\n    </iframe>\n  </div>-->\n</ion-content>\n'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/forgotpassword/forgotpassword.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["e" /* DomSanitizer */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* Auth */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
], ForgotpasswordPage);

//# sourceMappingURL=forgotpassword.js.map

/***/ })

});
//# sourceMappingURL=13.main.js.map