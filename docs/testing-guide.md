# 🧪 Guía de Testing - Sistema de Login y Notificaciones

## 📋 Funcionalidades a Probar

### 1. **Redirección por Rol después del Login**

#### Para probar la redirección basada en rol:

1. **Usuario Admin:**
   - Email: `admin@eventos.com` (o crear uno con rol 'admin')
   - Después del login → debe redirigir a `/admin`

2. **Usuario Organizer:**
   - Email: `organizer@eventos.com` (o crear uno con rol 'organizer')
   - Después del login → debe redirigir a `/organizer`

3. **Usuario Attendee:**
   - Email: `user@eventos.com` (o crear uno con rol 'attendee')
   - Después del login → debe redirigir a `/events`

#### Para probar redirección a destino original:
1. Intenta acceder a `/profile` sin estar logueado
2. Serás redirigido a `/login`
3. Haz login con cualquier usuario
4. Debes ser redirigido a `/profile` (el destino original)

### 2. **Sistema de Notificaciones**

#### Notificación de Login Exitoso:
1. Ve a `/login`
2. Ingresa credenciales válidas
3. Debería aparecer una notificación verde animada: "¡Login exitoso! Bienvenido de vuelta."
4. La notificación debe desaparecer automáticamente después de 2 segundos

#### Notificaciones de Error:
1. Ve a `/login`
2. Intenta hacer login con credenciales inválidas
3. Debería aparecer una notificación roja con el error
4. También aparece el mensaje de error debajo del formulario

#### Validaciones del Formulario:
1. Intenta enviar el formulario vacío → notificación de error
2. Ingresa un email inválido → notificación de error
3. Los errores deben limpiar cuando empiezas a escribir

### 3. **Animaciones y UX**

#### Durante el Login:
- [ ] Spinner en el botón durante el loading
- [ ] Campos deshabilitados durante el envío
- [ ] Botón deshabilitado si los campos están vacíos

#### Notificaciones:
- [ ] Animación de entrada con efecto "bounce"
- [ ] Posicionamiento correcto en la esquina superior derecha
- [ ] Apilamiento vertical si hay múltiples notificaciones
- [ ] Botón de cerrar funcional con hover effect
- [ ] Auto-cierre después del tiempo especificado

## 🚨 Casos de Prueba Específicos

### Escenario 1: Login de Admin
```
1. Navegar a /login
2. Ingresar credenciales de admin
3. Verificar notificación de éxito
4. Verificar redirección a /admin
5. Verificar que el header muestra el rol correcto
```

### Escenario 2: Logout y Login de Usuario Normal
```
1. Si estás logueado, hacer logout
2. Navegar a /login
3. Ingresar credenciales de usuario normal
4. Verificar notificación de éxito
5. Verificar redirección a /events
```

### Escenario 3: Acceso a Ruta Protegida
```
1. Sin estar logueado, navegar directamente a /admin
2. Verificar redirección a /login
3. Hacer login exitoso
4. Verificar redirección automática a /admin
```

### Escenario 4: Múltiples Notificaciones
```
1. Ir a la consola del navegador
2. Ejecutar manualmente:
   - useNotifications().showSuccess('Éxito 1')
   - useNotifications().showError('Error 1')
   - useNotifications().showWarning('Advertencia 1')
3. Verificar que se apilan correctamente
4. Verificar que se cierran en orden
```

## 🔧 Testing en Consola del Navegador

Para probar las notificaciones manualmente desde la consola:

```javascript
// Obtener el contexto de notificaciones (solo funciona si estás en un componente)
// Estos comandos solo funcionarán si modificas temporalmente un componente para exponer las funciones

// Simular notificaciones
showSuccess('¡Operación exitosa!', 3000);
showError('Error de prueba', 5000);
showWarning('Advertencia de prueba');
showInfo('Información importante');

// Múltiples notificaciones
for(let i = 1; i <= 3; i++) {
  showSuccess(`Notificación ${i}`, 2000 + i * 1000);
}
```

## 📱 Testing Responsive

### Mobile (< 768px):
- [ ] Notificaciones se ajustan al ancho de pantalla
- [ ] Formulario de login es touch-friendly
- [ ] Botones tienen el tamaño mínimo recomendado (44px)

### Tablet (768px - 1024px):
- [ ] Notificaciones mantienen ancho fijo
- [ ] Layout del login se centra correctamente

### Desktop (> 1024px):
- [ ] Notificaciones en esquina superior derecha
- [ ] Hover effects funcionan correctamente

## ⚡ Performance Testing

### Métricas a Verificar:
- [ ] Las notificaciones no afectan el rendimiento general
- [ ] Las animaciones son suaves (60fps)
- [ ] El cleanup de notificaciones funciona correctamente
- [ ] No hay memory leaks en el sistema de notificaciones

## 🔍 Debugging Tips

### Si las notificaciones no aparecen:
1. Verificar que `NotificationProvider` esté en `App.tsx`
2. Verificar que `NotificationContainer` esté renderizado
3. Verificar la consola para errores de React

### Si la redirección no funciona:
1. Verificar que el usuario tiene el rol correcto
2. Verificar que `Router` esté por encima de `AuthProvider`
3. Verificar la consola para errores de React Router

### Si las animaciones no funcionan:
1. Verificar que los estilos CSS se están cargando
2. Verificar que no hay configuración de `prefers-reduced-motion`
3. Verificar que el navegador soporta las animaciones CSS

## ✅ Checklist Final

- [ ] Login exitoso muestra notificación verde
- [ ] Errores de login muestran notificación roja
- [ ] Admin se redirige a `/admin`
- [ ] Organizer se redirige a `/organizer` 
- [ ] Attendee se redirige a `/events`
- [ ] Redirección a destino original funciona
- [ ] Notificaciones se animan correctamente
- [ ] Múltiples notificaciones se apilan
- [ ] Auto-cierre de notificaciones funciona
- [ ] Botón de cerrar manual funciona
- [ ] Responsive design funciona en todos los dispositivos
- [ ] No hay errores en la consola
- [ ] Performance es aceptable
