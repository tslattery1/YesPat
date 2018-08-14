import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class PaginationService {
  constructor(private af: AngularFireDatabase) {}
  getBusinessData(postId, offset, startKey?): FirebaseListObservable<any> {
    return this.af.list(`/userProfile/`, {
              query: {
                orderByKey: true,
                startAt: startKey,
                limitToFirst: offset+1
              }
            });
    }
  }