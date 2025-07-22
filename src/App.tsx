import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';

// Layout Components
import Header from './components/Layout/Header';
import MobileNav from './components/Layout/MobileNav';

// Public Pages
import EventList from './events/EventList';
import EventDetails from './events/EventDetails';
import PhotoGallery from './gallery/PhotoGallery';
import MapView from './maps/MapView';

// Auth Pages
import Login from './auth/Login';
import Register from './auth/Register';
import ForgotPassword from './auth/ForgotPassword';
import ProtectedRoute from './auth/ProtectedRoute';

// Protected Pages
import Profile from './components/Profile';
import AdminDashboard from './admin/AdminDashboard';

// Styles
import './styles/global.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <div className="container">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/events" replace />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/gallery" element={<PhotoGallery />} />
                <Route path="/map" element={<MapView />} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
          </main>
          <MobileNav />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
