import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { HttpModule } from '@angular/http';
// import { LocalNotifications } from '@ionic-native/local-notifications';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { InAppBrowser } from '@ionic-native/in-app-browser';

//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from "angularfire2/database";
import { Auth } from "../providers/auth/auth";
import { AngularFireAuth } from 'angularfire2/auth';
import { ImageProvider } from "../providers/image-provider";
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SpotRequesters } from "../providers/spot-requesters";
import { PushNotification } from "../services/push-notification.service";
import { Badge } from '@ionic-native/badge';
import { Base64 } from '@ionic-native/base64';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {PaginationService} from '../pages/userhome/userhomePagination.service';
import { OneSignal } from '@ionic-native/onesignal';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Market } from '@ionic-native/market';

import { SocialSharing } from '@ionic-native/social-sharing';




export const firebaseConfig = {
  apiKey: "AIzaSyAYPADFyOwF_Rb_WN4tFlD6zW6vZShmjtY",
  authDomain: "yes-pat-e2b6a.firebaseapp.com",
  databaseURL: "https://yes-pat-e2b6a.firebaseio.com",
  projectId: "yes-pat-e2b6a",
  storageBucket: "yes-pat-e2b6a.appspot.com",
  messagingSenderId: "66637562046"
};



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{mode:'ios', preloadModules: false}),
    IonicStorageModule.forRoot(),
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
   

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PushNotification,
    Auth,
    // LocalNotifications,
    Camera,
    ImagePicker,
    Base64,
    // Push,
    OneSignal,
    ScreenOrientation,
    Transfer,
    File,
    BarcodeScanner,
    AngularFireDatabase,
    AngularFireAuth,
    ImageProvider,
    Network,
    Geolocation,
    Diagnostic,
    PaginationService,
    Badge,
    Market,
    SocialSharing,
    InAppBrowser
   


  ]
})
export class AppModule { }

