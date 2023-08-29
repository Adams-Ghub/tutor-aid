import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

// import 'firebase/compat/firestore';
// import "firebase/firestore";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsb0TsGJ49dUdXZI30L2GeEHiREKkXrd4",
    authDomain: "tutor-aid.firebaseapp.com",
    projectId: "tutor-aid",
    storageBucket: "tutor-aid.appspot.com",
    messagingSenderId: "589088521315",
    appId: "1:589088521315:web:431426aaee443a067c0c56"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db};
