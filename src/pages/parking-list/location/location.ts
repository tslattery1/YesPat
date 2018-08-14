import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  public currentLocation: any;
  public end:any;
  latitude: any;
  longitude: any;
  destinationLocation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.end = this.navParams.get("end");
    this.currentLocation = this.navParams.get("currentLocation")
  }

  ionViewDidLoad() {
    this.navigateLocation(this.end);
  }
  close(){
   this.viewCtrl.dismiss();
  }
  navigateLocation(end) {
    console.log('Start Location ', this.currentLocation);
    console.log('End Location', end);
    this.destinationLocation = end;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: this.navParams.get("lat"), lng: this.navParams.get("lang")}
    });
    directionsDisplay.setMap(map);
    this.calculateAndDisplayRoute(directionsService, directionsDisplay);
  }

   calculateAndDisplayRoute(directionsService, directionsDisplay) {
    console.log('directionsService ', directionsService, directionsDisplay);
    directionsService.route({
      origin: this.currentLocation,
      destination: this.destinationLocation,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
