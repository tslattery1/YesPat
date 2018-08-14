import { Component, Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Platform} from 'ionic-angular';



@Injectable(
)
export class PushNotification {

    devices: any;
    constructor(
        private _http: Http,
        private platform : Platform,

    ) { }

    sendPush(message){

        if(this.platform.is('android') || this.platform.is('core')){
            return this._http.post("http://yaspat.deapps.io:3001/newRequest",message)
                    .map((response)=>response.json()); 
        }
        else
        if(this.platform.is('ios')){
            return this._http.post("http://yaspat.deapps.io:3001/newRequestIos",message)
                    .map((response)=>response.json()); 
        }
                         
    }

  
}