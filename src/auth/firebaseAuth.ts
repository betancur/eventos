// Firebase Auth implementation
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from './types';

export const firebaseAuthApi = {
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { data: { user: result.user }, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Sign up with email and password
  signUp: async (email: string, password: string, metadata: { name: string; role: string }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(result.user, {
        displayName: metadata.name
      });

      // Create user profile in Firestore
      const userProfile = {
        id: result.user.uid,
        email: result.user.email,
        name: metadata.name,
        role: metadata.role,
        avatar_url: null,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };

      await setDoc(doc(db, 'users', result.user.uid), userProfile);

      return { data: { user: result.user }, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  },

  // Reset password
  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: any) {
      return { error: { message: error.message } };
    }
  },

  // Get current session
  getSession: () => {
    return { data: { session: auth.currentUser ? { user: auth.currentUser } : null } };
  },

  // Auth state change listener
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        callback('SIGNED_IN', { user });
      } else {
        callback('SIGNED_OUT', null);
      }
    });

    return { data: { subscription: { unsubscribe } } };
  }
};

export const firebaseUserApi = {
  // Get user profile
  getProfile: async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          data: {
            id: data.id,
            email: data.email,
            name: data.name,
            avatar_url: data.avatar_url,
            role: data.role,
            created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
            updated_at: data.updated_at?.toDate?.()?.toISOString() || new Date().toISOString()
          },
          error: null
        };
      } else {
        return { data: null, error: { message: 'User profile not found' } };
      }
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<User>) => {
    try {
      const userRef = doc(db, 'users', userId);
      const updateData = {
        ...updates,
        updated_at: serverTimestamp()
      };

      await updateDoc(userRef, updateData);

      // Get updated profile
      const updatedDoc = await getDoc(userRef);
      const data = updatedDoc.data();

      return {
        data: {
          ...data,
          updated_at: new Date().toISOString()
        },
        error: null
      };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  },

  // Create user profile (for registration)
  createProfile: async (profile: Omit<User, 'created_at' | 'updated_at'> & { created_at?: any; updated_at?: any }) => {
    try {
      const userRef = doc(db, 'users', profile.id);
      const profileData = {
        ...profile,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      };

      await setDoc(userRef, profileData);
      return { data: profileData, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error.message } };
    }
  }
};
