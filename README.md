# Eventos App

A modern, mobile-first event management and attendee engagement platform built with React, TypeScript, and Supabase.

## Features Implemented

### ✅ Step 1: Project Structure and Tooling
- React 18 with TypeScript
- Mobile-first responsive design
- React Router for navigation
- Netlify deployment configuration
- Supabase integration setup

### ✅ Step 2: Public Event Info Access
- **Event List**: Browse all available events
- **Event Details**: Comprehensive event information including:
  - Event description and details
  - Schedule/agenda with speakers
  - Featured speakers with bios
  - Location and capacity information
- **Photo Gallery**: View event photos with filtering
- **Interactive Map**: Clickable venue map with space details

### ✅ Step 3: Authentication and User Roles
- **User Registration/Login**: Complete auth system with role-based access
- **User Roles**: Attendee, Organizer, Admin with different permissions
- **Protected Routes**: Route protection based on authentication and roles
- **User Profile**: Profile management with editable information
- **Mock Authentication**: Development-friendly mock auth system
- **Responsive Forms**: Mobile-optimized login/register forms

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Header.tsx          # Top navigation bar
│       └── MobileNav.tsx       # Bottom mobile navigation
├── events/
│   ├── EventList.tsx           # List of all events
│   └── EventDetails.tsx        # Individual event page
├── gallery/
│   └── PhotoGallery.tsx        # Photo gallery with filtering
├── maps/
│   └── MapView.tsx             # Interactive venue map
├── styles/
│   └── global.css              # Mobile-first CSS styles
├── App.tsx                     # Main app component with routing
└── index.tsx                   # App entry point
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your Supabase credentials (when ready).

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Current Status

The app currently includes a complete authentication system with mock data for demonstration purposes. All public and authentication features are functional:

- ✅ Responsive design (mobile-first)
- ✅ Event listing and details
- ✅ Photo gallery with modal view
- ✅ Interactive venue map with clickable areas
- ✅ Speaker information and schedules
- ✅ Navigation between pages
- ✅ User registration and login
- ✅ Role-based access control (Attendee, Organizer, Admin)
- ✅ Protected routes and user profiles
- ✅ Mock authentication for development

## Demo Accounts

For testing the authentication features, you can use these demo accounts:

- **Admin**: admin@eventos.com / password123
- **Organizer**: organizer@eventos.com / password123  
- **Attendee**: attendee@eventos.com / password123

## Next Steps

1. **Step 4**: Event creation and management for organizers
2. **Step 4**: Event creation and management for organizers
3. **Step 5**: Activity registration system
4. **Step 6**: Admin map editing functionality
5. **Step 7**: Photo upload and moderation
6. **Step 8**: Notifications and feedback system
7. **Step 9**: Admin dashboard
8. **Step 10**: Accessibility improvements
9. **Steps 11-13**: Testing and deployment

## Technology Stack

- **Frontend**: React 18, TypeScript, React Router
- **Styling**: CSS3 with mobile-first approach
- **Backend**: Netlify Functions (planned)
- **Database**: Supabase (planned)
- **Deployment**: Netlify
- **Testing**: Jest, React Testing Library (planned)

## Design Principles

- **Mobile-first**: Optimized for mobile devices with progressive enhancement
- **Accessibility**: WCAG-compliant design patterns
- **Performance**: Optimized loading and responsive images
- **User Experience**: Intuitive navigation and clear information hierarchy
