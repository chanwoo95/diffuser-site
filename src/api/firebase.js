import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { v4 as uuidv4 } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);

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

export async function getProducts() {
  return get(ref(database, "products")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        return Object.values(val);
      }
    });
}

export async function addCart(product, quantity) {
  const id = uuidv4();
  return set(ref(database, `carts/${id}`), {
    ...product,
    id,
    quantity,
  });
}

export async function loadCart() {
  return get(ref(database, "carts")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
  });
}
