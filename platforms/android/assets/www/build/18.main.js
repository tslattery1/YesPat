webpackJsonp([18],{

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdditemPageModule", function() { return AdditemPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__additem__ = __webpack_require__(900);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AdditemPageModule = (function () {
    function AdditemPageModule() {
    }
    return AdditemPageModule;
}());
AdditemPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__additem__["a" /* AdditemPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__additem__["a" /* AdditemPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__additem__["a" /* AdditemPage */]
        ]
    })
], AdditemPageModule);

//# sourceMappingURL=additem.module.js.map

/***/ }),

/***/ 900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdditemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(30);
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
 * Generated class for the AdditemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AdditemPage = (function () {
    function AdditemPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.menuItemForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormGroup */]({
            itemName: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].pattern("[a-zA-Z][a-zA-Z ]+")]),
            price: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            points: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required)
        });
    }
    AdditemPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdditemPage');
    };
    AdditemPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    AdditemPage.prototype.addMenuItem = function () {
        this.menuItemForm.markAsDirty();
        if (this.menuItemForm.valid) {
            console.log('dismiss with value', this.menuItemForm.value);
            this.viewCtrl.dismiss(this.menuItemForm.value);
        }
    };
    return AdditemPage;
}());
AdditemPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* Component */])({
        selector: 'page-additem',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/additem/additem.html"*/'<ion-content>\n  <div class="centeralign">\n    <form [formGroup]="menuItemForm" novalidate>\n      <ion-grid>\n        <ion-item>\n          <img src="assets/images/itemImg.png" alt="" item-left id=\'itemImg\'>\n          <ion-input type="text" placeholder="Name of item" formControlName="itemName"></ion-input>\n        </ion-item>\n\n        <div *ngIf="!menuItemForm.controls.itemName.valid && (menuItemForm.controls.itemName.dirty || menuItemForm.controls.itemName.touched)"\n          class="error">\n          <div [hidden]="!menuItemForm.controls.itemName.errors.required">\n            *Name of item is required.\n          </div>\n          <div [hidden]="!menuItemForm.controls.itemName.errors.pattern">\n            *Invalid format.\n          </div>\n        </div>\n\n        <ion-item>\n          <img src="assets/images/price.png" alt="" item-left>\n          <ion-input type="number" placeholder="Actual Price" formControlName="price"></ion-input>\n        </ion-item>\n\n        <div *ngIf="!menuItemForm.controls.price.valid && (menuItemForm.controls.price.dirty || menuItemForm.controls.price.touched)"\n          class="error">\n          <div [hidden]="!menuItemForm.controls.price.errors.required">\n            *Actual Price is required.\n          </div>\n        </div>\n\n        <ion-item>\n          <img src="assets/images/points.png" alt="" item-left>\n          <ion-input type="number" placeholder="Points" formControlName="points"></ion-input>\n        </ion-item>\n\n        <div *ngIf="!menuItemForm.controls.points.valid && (menuItemForm.controls.points.dirty || menuItemForm.controls.points.touched)"\n          class="error">\n          <div [hidden]="!menuItemForm.controls.points.errors.required">\n            *Points is required.\n          </div>\n        </div>\n\n      </ion-grid>\n    </form>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col col-6>\n          <button ion-button round color=\'cancel\' (click)="closeModal()">\n            CANCEL\n          </button>\n        </ion-col>\n\n\n        <ion-col col-6>\n          <button ion-button round (click)="addMenuItem()">\n            ADD\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/additem/additem.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
], AdditemPage);

//# sourceMappingURL=additem.js.map

/***/ })

});
//# sourceMappingURL=18.main.js.map