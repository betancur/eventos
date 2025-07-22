// Script para crear usuario admin desde la consola del navegador
// Copia y pega este código en la consola del navegador (F12 -> Console)

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './src/auth/firebase';

const createAdmin = async () => {
  const adminData = {
    email: 'admin@eventos.com',
    password: 'admin123456',
    name: 'Admin User',
    role: 'admin'
  };

  try {
    console.log('🔄 Creando usuario administrador...');
    
    // Crear usuario en Firebase Auth
    const result = await createUserWithEmailAndPassword(auth, adminData.email, adminData.password);
    
    // Actualizar el nombre del usuario
    await updateProfile(result.user, {
      displayName: adminData.name
    });

    // Crear perfil en Firestore
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

    console.log('✅ ¡Usuario administrador creado exitosamente!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('👤 Role:', adminData.role);
    console.log('🆔 UID:', result.user.uid);
    
    return result.user;
  } catch (error) {
    console.error('❌ Error al crear usuario admin:', error.message);
    if (error.code === 'auth/email-already-in-use') {
      console.log('ℹ️ El email ya está en uso. El usuario admin ya existe.');
    }
  }
};

// Ejecutar la función
createAdmin();
