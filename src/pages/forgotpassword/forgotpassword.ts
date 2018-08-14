import { Component } from '@angular/core';
import { NgForm } from "@angular/forms/forms";
import { NavController, LoadingController } from "ionic-angular";
//import { LoginPage } from "../login/login";
import { IonicPage, ToastController } from 'ionic-angular';

import { DomSanitizer } from '@angular/platform-browser';
import { Auth } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})

export class ForgotpasswordPage {
  showSubmitMessage: boolean = false;
  resetPasswordString: string;
  showResponse: boolean = false;
  showEmail: boolean = true;
  showOTP: boolean = false;
  showPassword: boolean = false;

  constructor(
    private navCtrl: NavController,
    public loadingCtrl: LoadingController,
  
    public sanitizer: DomSanitizer,
    private auth: Auth,
    private toastCtrl: ToastController


  ) { }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.showSubmitMessage = true;
    this.auth.resetPassword(form.value.email)
      .then((user) => {
        // let toast = this.toastCtrl.create({
        //   message: 'We have sent a link to reset password on your registered email-id',
        //   duration: 2000,
        //   position: 'middle'
        // });
        // toast.present();

      },
      error => {
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 2000,
          position: 'middle'
        });
        toast.present();

      }
      )
  }



}
