import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
}from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC7K5_kkXEzJcpeu7MBhch6rTb0g3izn5s",
    authDomain: "crwn-clothing-db-7f352.firebaseapp.com",
    projectId: "crwn-clothing-db-7f352",
    storageBucket: "crwn-clothing-db-7f352.appspot.com",
    messagingSenderId: "93733493391",
    appId: "1:93733493391:web:426ff4ae66e9d6220beefa"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = ()  => signInWithPopup(auth,provider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db,'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
      const {displayName,email} = userAuth;
      const createAt = new Date();

      try{
        await setDoc(userDocRef,{
          displayName,
          email,
          createAt
        })
      } catch(error){
        console.log('error creating the user',error.message);
      }

    }

    return userDocRef;
    // if user date exists
    // if user date does not exists
    // return userDocRef
  };