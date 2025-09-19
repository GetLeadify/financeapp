
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: Replace the placeholder values below with your app's Firebase project configuration.
// You can get this from the Firebase console in your project's settings.
// The previous code used environment variables which are not available in this setup.
// You must manually enter your credentials for Firebase to connect.
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};

// Check if the Firebase configuration has been updated.
// If not, throw a helpful error to the developer to prevent cryptic errors.
if (firebaseConfig.apiKey === "REPLACE_WITH_YOUR_API_KEY") {
  throw new Error(
    "Firebase configuration is incomplete. " +
    "Please replace the placeholder values in `services/firebase.ts` with your actual Firebase project credentials. " +
    "You can find these in your project's settings on the Firebase Console."
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);