import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyBxSeu07MOq4nqi3SmCE_XS6oumlqcj5-Q",
  authDomain: "closermind-ai.firebaseapp.com",
  projectId: "closermind-ai",
  storageBucket: "closermind-ai.firebasestorage.app",
  messagingSenderId: "872865725054",
  appId: "1:872865725054:web:0a9b833806292225d0f62f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);