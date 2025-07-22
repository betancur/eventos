export interface Event {
  id: string;
  title: string;
  description: string;
  organizerId: string; // ID del usuario organizador
  organizerName: string;
  
  // Fechas y tiempo
  startDate: string;
  endDate: string;
  timezone: string;
  
  // Ubicación
  venue: {
    name: string;
    address: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  
  // Configuración del evento
  settings: {
    isPublic: boolean;
    requiresRegistration: boolean;
    maxAttendees?: number;
    allowPhotoUpload: boolean;
    enableComments: boolean;
  };
  
  // Mapa del venue (específico para este evento)
  mapId?: string; // Referencia al mapa en la colección 'maps'
  
  // Metadatos
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  
  // Estadísticas
  stats: {
    totalAttendees: number;
    totalActivities: number;
    totalPhotos: number;
  };
}

export interface Activity {
  id: string;
  eventId: string; // Pertenece a un evento específico
  
  // Información básica
  title: string;
  description: string;
  type: 'session' | 'workshop' | 'break' | 'networking' | 'meal';
  
  // Programación
  startTime: string;
  endTime: string;
  date: string;
  
  // Ubicación dentro del evento
  location: {
    spaceId?: string; // Referencia a una zona del mapa
    spaceName: string; // Nombre legible del espacio
    capacity?: number;
  };
  
  // Ponente/Speaker (opcional)
  speaker?: {
    name: string;
    bio?: string;
    avatarUrl?: string;
    company?: string;
    role?: string;
  };
  
  // Configuración
  requiresRegistration: boolean;
  maxAttendees?: number;
  
  // Metadatos
  createdAt: string;
  updatedAt: string;
}

export interface EventMap {
  id: string;
  organizerId: string; // Quien creó el mapa (para reutilización)
  
  // Información del mapa
  name: string; // "Convention Center Main Floor"
  venue: string; // Nombre del venue
  imageUrl: string; // URL de la imagen del mapa
  
  // Zonas/espacios definidos en el mapa
  spaces: MapSpace[];
  
  // Metadatos
  isTemplate: boolean; // Si puede ser reutilizado por el organizador
  createdAt: string;
  updatedAt: string;
  
  // Eventos que usan este mapa
  usedInEvents: string[]; // Array de IDs de eventos
}

export interface MapSpace {
  id: string;
  name: string; // "Main Stage", "Registration Desk", "Coffee Area"
  type: 'stage' | 'registration' | 'exhibition' | 'catering' | 'networking' | 'other';
  
  // Coordenadas del área en el mapa (polígono o rectángulo)
  coordinates: {
    type: 'rectangle' | 'polygon';
    points: Array<{x: number; y: number}>; // Coordenadas relativas a la imagen
  };
  
  // Información adicional
  capacity?: number;
  description?: string;
  photoUrl?: string; // Foto del espacio
  amenities?: string[]; // ["WiFi", "Power outlets", "AC"]
}

export interface EventPhoto {
  id: string;
  eventId: string; // Pertenece a un evento específico
  
  // Información de la foto
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  
  // Autor
  uploadedBy: string; // ID del usuario
  uploaderName: string;
  
  // Contexto
  activityId?: string; // Si está asociada a una actividad específica
  spaceId?: string; // Si fue tomada en un espacio específico del mapa
  
  // Moderación
  status: 'pending' | 'approved' | 'rejected';
  moderatedBy?: string;
  moderationDate?: string;
  
  // Metadatos
  uploadedAt: string;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
}

export interface EventAttendee {
  id: string;
  eventId: string;
  userId: string;
  
  // Estado de la asistencia
  status: 'registered' | 'confirmed' | 'attended' | 'cancelled';
  registrationDate: string;
  confirmationDate?: string;
  
  // Actividades registradas
  registeredActivities: string[]; // IDs de actividades
  
  // Metadatos
  notes?: string; // Notas del organizador
}