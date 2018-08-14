import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
//import { Base64 } from '@ionic-native/base64';

export class ImageProvider {

  constructor() {
  }

  uploadImage(image: string, userId: string): any {
    console.log('profile ', image, userId);
    let storageRef = firebase.storage().ref();
    let imageName = this.generateUUID();
    let imageRef = storageRef.child(`${userId}/${imageName}.jpg`);
    return imageRef.putString(image, 'data_url');
  }

  deleteImageFile(filepath: string, userId: string): any {
    let storageRef = firebase.storage().ref();
    let deletImageName = this.getImageName(filepath);
    let imageRef = storageRef.child(`${userId}/${deletImageName}.jpg`);
    return  imageRef.delete();
  }

  getImageName(filepath) {
    let filename = filepath.match(new RegExp('%2F' + "(.*)" + '.jpg'));
    return filename[1];
  }

  uploadImageFile(filepath: string, userId: string): any {
    console.log('profile ', filepath, userId);
    let storageRef = firebase.storage().ref();
    let imageName = this.generateUUID();
    let imageRef = storageRef.child(`${imageName}`);
    return imageRef.putString(filepath, 'base64url');
  }

  getImage(userId: string, imageId: string): any {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child(`${userId}/${imageId}`);
    return imageRef.getDownloadURL();
  }

  private generateUUID(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}