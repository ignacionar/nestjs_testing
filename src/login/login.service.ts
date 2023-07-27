import { Injectable } from '@nestjs/common';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD_dSa3hw7fhBIcCW08tgVR4FQ0NbdaxD4",
  authDomain: "nest-firebase-d90cb.firebaseapp.com",
  projectId: "nest-firebase-d90cb",
  storageBucket: "nest-firebase-d90cb.appspot.com",
  messagingSenderId: "784636965674",
  appId: "1:784636965674:web:7cbafb7c32c8ef81906453",
  measurementId: "G-T49T8S0H5F"
};

@Injectable()
export class LoginService {
  async firebaseLogin(email: string, password: string): Promise<string | null> {
    firebase.initializeApp(firebaseConfig);

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);

      const user = userCredential.user;

      if (user) {
        const idToken = await user.getIdToken();
        return idToken;
      }

    } catch (error) {
      console.error(error);
    }

    return null;
  }
}
