import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  serverTimestamp,
} from '@angular/fire/firestore';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseLogService {

  private firestore = inject(Firestore);

  trackVisit() {

    return addDoc(
      collection(this.firestore, 'visits'),
      {
        createdAt: serverTimestamp(),
      }
    );

  }

  trackReading(
    category: string,
    type: 'NORMAL' | 'DAILY' = 'NORMAL'
  ) {
  
    return addDoc(
      collection(this.firestore, 'readings'),
      {
        category,
        type,
        createdAt: serverTimestamp(),
      }
    );
  
  }

  getVisitCount(): Observable<number> {

    return collectionData(
      collection(this.firestore, 'visits')
    ).pipe(
      map(res => res.length)
    );

  }

  getReadingCount(): Observable<number> {

    return collectionData(
      collection(this.firestore, 'readings')
    ).pipe(
      map(res => res.length)
    );

  }

}