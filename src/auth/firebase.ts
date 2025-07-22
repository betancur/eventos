import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Validate Firebase configuration
const validateFirebaseConfig = () => {
  const requiredFields = [
    'apiKey',
    'authDomain', 
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId'
  ];
  
  const missing = requiredFields.filter(field => !firebaseConfig[field as keyof typeof firebaseConfig]);
  
  if (missing.length > 0) {
    console.warn('⚠️ Missing Firebase configuration:', missing);
    return false;
  }
  
  return true;
};

let app: FirebaseApp | undefined;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

try {
  if (validateFirebaseConfig()) {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase services
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    console.log('✅ Firebase initialized successfully');
  } else {
    console.error('⚠️ Firebase not initialized due to missing configuration');
    // Throw an error to prevent the app from running with invalid config
    throw new Error('Firebase configuration is incomplete');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw error; // Re-throw to prevent the app from running
}

// Export the initialized services - they will be defined if the config is valid
export { auth, db, storage };
export default app;
