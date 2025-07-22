// Firebase Admin Setup Script
// Run this once to create an admin user in Firebase

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../auth/firebase';

export const createAdminUser = async () => {
  const adminData = {
    email: 'admin@eventos.com',
    password: 'admin123456',
    name: 'Admin User',
    role: 'admin'
  };

  try {
    console.log('Creating admin user...');
    
    // Create user in Firebase Auth
    const result = await createUserWithEmailAndPassword(auth, adminData.email, adminData.password);
    
    // Update the user's display name
    await updateProfile(result.user, {
      displayName: adminData.name
    });

    // Create user profile in Firestore
    const userProfile = {
      id: result.user.uid,
      email: result.user.email,
      name: adminData.name,
      role: adminData.role,
      avatar_url: null,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    };

    await setDoc(doc(db, 'users', result.user.uid), userProfile);

    console.log('✅ Admin user created successfully!');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('Role:', adminData.role);
    
    return {
      success: true,
      user: result.user,
      credentials: {
        email: adminData.email,
        password: adminData.password
      }
    };
  } catch (error: any) {
    console.error('❌ Failed to create admin user:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

// Instructions for use:
// 1. Import this function in your component
// 2. Call it once when you need to create an admin user
// 3. Use the returned credentials to log in
