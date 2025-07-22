# Eventos App

A modern, mobile-first event management and attendee engagement platform built with React, TypeScript, and Firebase.

## Features Implemented

### ✅ Step 1: Project Structure and Tooling
- React 18 with TypeScript
- Mobile-first responsive design
- React Router for navigation
- Netlify deployment configuration
- Firebase integration setup

### ✅ Step 2: Public Event Info Access
- **Event List**: Browse all available events
- **Event Details**: Comprehensive event information including:
  - Event description and details
  - Schedule/agenda with speakers
  - Featured speakers with bios
  - Location and capacity information
- **Photo Gallery**: View event photos with filtering
- **Interactive Map**: Clickable venue map with space details

### ✅ Step 3: Authentication and User Management (PRODUCTION-READY)
- **Firebase Authentication**: Complete integration with Firebase Auth
- **User Registration**: Secure account creation with profile setup
- **User Login**: Email/password authentication
- **Password Management**: Reset and change password functionality
- **Role-based Access**: Three-tier system (Attendee, Organizer, Admin)
- **Protected Routes**: Route protection based on authentication and roles
- **User Profiles**: Complete profile management with real-time updates
- **Session Persistence**: Automatic login state management
- **Mobile Responsive**: Optimized forms and navigation for all devices

## Project Structure

```
src/
├── auth/                    # Complete Firebase authentication system
│   ├── AuthProvider.tsx     # Auth context and state management
│   ├── Login.tsx           # User login form
│   ├── Register.tsx        # User registration form  
│   ├── ForgotPassword.tsx  # Password reset functionality
│   ├── ChangePassword.tsx  # Password change modal
│   ├── ProtectedRoute.tsx  # Role-based route protection
│   ├── firebase.ts         # Firebase configuration
│   ├── firebaseAuth.ts     # Firebase Auth API wrapper
│   └── types.ts           # Auth-related TypeScript types
├── admin/                  # Admin dashboard components
│   ├── AdminDashboard.tsx  # Main admin interface
│   └── UserManagement.tsx  # User administration
├── components/
│   ├── Layout/
│   │   ├── Header.tsx      # Top navigation bar with user menu
│   │   └── MobileNav.tsx   # Bottom mobile navigation
│   └── Profile.tsx         # User profile management
├── events/
│   ├── EventList.tsx       # List of all events
│   └── EventDetails.tsx    # Individual event page
├── gallery/
│   └── PhotoGallery.tsx    # Photo gallery with filtering
├── maps/
│   └── MapView.tsx         # Interactive venue map
├── styles/
│   └── global.css          # Mobile-first CSS styles
├── App.tsx                 # Main app component with routing
└── index.tsx               # App entry point
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase project configured
- Environment variables set up

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase environment variables:**
   Create a `.env` file in the root directory with your Firebase configuration:
   ```bash
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Firebase Configuration

### Required Services
- **Firebase Authentication**: User login/registration
- **Cloud Firestore**: User profiles and application data
- **Firebase Storage**: File uploads (configured, not yet implemented)

### Firestore Collections
```
/users/{userId}
  - id: string
  - email: string
  - name: string
  - role: "attendee" | "organizer" | "admin"
  - avatar_url?: string
  - created_at: timestamp
  - updated_at: timestamp
```

## Current Status

The app includes a complete, production-ready authentication system with Firebase integration:

### ✅ Authentication Features
- **User Registration**: Secure account creation with automatic profile generation
- **Email/Password Login**: Firebase-powered authentication
- **Password Reset**: Email-based password recovery
- **Password Change**: Secure password updates with re-authentication
- **Session Management**: Automatic login state persistence
- **Role-based Access**: Three-tier permission system
- **Profile Management**: Real-time profile updates
- **Mobile Optimized**: Responsive design for all devices

### ✅ Application Features
- **Responsive Design**: Mobile-first with progressive enhancement
- **Event Browsing**: List and detailed views of events
- **Photo Gallery**: Interactive photo viewing with modal display
- **Interactive Maps**: Clickable venue maps with space information
- **Navigation**: Intuitive routing with protected areas
- **User Interface**: Modern, accessible design patterns

## User Roles & Permissions

### Attendee (Default)
- View public content (events, gallery, maps)
- Manage personal profile
- Access to future registration features

### Organizer
- All attendee permissions
- Access to event creation/management (planned)
- Content management capabilities (planned)

### Admin
- Full system access
- User management and moderation
- System administration features

## Next Development Phase

### 🚧 Step 4: Event Creation and Management
- CRUD operations for events by organizers
- Schedule and speaker management
- Event publishing workflow

### 🚧 Step 5: Activity Registration System
- User enrollment in events and activities
- Registration requirements and limits
- Attendee management for organizers

### 🚧 Step 6: Enhanced Admin Features
- User role management
- Content moderation tools
- System analytics and reporting

## Technology Stack

- **Frontend**: React 18, TypeScript, React Router
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage
- **Styling**: CSS3 with mobile-first approach
- **Build Tools**: Create React App, TypeScript
- **Deployment**: Netlify
- **Testing**: Jest, React Testing Library

## Security Features

- **Firebase Security Rules**: Server-side data protection
- **Input Validation**: Client and server-side validation
- **Authentication Required**: Protected routes and API endpoints
- **Role-based Authorization**: Granular permission system
- **Secure Password Management**: Firebase Auth handles encryption

## Design Principles

- **Mobile-first**: Optimized for mobile devices with progressive enhancement
- **Accessibility**: WCAG-compliant design patterns
- **Performance**: Optimized loading and responsive images  
- **User Experience**: Intuitive navigation and clear information hierarchy
- **Security**: Authentication-first architecture with role-based access