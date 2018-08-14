import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

/**
 * Generated class for the AdditemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-additem',
  templateUrl: 'additem.html',
})
export class AdditemPage {
  menuItemForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.menuItemForm = new FormGroup({
      itemName: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
      price: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdditemPage');
  }

  closeModal() {
      this.viewCtrl.dismiss();
  }

  addMenuItem() {
    this.menuItemForm.markAsDirty();
    if (this.menuItemForm.valid) {
      console.log('dismiss with value', this.menuItemForm.value);
      this.viewCtrl.dismiss(this.menuItemForm.value);
    }
  }

}
