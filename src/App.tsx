import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { NotificationProvider } from './components/NotificationProvider';
import NotificationContainer from './components/NotificationContainer';

// Layout Components
import Header from './components/Layout/Header';
import MobileNav from './components/Layout/MobileNav';

// Public Pages
import EventList from './events/EventList';
import EventDetails from './events/EventDetails';
// Event-specific components will be imported as needed
// import EventGallery from './events/EventGallery';
// import EventMap from './events/EventMap';
// import EventActivities from './events/EventActivities';

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
    <NotificationProvider>
      <Router>
        <AuthProvider>
          <div className="App">
            <Header />
            <main className="main-content">
              <div className="container">
                <Routes>
                  {/* Public Routes - Event-centered */}
                  <Route path="/" element={<Navigate to="/events" replace />} />
                  <Route path="/events" element={<EventList />} />
                  <Route path="/events/:eventId" element={<EventDetails />} />
                  <Route path="/events/:eventId/info" element={<EventDetails />} />
                  <Route path="/events/:eventId/gallery" element={<EventDetails />} />
                  <Route path="/events/:eventId/map" element={<EventDetails />} />
                  <Route path="/events/:eventId/activities" element={<EventDetails />} />
                  <Route path="/events/:eventId/activities/:activityId" element={<EventDetails />} />
                  
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
                  
                  {/* Organizer Routes */}
                  <Route 
                    path="/organizer" 
                    element={
                      <ProtectedRoute requiredRole="organizer">
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/organizer/events" 
                    element={
                      <ProtectedRoute requiredRole="organizer">
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/organizer/events/new" 
                    element={
                      <ProtectedRoute requiredRole="organizer">
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/organizer/events/:eventId/edit" 
                    element={
                      <ProtectedRoute requiredRole="organizer">
                        <AdminDashboard />
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
                </Routes>
              </div>
            </main>
            <MobileNav />
            <NotificationContainer />
          </div>
        </AuthProvider>
      </Router>
    </NotificationProvider>
  );
}

export default App;
