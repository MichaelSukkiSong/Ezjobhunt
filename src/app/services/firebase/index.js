import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCWDK4Dczs1KBhnmuZSH1UbvlnbYFuXpsY',
  authDomain: 'ezjobhunt-6a34f.firebaseapp.com',
  projectId: 'ezjobhunt-6a34f',
  storageBucket: 'ezjobhunt-6a34f.appspot.com',
  messagingSenderId: '759583787906',
  appId: '1:759583787906:web:d769e9dfc76dc3d71a9d9b',
  measurementId: 'G-7HR8RXDNDQ',
};

class Firebase {
  static getInstance(config) {
    return new Firebase(config);
  }

  constructor(config) {
    this.app = initializeApp(config);
  }

  getFirestore() {
    const db = getFirestore(this.app);

    return db;
  }
}

const fb = Firebase.getInstance(firebaseConfig);

export default fb;
