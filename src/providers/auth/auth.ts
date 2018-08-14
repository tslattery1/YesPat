import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class Auth {
    constructor() { }

    loginUser(email: string, password: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    // playerId: any, pushToken: any, 

    signupUser(email: string, password: string, name : string, phoneNumber: number, playerId: any, pushToken: any, role: string, points: number = 0): Promise<any> {
        return new Promise((res, err) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(newUser => { 
                firebase.database().ref('/userProfile').child(newUser.uid)
                    .set({ email: email, name : name , phoneNumber: phoneNumber,playerId: playerId, pushToken: pushToken, user_role: role, points: points, subscription: false, publisherDetails:'publisherDetails',requesterDetails:'requesterDetails' });
                res(newUser.uid);
            }, (error) => {
                console.log('Error1', error);
                err(error);
            }).catch((error) => {
                console.log('Error2', error);
                err(error);
            });
        })
    }

    signupBussiness(UID, email: string, bussinessName: string, address: string, phnNo: number, altrNo: number, bussinessType: string, website: string, bussinessImages: any, location: any, role: string, bussiness_verify: boolean = false) {
        return firebase.database().ref('/businessProfile').child(UID)
                .set({ email: email, bussinessName:bussinessName, address:address, phoneNumber:phnNo, alternateNumber: altrNo, bussinessType:bussinessType, website:website, bussinessImages: bussinessImages, location: location, user_role: role, bussiness_verify: bussiness_verify, publisherDetails:'publisherDetails',requesterDetails:'requesterDetails' });
      
    }

    resetPassword(email: string): Promise<void> {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    logoutUser(): Promise<void> {
        return firebase.auth().signOut();
    }
}

