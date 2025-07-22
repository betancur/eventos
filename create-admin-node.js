#!/usr/bin/env node

// Script para crear usuario admin
// Ejecutar con: node create-admin.js

const admin = require('firebase-admin');
const readline = require('readline');

// Configuración de Firebase Admin
const serviceAccount = {
  // Aquí necesitarías las credenciales del service account
  // Por seguridad, deberías tenerlas en variables de entorno
};

// Inicializar Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
  });
}

const auth = admin.auth();
const db = admin.firestore();

const createAdminUser = async () => {
  const adminData = {
    email: 'admin@eventos.com',
    password: 'admin123456',
    name: 'Admin User',
    role: 'admin'
  };

  try {
    console.log('🔄 Creando usuario administrador...');
    
    // Crear usuario en Firebase Auth
    const userRecord = await auth.createUser({
      email: adminData.email,
      password: adminData.password,
      displayName: adminData.name,
    });

    // Establecer custom claims para el rol de admin
    await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });

    // Crear documento en Firestore
    await db.collection('users').doc(userRecord.uid).set({
      id: userRecord.uid,
      email: adminData.email,
      name: adminData.name,
      role: adminData.role,
      avatar_url: null,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('✅ ¡Usuario administrador creado exitosamente!');
    console.log('📧 Email:', adminData.email);
    console.log('🔑 Password:', adminData.password);
    console.log('👤 Role:', adminData.role);
    console.log('🆔 UID:', userRecord.uid);
    
  } catch (error) {
    console.error('❌ Error al crear usuario admin:', error.message);
    if (error.code === 'auth/email-already-exists') {
      console.log('ℹ️ El email ya está en uso. El usuario admin ya existe.');
    }
  }

  process.exit(0);
};

// Función principal
const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('¿Estás seguro de que quieres crear un usuario administrador? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      createAdminUser();
    } else {
      console.log('Operación cancelada.');
      process.exit(0);
    }
    rl.close();
  });
};

main();
