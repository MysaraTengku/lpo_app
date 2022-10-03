import { Injectable } from '@angular/core';
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
  constructor(private db: AngularFirestore) {}

  addForm(form) {
    const notesRef = this.db.collection('forms');
    return notesRef.add(form);
  }

  getSize(): Observable<any> {
    return new Observable((obs) => {
      const lengthForms = collection(this.db.firestore, "forms");
      const docSnap = getDocs(lengthForms)
      docSnap.then(e => {
        obs.next(e.size)
      })
    });
  }


   getForms(): Observable<any> {
     return new Observable((obs) => {
      const q = query(
        collection(this.db.firestore, 'forms'),
        orderBy('time', 'desc'),
        limit(10));

      let forms = []
      const querySnap = getDocs(q);
  
      querySnap.then(e => {
        const lastVisible = e.docs[e.docs.length-1];

        e.docs.forEach(e => {
          let form = e.data();
          form.id = e.id; // add id key value
          forms.push(form)
        })
        obs.next({forms, lastVisible})
      })
  
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

      
      let forms = []
      const querySnap = getDocs(q);
  
      querySnap.then(e => {
        const lastVisible = e.docs[e.docs.length-1];

        e.docs.forEach(e => {
          let form = e.data();
          form.id = e.id; // add id key value
          forms.push(form)
        })
        obs.next({forms, lastVisible})
      })

    })
  }
}
