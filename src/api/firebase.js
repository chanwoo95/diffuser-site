import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove, set } from "firebase/database";
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
  return onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await adminsUser(user) : null;
    callback(updateUser);
  });
}

async function adminsUser(user) {
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmins = admins.includes(user.uid);
        return { ...user, isAdmins };
      }
      return user;
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

export async function addCart(uid, product, quantity) {
  const id = uuidv4();
  return set(ref(database, `carts/${uid}/${id}`), {
    ...product,
    id,
    quantity,
  });
}

export async function loadCart(uid) {
  return get(ref(database, `carts/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
  });
}

export async function updatedProducts(uid, product) {
  return set(ref(database, `carts/${uid}/${product.id}`), product);
}

export async function addNewProduct(image, product) {
  const id = uuidv4();
  const format = parseInt(product.price);
  const price = format.toLocaleString();

  return set(ref(database, `products/${id}`), {
    ...product,
    imageURL: image,
    price,
  });
}

export async function removeProducts(uid, product) {
  return remove(ref(database, `carts/${uid}/${product.id}`));
}
