import { OneSignal } from '@ionic-native/onesignal';
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms/forms";
import { NavController, Events, MenuController } from "ionic-angular";




import { Storage } from "@ionic/storage";
import { IonicPage, AlertController, LoadingController } from 'ionic-angular';
import { Auth } from "../../providers/auth/auth";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import firebase from 'firebase';
import { MyApp } from "../../app/app.component";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  /*  signinpage = SignupPage;*/

  email;
  password;
  validLoginDetails: boolean = true;
  users: FirebaseObjectObservable<any>;
  loading: any

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private auth: Auth,
    private storage: Storage,
    private alertCtrl: AlertController,
    private af: AngularFireDatabase,
    private app: MyApp,
    private event: Events,
    private oneSignal: OneSignal,
    public loadingCtrl: LoadingController


  ) { }

  public ngOnInit() {
    this.menuCtrl.enable(false);
  }

  onSubmit(form: NgForm) {
    this.loading = this.loadingCtrl.create({
      content: 'logging you in...'
    });

    this.loading.present();

    let user = form.value;

    this.auth.loginUser(form.value.email, form.value.password)
      .then((authData) => {

        this.storage.set("uid", authData.uid);
        
        var userData = firebase.database().ref('/userProfile/');
        userData.child(authData.uid).once("value", (snapshot) => {
          let userInfo = {
            username: snapshot.val().username,
            user_role: snapshot.val().user_role,
            points: snapshot.val().points
          }

          this.oneSignal.getIds().then((ids) => {
            var userData = firebase.database().ref('/userProfile/');
            userData.child(authData.uid).update({
              playerId: ids.userId,
              pushToken: ids.pushToken, 
            });

            this.storage.set("userInfo", userInfo); 
            this.event.publish('userLogin', {"name":snapshot.val().name, "user_role": snapshot.val().user_role, "points": snapshot.val().points});
            this.menuCtrl.enable(true);

            console.log('Role Login', snapshot.val().user_role);

            if(snapshot.val().user_role !== 'bussinesssUser') {
              console.log('Normal User');
              if (this.loading) {
                this.loading.dismiss();
              }
              this.navCtrl.setRoot('PostFindspotPage');
            } else {
              console.log('Bussiness User', authData.uid);
              this.users = this.af.object('/businessProfile/' + authData.uid);
              this.users.subscribe((data) => {
                 if(data.$value !== null){
                  if(!data.bussiness_verify) {
                    if (this.loading) {
                      this.loading.dismiss();
                    }
                    this.navCtrl.setRoot('BussinessVerificationAlertPage');
                  } else {
                    if (this.loading) {
                      this.loading.dismiss();
                    }
                    this.navCtrl.setRoot('BussinessAddMenuPage');
                  }
                 } else {
                  if (this.loading) {
                    this.loading.dismiss();
                  }
                  this.navCtrl.setRoot('BussinessSignUpPage');
                 }
              }, (error) => {
                if (this.loading) {
                  this.loading.dismiss();
                }
                console.log('Error', error);
              });
            }
  
            // this.navCtrl.setRoot(MyApp);
          })
          //console.log(JSON.stringify(data));
        }).catch((error) => {
          if (this.loading) {
            this.loading.dismiss();
          }
        })
        //this.users.push({'username':'prasadr'});
        // console.log(this.users);

        /*   setTimeout(()=>{
             window.location.reload();
           },150)*/



      },
      error => {
        console.log(error.message);
        this.validLoginDetails = false;
        if (this.loading) {
          this.loading.dismiss();
        }
      }

      )


  }

  gotoSignUpPage() {
    this.navCtrl.push('SignupPage');
  }

  forgotpassPage() {
    this.navCtrl.push('ForgotpasswordPage');
  }
}
