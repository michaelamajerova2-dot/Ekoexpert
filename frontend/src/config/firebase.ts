import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8AJ3EHwp14uJJUA3WijvLmsONmepeBYUA",
  authDomain: "smakociny-484a8.firebaseapp.com",
  projectId: "smakociny-484a8",
  storageBucket: "smakociny-484a8.firebasestorage.app",
  messagingSenderId: "137995830670",
  appId: "1:137995830670:web:984cbe780604087e3d50df"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
