import { Injectable } from '@nestjs/common';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  // ...
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
