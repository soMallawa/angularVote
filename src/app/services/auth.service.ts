import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap( user => {
        if(user) {
          this.userData = user;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of (null);
        }
      })
    )
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    //this.userData = credential.user;
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL
    } 

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    //this.router.navigate(['/']);
  }

  updateVoteStatus () {
    console.log(this.userData)
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.userData.uid}`);
    const data = { 
     isUsed: true
    } 
    return userRef.update(data).then(()=>{
      console.log(`Data updated for uid: ${this.userData.uid}`)
   })
  }

}
