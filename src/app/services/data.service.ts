import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  collection,
  CollectionReference,
  query,
  onSnapshot,
  orderBy,
  getDocs,
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

   getForms(): Observable<any> {


    return new Observable((obs) => {
      // Read collection '/loans'
      const q = query(
        collection(this.db.firestore, 'forms'),
        orderBy('time', 'desc')
      );
      let forms = []
      const querySnap = getDocs(q);
      querySnap.then(e => {
        
        e.docs.forEach(e => {
          let form = e.data();
          form.id = e.id; // add id key value
          forms.push(form)
          console.log(e.data())
        })
        obs.next(forms)
      })
  
    });
  }
}
