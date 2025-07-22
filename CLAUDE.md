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
The app uses a **dual authentication approach**:
- **Mock Auth** (`src/auth/mockAuth.ts`) for development with pre-configured demo users
- **Firebase Auth** (`src/auth/firebaseAuth.ts`) for production
- Authentication is managed via React Context in `src/auth/AuthProvider.tsx`
- Demo accounts: admin@eventos.com, organizer@eventos.com, attendee@eventos.com (all use password123)

### Key Components Structure
```
src/
├── auth/           # Complete authentication system
├── events/         # Event listing and details
├── gallery/        # Photo gallery with modal view
├── maps/          # Interactive venue mapping
├── components/    # Shared UI components (Header, MobileNav, Profile)
└── styles/        # Mobile-first CSS
```

### Data Flow
- Uses mock data throughout for demonstration purposes
- Firebase configuration ready but using environment variables
- Role-based access control: attendee, organizer, admin
- Protected routes via `ProtectedRoute.tsx` component

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
- **Auth**: User authentication and role management
- **Firestore**: Database for events, users, photos
- **Storage**: File uploads for photos and media

## Implementation Status

### Completed (Steps 1-3)
- ✅ Project setup with React 18 + TypeScript
- ✅ Mobile-first responsive design
- ✅ Public event browsing (events, gallery, maps)
- ✅ Complete authentication system with role-based access
- ✅ User profile management

### Next Implementation Phase (Step 4+)
- Event creation/management for organizers
- Activity registration system  
- Admin map editing functionality
- Photo upload and moderation
- Notifications and admin dashboard

## Development Notes

### Mock vs Production Data
- App currently uses mock data for all features
- `useMockAuth()` function in `src/auth/mockAuth.ts` determines auth method
- Transition to Firebase involves setting environment variables and updating data fetching

### Code Patterns
- TypeScript throughout with strict mode enabled
- React functional components with hooks
- Context API for global state (auth)
- CSS modules approach in `global.css`
- Error boundaries and loading states implemented

### Testing Setup
- Jest and React Testing Library configured
- Run tests with `npm test`
- Coverage reporting available