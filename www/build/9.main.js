webpackJsonp([9],{

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationPageModule", function() { return NotificationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification__ = __webpack_require__(911);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(77);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//home.module.ts



var NotificationPageModule = (function () {
    function NotificationPageModule() {
    }
    return NotificationPageModule;
}());
NotificationPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [__WEBPACK_IMPORTED_MODULE_1__notification__["a" /* NotificationPage */]],
        imports: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_1__notification__["a" /* NotificationPage */])],
    })
], NotificationPageModule);

//# sourceMappingURL=notification.module.js.map

/***/ }),

/***/ 911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_push_notification_service__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { Push, PushObject, PushOptions } from '@ionic-native/push';






var NotificationPage = (function () {
    function NotificationPage(pushNotif, storage, navParams, navController, alertCtrl, _http, af, oneSignal, toast) {
        var _this = this;
        this.pushNotif = pushNotif;
        this.storage = storage;
        this.navParams = navParams;
        this.navController = navController;
        this.alertCtrl = alertCtrl;
        this._http = _http;
        this.af = af;
        this.oneSignal = oneSignal;
        this.toast = toast;
        this.notifData = true;
        this.reject = false;
        this.publishers = [];
        this.notifCount = 0;
        this.requesters = [];
        this.spotDetails = [];
        this.spotIds = [];
        this.requestingUserData = [];
        this.storage.get('uid').then(function (uid) {
            _this.uid = uid;
            var userData = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref('/userProfile/');
            userData.child(uid).once("value", function (snapshot) {
                // console.log('value', snapshot.val());
                _this.currentUser = snapshot.val();
            });
            //spot.publisherDetails.uid = response;
            //let key = this.spots.push(spot).key;
            _this.user = _this.af.list('/userProfile/' + uid + "/parkingDetails/");
            _this.user.subscribe(function (userParkingDetails) {
                // console.log('1111111 Change in parkingDetails==> ', this.spotIds, this.requestingUserData);
                if (userParkingDetails.length) {
                    var _loop_1 = function (i) {
                        _this.spotIds[i] = userParkingDetails[i].$value;
                        //console.log(this.spotIds[i]);
                        var userData_1 = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref('/spots/' + _this.spotIds[i] + '/requesterDetails/');
                        userData_1.once("value", function (snapshot) {
                            // console.log('initial each', snapshot.val());
                            if (snapshot.val() != null) {
                                Object.keys(snapshot.val()).forEach(function (key) {
                                    var primaryKey = key;
                                    var value = snapshot.val()[key];
                                    console.log('primaryKey ', primaryKey);
                                    Object.keys(value).forEach(function (key) {
                                        var secondaryKey = key;
                                        console.log('secondaryKey ', secondaryKey);
                                        var getData = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref('/spots/' + _this.spotIds[i] + '/requesterDetails/' + primaryKey);
                                        getData.child(secondaryKey).once("value", function (snapshot) {
                                            console.log('each', snapshot.val());
                                            if (snapshot.val().status == 'Pending') {
                                                var data = snapshot.val();
                                                data.mykey = secondaryKey;
                                                data.spotId = _this.spotIds[i];
                                                _this.requestingUserData.push(data);
                                            }
                                        });
                                    });
                                });
                                // let key = Object.keys(snapshot.val());
                                // console.log('earch', key);
                            }
                            // console.log('snapshot', snapshot.val());
                        });
                        // this.af.list('/spots/' + this.spotIds[i] + '/requesterDetails/')
                        //   .subscribe((requesterDetails) => {
                        //     console.log('1111111 Change in requesterDetails==> ', requesterDetails);
                        // if (requesterDetails.length) {
                        //   for (let j = 0; j < requesterDetails.length; j++) {
                        //     let k = 0;
                        //     while (Object.keys(requesterDetails[j])[k] != undefined) {
                        //       var firstKey = Object.keys(requesterDetails[j])[k];
                        //       if (requesterDetails[j][firstKey].status == 'Pending') {
                        //         console.log('each', requesterDetails[j][firstKey]);
                        //         this.notifData = true;
                        //         requesterDetails[j][firstKey].mykey = firstKey;
                        //         requesterDetails[j][firstKey].spotId = this.spotIds[i];
                        //         this.requestingUserData.push(requesterDetails[j][firstKey]);
                        //       }
                        //       k++;
                        //     }
                        //   }
                        //   console.log('Data', this.requestingUserData);
                        //   if (this.requestingUserData.length == 0) {
                        //     this.notifData = false;
                        //   }
                        //   else {
                        //     this.notifData = true;
                        //   }
                        // }
                        // })
                    };
                    for (var i = 0; i < userParkingDetails.length; i++) {
                        _loop_1(i);
                    }
                }
                else {
                    _this.notifData = false;
                }
                //console.log(this.spotDetails);
            });
            // this.navCtrl.push('HistoryPage');
        });
    }
    NotificationPage.prototype.acceptRequest = function (requester, index) {
        var _this = this;
        console.log('Requester', requester);
        var userData = __WEBPACK_IMPORTED_MODULE_8_firebase___default.a.database().ref('/spots/' + requester.spotId + '/publisherDetails/');
        userData.once("value", function (snapshot) {
            console.log('snapshot.val()', snapshot.val());
            if (snapshot.val() && snapshot.val().status) {
                var options = {
                    message: 'You can not accept this parking as you has already accepted this location parking for another user.',
                    duration: 2000,
                    position: 'top'
                };
                var toast = _this.toast.create(options);
                toast.present();
            }
            else {
                //this.requestingUserData.splice(index,index+1);
                //spot.publisherDetails.uid = response;
                //let key = this.spots.push(spot).key;
                _this.user = _this.af.list('/userProfile/' + _this.uid + "/parkingDetails/");
                _this.user.subscribe(function (userParkingDetails) {
                    var _loop_2 = function (i) {
                        _this.spotIds[i] = userParkingDetails[i].$value;
                        //console.log(this.spotIds[i]);
                        _this.af.list('/spots/' + _this.spotIds[i] + '/requesterDetails/')
                            .subscribe(function (requesterDetails) {
                            if (requesterDetails.length) {
                                for (var j = 0; j < requesterDetails.length; j++) {
                                    var k = 0;
                                    while (Object.keys(requesterDetails[j])[k] != undefined) {
                                        var firstKey = Object.keys(requesterDetails[j])[k];
                                        if (requesterDetails[j][firstKey].uid == requester.uid && firstKey == requester.mykey) {
                                            _this.af.object('/spots/' + _this.spotIds[i] + '/requesterDetails/' + requester.uid + '/' + firstKey).update({ status: 'Accepted' })
                                                .then(function (response) {
                                                // console.log("all good bruh");
                                                _this.af.object('/spots/' + _this.spotIds[i] + '/publisherDetails/').update({ status: 'Accepted' })
                                                    .then(function (response) {
                                                    console.log("all good bruh");
                                                });
                                                var options = {
                                                    message: requester.name + ' Parking aceepted successfully.',
                                                    duration: 2000,
                                                    position: 'top'
                                                };
                                                console.log('ToastOptions', options);
                                                var toast = _this.toast.create(options);
                                                toast.present();
                                                _this.navController.setRoot('PostFindspotPage');
                                                var notificationObj = {
                                                    "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
                                                    headings: { "en": 'Parking Accepted' },
                                                    "contents": { "en": _this.currentUser.name + ' has Accepted your spot request.' },
                                                    data: { Root: true, DirectNavigatePage: 'HistoryPage', rootParams: 'Requested' },
                                                    include_player_ids: [requester.playerId]
                                                };
                                                console.log('Hello One Signal object', notificationObj);
                                                window["plugins"].OneSignal.postNotification(notificationObj, function (successResponse) {
                                                    // alert(successResponse);
                                                }, function (failedResponse) {
                                                    //  console.log("Notification Post Failed: ", failedResponse);
                                                    // alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
                                                });
                                            })
                                                .catch(function (error) {
                                                var options = {
                                                    message: 'Something went wrong.',
                                                    duration: 2000,
                                                    position: 'top'
                                                };
                                                var toast = _this.toast.create(options);
                                                toast.present();
                                            });
                                            // let message = {
                                            //   "username": requester.name,
                                            //   "registrationId": requester.registrationId,
                                            //   "type": "acceptRequest"
                                            // }
                                            // this.pushNotif.sendPush(message).subscribe((response) => {
                                            //   //alert(JSON.stringify(response));
                                            // },
                                            //   (error) => {
                                            //     // alert(error);
                                            //   })
                                        }
                                        k++;
                                    }
                                }
                            }
                        });
                    };
                    for (var i = 0; i < userParkingDetails.length; i++) {
                        _loop_2(i);
                    }
                });
                _this.requestingUserData.splice(index, index + 1);
            }
        });
        // let myAlert = this.alertCtrl.create({
        //   title: 'You accepted the parking request of ',
        //   subTitle: requester.name,
        //   buttons: ['OK']
        // });
        // myAlert.present();
    };
    NotificationPage.prototype.rejectRequest = function (requester, i) {
        var _this = this;
        this.af.object('/spots/' + requester.spotId + '/requesterDetails/' + requester.uid + '/' + requester.mykey).update({ status: 'Rejected' }).then(function (response) {
            console.log("response");
            //this.requestingUserData.splice(i,i+1);
            var options = {
                message: requester.name + ' Parking Rejected successfully.',
                duration: 2000,
                position: 'top'
            };
            var toast = _this.toast.create(options);
            toast.present();
            // this.navController.setRoot('PostFindspotPage');
        });
        // this.requestingUserData.splice(i, i + 1);
        // let alert = this.alertCtrl.create({
        //   title: 'You rejected the parking request of ',
        //   subTitle: requester.name,
        //   buttons: ['OK']
        // });
        // alert.present();
        var notificationObj = {
            "app_id": "4a1163d9-1d7a-42d0-86f0-bc85a9621a3c",
            headings: { "en": 'Parking Rejected' },
            "contents": { "en": this.currentUser.name + ' has rejected your spot request.' },
            data: { Root: true, DirectNavigatePage: 'HistoryPage', rootParams: 'Requested' },
            include_player_ids: [requester.playerId]
        };
        console.log('Hello One Signal object', notificationObj);
        window["plugins"].OneSignal.postNotification(notificationObj, function (successResponse) {
            // alert(successResponse);
        }, function (failedResponse) {
            //  console.log("Notification Post Failed: ", failedResponse);
            // alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        });
        this.navController.setRoot('PostFindspotPage');
    };
    return NotificationPage;
}());
NotificationPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_5" /* Component */])({
        selector: 'page-notification',template:/*ion-inline-start:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/notification/notification.html"*/'<ion-header>\n  <ion-navbar>\n\n    <ion-title>Notifications</ion-title>\n\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card *ngFor="let requester of requestingUserData;let i = index">\n    <ion-card-header>\n      {{requester.name}}\n    </ion-card-header>\n\n    <ion-card-content>\n\n      <ion-grid>\n        <ion-row>\n          <ion-col col-4>\n            <p><strong>Desired Location</strong></p>\n          </ion-col>\n          <ion-col>\n            <p>{{requester.requestLocation}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-4>\n            <p><strong>Desired Date</strong></p>\n          </ion-col>\n          <ion-col>\n            <p>{{requester.requestedDate | date}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-4>\n            <p><strong>Desired Time</strong></p>\n          </ion-col>\n          <ion-col>\n            <p>{{requester.requestedTime}}</p>\n          </ion-col>\n        </ion-row>\n\n        <ion-row>\n          <ion-col>\n            <button (click)="rejectRequest(requester,i)" ion-button round>REJECT</button>\n\n            <button (click)="acceptRequest(requester,i)" ion-button round color="secondary">ACCEPT</button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n\n    </ion-card-content>\n\n  </ion-card>\n  <p style="text-align:center" *ngIf="requestingUserData.length == 0">Hey there! You don\'t have any requesters yet!</p>\n\n</ion-content>'/*ion-inline-end:"/Users/ewebcoremac1/Desktop/Mayur/WorkingYespat/YesPatWorking/src/pages/notification/notification.html"*/
        /*  outputs: [`notifCountEvent`]*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__services_push_notification_service__["a" /* PushNotification */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_native_onesignal__["a" /* OneSignal */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* ToastController */]])
], NotificationPage);

//# sourceMappingURL=notification.js.map

/***/ })

});
//# sourceMappingURL=9.main.js.map