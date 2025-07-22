# Implementation Plan for Eventos App

- [x] Step 1: Set Up Project Structure and Tooling ✅
  - **Task**: Initialize React project (mobile-first), Netlify Functions, Firebase, GitHub, Google Analytics.
  - **Files**:
    - `src/index.tsx`: Mobile-first app shell ✅
    - `src/styles/global.css`: Mobile-first styles ✅
    - `src/App.tsx`: Main app with routing ✅
    - `src/components/Layout/Header.tsx`: Desktop navigation ✅
    - `src/components/Layout/MobileNav.tsx`: Mobile navigation ✅
    - `package.json`: Dependencies configured ✅
    - `netlify.toml`: Netlify configuration ✅
  - **Dependencies**: React, Firebase JS, Netlify CLI, Google Analytics ✅

- [x] Step 2: Public Event Info Access ✅
  - **Task**: Allow all users (logged in or not) to view event details, schedules, speakers, maps, and gallery.
  - **Files**:
    - `src/events/EventList.tsx`: Public event list ✅
    - `src/events/EventDetails.tsx`: Public event details ✅
    - `src/gallery/PhotoGallery.tsx`: Public gallery ✅
    - `src/maps/MapView.tsx`: Public map view ✅
  - **Dependencies**: Firebase Firestore (mock data implemented) ✅

- [x] Step 3: Authentication and User Roles ✅
  - **Task**: Implement Firebase authentication for registration-required activities and admin features.
  - **Files**:
    - `src/auth/AuthProvider.tsx`: Auth context and state management ✅
    - `src/auth/Login.tsx`: Login form component ✅
    - `src/auth/Register.tsx`: Registration form component ✅
    - `src/auth/types.ts`: User types and role definitions ✅
    - `src/auth/ProtectedRoute.tsx`: Route protection component ✅
    - `src/auth/firebase.ts`: Firebase configuration ✅
    - `src/auth/firebaseAuth.ts`: Firebase Auth API integration ✅
    - `src/auth/mockAuth.ts`: Mock auth for development ✅
    - `src/components/Profile.tsx`: User profile management ✅
  - **Dependencies**: Firebase Auth and Firestore (configured and working) ✅
  - **User Intervention**: Firebase project created and configured successfully ✅

- [ ] Step 4: Event Creation and Management (Organizer)
  - **Task**: Organizers create/manage events, schedules, speakers, and maps.
  - **Files**:
    - `src/events/EventForm.tsx`
    - `src/events/ScheduleForm.tsx`
    - `src/events/SpeakerForm.tsx`
    - `src/events/api.ts`
    - `netlify/functions/events.js`
  - **Dependencies**: Firebase Firestore, Netlify Functions

- [ ] Step 5: Activity Registration Logic
  - **Task**: Only require registration for activities marked as such; allow public viewing otherwise.
  - **Files**:
    - `src/activities/ActivityList.tsx`: List activities, show registration status
    - `src/activities/ActivityDetails.tsx`: Details, registration button if required
    - `src/activities/RegistrationForm.tsx`: Registration form (only for required)
    - `src/activities/api.ts`
    - `netlify/functions/activities.js`
  - **Dependencies**: Firebase Firestore, Netlify Functions

- [ ] Step 6: Map Functionality with Heat Zones and Space Association
  - **Task**: Admin uploads map image, defines heat zones, associates zones with event spaces, and each space can show a detailed photo.
  - **Files**:
    - `src/maps/MapUpload.tsx`: Admin uploads map image
    - `src/maps/HeatZoneEditor.tsx`: Admin defines heat zones (pseudocode: draw polygons/rects on image, save coordinates)
    - `src/maps/SpaceAssociation.tsx`: Admin associates zones with spaces, uploads space photos
    - `src/maps/MapView.tsx`: Public view, click zone to see space photo/details
    - `src/maps/api.ts`
    - `netlify/functions/maps.js`
  - **Dependencies**: Firebase Storage, Netlify Functions
  - **User Intervention**: Admin defines heat zones and uploads space photos.

- [ ] Step 7: Photo Gallery with Admin Moderation
  - **Task**: Attendees upload/view photos; admin can hide inappropriate content.
  - **Files**:
    - `src/gallery/PhotoUpload.tsx`
    - `src/gallery/PhotoGallery.tsx`
    - `src/gallery/ModerationPanel.tsx`
    - `src/gallery/api.ts`
    - `netlify/functions/gallery.js`
  - **Dependencies**: Firebase Storage, Netlify Functions

- [ ] Step 8: Notifications and Feedback
  - **Task**: In-app notifications, live polls, session ratings, post-event surveys.
  - **Files**:
    - `src/notifications/NotificationProvider.tsx`
    - `src/feedback/Poll.tsx`
    - `src/feedback/Rating.tsx`
    - `src/feedback/Survey.tsx`
    - `src/feedback/api.ts`
    - `netlify/functions/feedback.js`
  - **Dependencies**: Firebase Firestore, Netlify Functions

- [ ] Step 9: Admin Dashboard
  - **Task**: Dashboard for event management, user/photo moderation, analytics.
  - **Files**:
    - `src/admin/Dashboard.tsx`
    - `src/admin/Analytics.tsx`
    - `src/admin/Moderation.tsx`
  - **Dependencies**: Google Analytics, Firebase Firestore

- [ ] Step 10: Responsive Design and Accessibility
  - **Task**: Ensure mobile-first, responsive, and accessible UI.
  - **Files**:
    - `src/styles/global.css`
    - `src/components/AccessibleButton.tsx`
  - **Dependencies**: None

- [ ] Step 11: Build and Run the App
  - **Task**: Build React app, deploy to Netlify, verify hosting.
  - **Files**: N/A
  - **User Intervention**: Deploy via Netlify dashboard or CLI.

- [ ] Step 12: Write Unit and UI Tests
  - **Task**: Write tests for core features and UI components.
  - **Files**:
    - `src/__tests__/EventForm.test.tsx`
    - `src/__tests__/PhotoGallery.test.tsx`
    - `src/__tests__/MapView.test.tsx`
    - `src/__tests__/ActivityList.test.tsx`
  - **Dependencies**: Jest, React Testing Library

- [ ] Step 13: Run All Unit and UI Tests
  - **Task**: Execute all tests and ensure passing results.
  - **Files**: N/A
  - **User Intervention**: Review test results and address failures.
