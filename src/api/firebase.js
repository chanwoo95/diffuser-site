import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

const provider = new GoogleAuthProvider();

export function login() {
  return signInWithPopup(auth, provider);
}

export function logout() {
  return signOut(auth);
}

export function onAuthChanged(callback) {
  return onAuthStateChanged(auth, (user) => {
    // 로그인한 유저 정보가 있다면 유지
    // 유저 정보가 없다면 null
    callback(user);
  });
}
