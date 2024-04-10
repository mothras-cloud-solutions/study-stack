// eslint-disable-next-line @typescript-eslint/no-var-requires
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgJULJDmRIYOhom1LVlmAF91EhuQM3XpQ",
  authDomain: "jumping-jack-flash-study-stack.firebaseapp.com",
  projectId: "jumping-jack-flash-study-stack",
  appId: "1:305265090077:web:8e7280f5219fc9f511f0f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export function signInWithGoogle(): Promise<User> {
  return signInWithPopup(auth, new GoogleAuthProvider());

}

export function signOut(): Promise<void> {
  return auth.signOut();
}

export function onAuthStateChange(callback: (user: User | null) => void): void {
  onAuthStateChanged(auth, callback);
}
export function createUser(email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function signInWithEmail(email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}



