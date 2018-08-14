webpackJsonp([12],{

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryDetailPageModule", function() { return HistoryDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__history_detail__ = __webpack_require__(906);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var HistoryDetailPageModule = (function () {
    function HistoryDetailPageModule() {
    }
    return HistoryDetailPageModule;
}());
HistoryDetailPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__history_detail__["a" /* HistoryDetailPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__history_detail__["a" /* HistoryDetailPage */])],
    })
], HistoryDetailPageModule);

//# sourceMappingURL=history-detail.module.js.map

/***/ }),

/***/ 906:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoryDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(179);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HistoryDetailPage = (function () {
    function HistoryDetailPage(storage, navController, navParams) {
        this.storage = storage;
        this.navController = navController;
        this.navParams = navParams;
        this.publisher = false;
        this.requestersArray = [];
        this.showNoRequesters = false;
        this.publisherDetails = this.navParams.get("publisherDetails");
        this.requesterDetails = this.navParams.get("requesterDetails");
        var i = 0;
        if (this.requesterDetails != undefined) {
            while (Object.keys(this.requesterDetails)[i] != undefined) {
                var key = Object.keys(this.requesterDetails)[i];
                var myobj = this.requesterDetails[key];
                var mykey = Object.keys(myobj);
                this.requestersArray.push(myobj[mykey[mykey.length - 1]]);
                i++;
            }
        }
        else {
            this.showNoRequesters = true;
        }
        this.publishedOn = this.navParams.get("publishedOn");
        // this.publisherDetails(spot_uuid);
        // this.requestersDetails(spot_uuid);
    }
    return HistoryDetailPage;
}());
HistoryDetailPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-history-detail',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/history/history-detail/history-detail.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button ion-button menuToggle icon-only (click)="dismiss()">\n\n        <ion-icon ios="ios-close" md="md-close"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n\n\n    <ion-title>My Spot Details</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-card *ngIf="publisherDetails">\n\n    <p class="detailsHeader">\n\n      <b>Publisher Details</b>\n\n    </p>\n\n    <ion-card-content>\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-3>\n\n            <p>\n\n              <b>Publisher Name</b>\n\n            </p>\n\n          </ion-col>\n\n          <ion-col style="padding-left: 0px;">\n\n            <p>{{publisherDetails.name }}</p>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-3>\n\n            <p>\n\n              <b> Published At</b>\n\n            </p>\n\n          </ion-col>\n\n          <ion-col style="padding-left: 0px;">\n\n            <p>{{publishedOn | date}}</p>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n          <ion-col style="padding-left: 0px;">\n\n            <ion-row>\n\n              <ion-col col-3>\n\n                <p>\n\n                  <b>Email Id</b>\n\n                </p>\n\n              </ion-col>\n\n              <ion-col>\n\n                <p>{{publisherDetails.email}}</p>\n\n              </ion-col>\n\n            </ion-row>\n\n\n\n          </ion-col>\n\n\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n          <ion-col style="padding-left: 0px;">\n\n            <ion-row>\n\n              <ion-col col-3>\n\n                <p>\n\n                  <b>Contact</b>\n\n                </p>\n\n              </ion-col>\n\n              <ion-col>\n\n                <p>{{publisherDetails.phoneNumber}}</p>\n\n              </ion-col>\n\n            </ion-row>\n\n\n\n          </ion-col>\n\n\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n  <ion-card>\n\n    <p class="detailsHeader">\n\n      <b>Requester Details</b>\n\n    </p>\n\n    <p style="text-align: center" [hidden]="!showNoRequesters"> No Requesters yet </p>\n\n    <ion-card-content *ngFor="let requester of requestersArray">\n\n      <ion-grid>\n\n        <ion-row>\n\n          <ion-col col-3>\n\n            <p>\n\n              <b>Requester Name</b>\n\n            </p>\n\n          </ion-col>\n\n          <ion-col style="padding-left: 0px;">\n\n            <p>{{requester.name }}</p>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-3>\n\n            <p>\n\n              <b> Requested On </b>\n\n            </p>\n\n          </ion-col>\n\n          <ion-col style="padding-left: 0px;">\n\n            <p>{{requester.requestedDate | date}}</p>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-3>\n\n            <p>\n\n              <b> Requested Time</b>\n\n            </p>\n\n          </ion-col>\n\n          <ion-col style="padding-left: 0px;">\n\n            <p>{{requester.requestedTime}}</p>\n\n          </ion-col>\n\n        </ion-row>\n\n\n\n        <ion-row>\n\n          <ion-col style="padding-left: 0px;">\n\n            <ion-row>\n\n              <ion-col col-3>\n\n                <p>\n\n                  <b>Email Id</b>\n\n                </p>\n\n              </ion-col>\n\n              <ion-col>\n\n                <p>{{requester.email}}</p>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col col-3>\n\n                <p>\n\n                  <b>Contact</b>\n\n                </p>\n\n              </ion-col>\n\n              <ion-col>\n\n                <p>{{requester.phoneNumber}}</p>\n\n              </ion-col>\n\n            </ion-row>\n\n            <ion-row>\n\n              <ion-col col-3>\n\n                <p>\n\n                  <b>Request Status</b>\n\n                </p>\n\n              </ion-col>\n\n              <ion-col>\n\n                <p>{{requester.status}}</p>\n\n              </ion-col>\n\n            </ion-row>\n\n\n\n          </ion-col>\n\n\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card-content>\n\n  </ion-card>\n\n\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/history/history-detail/history-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], HistoryDetailPage);

//# sourceMappingURL=history-detail.js.map

/***/ })

});
//# sourceMappingURL=12.main.js.map