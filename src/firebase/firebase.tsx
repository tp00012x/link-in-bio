import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { IAuthUser, IUser } from "../context/UserProvider.tsx";
import { ILink } from "../context/LinksProvider.tsx";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export async function uploadFirebaseImage(name: string, imageFile: Blob) {
  const storageRef = ref(storage, `images/${name}`);
  const snapshot = await uploadBytes(storageRef, imageFile);
  return await getDownloadURL(snapshot.ref);
}

export const auth = getAuth();
export const signInWithPassword = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (
  callback: (user: IUser | null) => void
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return onAuthStateChanged(auth, callback);
};
export const db = getFirestore();

export function getLinksDocRef(userUid: string) {
  return doc(db, "links", userUid);
}

export async function getFirebaseLinksDocument(userUid: string) {
  const linksDocRef = getLinksDocRef(userUid);
  const linksSnapshot = await getDoc(linksDocRef);
  return linksSnapshot.data();
}

export async function updateFirebaseLinkDocument(
  userUid: string,
  linkData: { links: ILink[] }
) {
  await setDoc(getLinksDocRef(userUid), linkData, { merge: true });
}

export async function updateFirebaseUserDocument(
  userUid: string,
  userData: Partial<IUser>
) {
  await setDoc(doc(db, "users", userUid), userData, { merge: true });
}

export const getOrCreateFirebaseUserDocument = async (authUser: IAuthUser) => {
  let userDocRef = doc(db, "users", authUser.uid);
  let userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as IUser;
  }

  const { email } = authUser;
  const createdAt = new Date();
  await updateFirebaseUserDocument(authUser.uid, {
    uid: authUser.uid,
    email,
    createdAt,
  });

  userDocRef = doc(db, "users", authUser.uid);
  userSnapshot = await getDoc(userDocRef);
  return userSnapshot.data() as IUser;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
