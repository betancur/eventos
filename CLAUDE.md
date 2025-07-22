# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm start` - Start development server (mobile-first React app)
- `npm run build` - Build for production (outputs to `build/` folder)
- `npm test` - Run tests using Jest and React Testing Library

### Deployment
- `npm run build && netlify deploy --prod` - Deploy to Netlify production
- The app is configured for Netlify deployment with SPA routing support

## Architecture Overview

### Authentication System
The app uses **Firebase Authentication** exclusively:
- **Firebase Auth** (`src/auth/firebaseAuth.ts`) for all authentication operations
- **Firestore** for user profile management and role-based access control
- Authentication managed via React Context in `src/auth/AuthProvider.tsx`
- Role hierarchy: attendee < organizer < admin
- Protected routes with role-based access control

### Key Components Structure
```
src/
├── auth/           # Complete Firebase authentication system
│   ├── AuthProvider.tsx     # Auth context and state management
│   ├── Login.tsx           # User login form
│   ├── Register.tsx        # User registration form
│   ├── ForgotPassword.tsx  # Password reset functionality
│   ├── ChangePassword.tsx  # Password change modal
│   ├── ProtectedRoute.tsx  # Role-based route protection
│   ├── firebase.ts         # Firebase configuration
│   ├── firebaseAuth.ts     # Firebase Auth API wrapper
│   └── types.ts           # Auth-related TypeScript types
├── admin/          # Admin dashboard and user management
├── events/         # Event listing and details
├── gallery/        # Photo gallery with modal view
├── maps/          # Interactive venue mapping
├── components/    # Shared UI components (Header, MobileNav, Profile)
└── styles/        # Mobile-first CSS
```

### Data Flow
- **Production-ready**: All authentication flows use Firebase
- **User profiles**: Stored in Firestore with role-based permissions
- **Session management**: Firebase Auth handles token refresh automatically
- **Error handling**: Comprehensive error states for auth operations

### Mobile-First Design
- Primary navigation via bottom mobile nav (`MobileNav.tsx`)
- Desktop header navigation as secondary
- Responsive breakpoints in `global.css`
- Touch-optimized interfaces throughout

## Firebase Configuration

### Environment Variables Required
```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

### Firebase Services Configured
- **Auth**: User authentication, password reset, re-authentication
- **Firestore**: Database for user profiles, events, photos
- **Storage**: File uploads for photos and media (configured, not yet implemented)

### Firestore Collections Structure
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

## Implementation Status

### ✅ Completed Authentication Module (Steps 1-3)
- **Firebase Integration**: Complete authentication system
- **User Management**: Registration, login, password reset/change
- **Role-based Access**: Attendee, organizer, admin roles with permissions
- **Profile Management**: User profile editing and avatar support
- **Protected Routes**: Route-level authorization
- **Session Persistence**: Firebase handles auth state automatically
- **Mobile-optimized**: Responsive forms and navigation

### 🚧 Next Implementation Phase (Step 4+)
- **Event Management**: CRUD operations for organizers
- **Activity Registration**: User enrollment in events
- **Admin Dashboard**: User management and system administration
- **File Uploads**: Photo and media management with Firebase Storage
- **Real-time Features**: Event updates and notifications

## Development Notes

### Firebase Integration
- **Production Ready**: No mock data - all operations use Firebase
- **Error Handling**: Firebase-specific error messages and states
- **Type Safety**: Full TypeScript support for Firebase operations
- **Security**: Firestore security rules should be configured for user data

### Code Patterns
- TypeScript throughout with strict mode enabled
- React functional components with hooks
- Context API for global auth state
- Firebase Auth state listener for automatic session management
- Error boundaries and loading states implemented

### Authentication Features
- **Email/Password**: Standard email authentication
- **Password Reset**: Firebase-powered password recovery
- **Password Change**: Secure re-authentication before password update
- **Auto-login**: Session persistence across browser sessions
- **Role Management**: Server-side role validation in Firestore

### Testing Setup
- Jest and React Testing Library configured
- Run tests with `npm test`
- Coverage reporting available
- Firebase Auth can be mocked for testing

## Security Considerations

### Firebase Security Rules
Ensure Firestore security rules are configured to:
- Restrict user profile access to authenticated users
- Allow users to only modify their own profiles
- Restrict role changes to admin users only

### Environment Variables
- Never commit Firebase config to version control
- Use environment-specific configurations
- Validate all environment variables are present before app initialization