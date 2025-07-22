import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, Activity, EventPhoto, EventMap } from '../types/event';

interface EventContextType {
  // Estado del evento actual
  currentEvent: Event | null;
  activities: Activity[];
  photos: EventPhoto[];
  eventMap: EventMap | null;
  
  // Estados de carga
  loading: boolean;
  error: string | null;
  
  // Funciones para cargar datos
  loadEvent: (eventId: string) => Promise<void>;
  loadActivities: (eventId: string) => Promise<void>;
  loadPhotos: (eventId: string) => Promise<void>;
  loadEventMap: (mapId: string) => Promise<void>;
  
  // Funciones de utilidad
  getActivityById: (activityId: string) => Activity | undefined;
  getPhotosByActivity: (activityId: string) => EventPhoto[];
  clearEventData: () => void;
}

const EventContext = createContext<EventContextType | null>(null);

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};

interface EventProviderProps {
  children: React.ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [eventMap, setEventMap] = useState<EventMap | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvent = async (eventId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Implementar carga desde Firebase
      // const event = await fetchEvent(eventId);
      // setCurrentEvent(event);
      
      // Por ahora, mock data
      const mockEvent: Event = {
        id: eventId,
        title: `Event ${eventId}`,
        description: 'Mock event description',
        organizerId: 'organizer1',
        organizerName: 'John Organizer',
        startDate: '2024-03-15T09:00:00Z',
        endDate: '2024-03-15T18:00:00Z',
        timezone: 'UTC',
        venue: {
          name: 'Convention Center',
          address: '123 Event St',
          city: 'Event City',
          country: 'Event Country'
        },
        settings: {
          isPublic: true,
          requiresRegistration: false,
          allowPhotoUpload: true,
          enableComments: true
        },
        mapId: 'map1',
        status: 'published',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        stats: {
          totalAttendees: 150,
          totalActivities: 8,
          totalPhotos: 45
        }
      };
      
      setCurrentEvent(mockEvent);
    } catch (err: any) {
      setError(err.message || 'Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const loadActivities = async (eventId: string) => {
    try {
      // TODO: Implementar carga desde Firebase
      // const eventActivities = await fetchActivities(eventId);
      // setActivities(eventActivities);
      
      // Por ahora, mock data
      const mockActivities: Activity[] = [
        {
          id: 'activity1',
          eventId,
          title: 'Opening Keynote',
          description: 'Welcome and opening remarks',
          type: 'session',
          startTime: '09:00',
          endTime: '10:00',
          date: '2024-03-15',
          location: {
            spaceName: 'Main Auditorium',
            capacity: 500
          },
          speaker: {
            name: 'Jane Speaker',
            bio: 'Industry expert',
            company: 'Tech Corp'
          },
          requiresRegistration: false,
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: '2024-01-15T00:00:00Z'
        }
      ];
      
      setActivities(mockActivities);
    } catch (err: any) {
      console.error('Failed to load activities:', err);
    }
  };

  const loadPhotos = async (eventId: string) => {
    try {
      // TODO: Implementar carga desde Firebase
      // const eventPhotos = await fetchPhotos(eventId);
      // setPhotos(eventPhotos);
      
      // Por ahora, array vacío
      setPhotos([]);
    } catch (err: any) {
      console.error('Failed to load photos:', err);
    }
  };

  const loadEventMap = async (mapId: string) => {
    try {
      // TODO: Implementar carga desde Firebase
      // const map = await fetchEventMap(mapId);
      // setEventMap(map);
      
      console.log('Loading map:', mapId);
    } catch (err: any) {
      console.error('Failed to load event map:', err);
    }
  };

  const getActivityById = (activityId: string) => {
    return activities.find(activity => activity.id === activityId);
  };

  const getPhotosByActivity = (activityId: string) => {
    return photos.filter(photo => photo.activityId === activityId);
  };

  const clearEventData = () => {
    setCurrentEvent(null);
    setActivities([]);
    setPhotos([]);
    setEventMap(null);
    setError(null);
  };

  const value: EventContextType = {
    currentEvent,
    activities,
    photos,
    eventMap,
    loading,
    error,
    loadEvent,
    loadActivities,
    loadPhotos,
    loadEventMap,
    getActivityById,
    getPhotosByActivity,
    clearEventData
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};