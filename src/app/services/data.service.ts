import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  collection,
  CollectionReference,
  query,
  onSnapshot,
  orderBy,
  getDocs,
  limit,
  startAfter,
} from 'firebase/firestore';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}

  addForm(form) {
    const notesRef = this.db.collection('forms');
    return notesRef.add(form);
  }

  getSize(): Observable<any> {
    return new Observable((obs) => {
      const lengthForms = collection(this.db.firestore, 'forms');
      const docSnap = getDocs(lengthForms);
      docSnap.then((e) => {
        obs.next(e.size);
      });
    });
  }

  getForms(): Observable<any> {
    return new Observable((obs) => {
      const q = query(
        collection(this.db.firestore, 'forms'),
        orderBy('time', 'desc'),
        limit(10)
      );

      let forms = [];
      const querySnap = getDocs(q);

      querySnap.then((e) => {
        const lastVisible = e.docs[e.docs.length - 1];

        e.docs.forEach((e) => {
          let form = e.data();
          form.id = e.id; // add id key value
          forms.push(form);
        });
        obs.next({ forms, lastVisible });
      });
    });
  }

  getNext(last): Observable<any> {
    return new Observable((obs) => {
      const q = query(
        collection(this.db.firestore, 'forms'),
        orderBy('time', 'desc'),
        startAfter(last),
        limit(10)
      );

      let forms = [];
      const querySnap = getDocs(q);

      querySnap.then((e) => {
        const lastVisible = e.docs[e.docs.length - 1];

        e.docs.forEach((e) => {
          let form = e.data();
          form.id = e.id; // add id key value
          forms.push(form);
        });
        obs.next({ forms, lastVisible });
      });
    });
  }

  getFormPage(password): Observable<any> {
    return new Observable((obs) => {
      this.auth
        .signInWithEmailAndPassword('saratest@gmail.com', password)
        .then((e) => {
          obs.next(e);
        })
        .catch((e) => {
          obs.error(e);
        });
    });
  }

 
  // isLoggedIn() {
  //   return this.auth.onAuthStateChanged()
  // }
  isLogged(): Observable<any> {
    return new Observable((obs) => {
      this.auth.currentUser.then((e) => {
        obs.next(e);
      }).catch(e => {
        obs.error(e)
      })
    });
  }
}
