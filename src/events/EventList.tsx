import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types/event';

// Mock data siguiendo la nueva estructura de Event
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring the latest innovations and industry leaders.',
    organizerId: 'org1',
    organizerName: 'Tech Events Inc.',
    startDate: '2025-03-15T09:00:00Z',
    endDate: '2025-03-15T18:00:00Z',
    timezone: 'UTC',
    venue: {
      name: 'Convention Center',
      address: '123 Tech Street',
      city: 'Innovation City',
      country: 'Tech Country'
    },
    settings: {
      isPublic: true,
      requiresRegistration: false,
      allowPhotoUpload: true,
      enableComments: true
    },
    mapId: 'map1',
    status: 'published',
    createdAt: '2025-01-15T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
    stats: {
      totalAttendees: 250,
      totalActivities: 12,
      totalPhotos: 45
    }
  },
  {
    id: '2',
    title: 'Design Workshop',
    description: 'Interactive workshop on modern design principles and user experience.',
    organizerId: 'org2',
    organizerName: 'Design Collective',
    startDate: '2025-03-20T10:00:00Z',
    endDate: '2025-03-20T16:00:00Z',
    timezone: 'UTC',
    venue: {
      name: 'Creative Studio',
      address: '456 Design Avenue',
      city: 'Art District',
      country: 'Creative Country'
    },
    settings: {
      isPublic: true,
      requiresRegistration: true,
      maxAttendees: 50,
      allowPhotoUpload: true,
      enableComments: true
    },
    mapId: 'map1',
    status: 'published',
    createdAt: '2025-01-20T00:00:00Z',
    updatedAt: '2025-01-20T00:00:00Z',
    stats: {
      totalAttendees: 35,
      totalActivities: 6,
      totalPhotos: 18
    }
  },
  {
    id: '3',
    title: 'Startup Networking Night',
    description: 'Connect with entrepreneurs, investors, and startup enthusiasts.',
    organizerId: 'org3',
    organizerName: 'Startup Hub',
    startDate: '2025-03-25T18:00:00Z',
    endDate: '2025-03-25T22:00:00Z',
    timezone: 'UTC',
    venue: {
      name: 'Innovation Center',
      address: '789 Entrepreneur Blvd',
      city: 'Startup City',
      country: 'Business Country'
    },
    settings: {
      isPublic: true,
      requiresRegistration: true,
      maxAttendees: 100,
      allowPhotoUpload: true,
      enableComments: true
    },
    mapId: 'map1',
    status: 'published',
    createdAt: '2025-01-25T00:00:00Z',
    updatedAt: '2025-01-25T00:00:00Z',
    stats: {
      totalAttendees: 78,
      totalActivities: 4,
      totalPhotos: 32
    }
  }
];

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing'>('all');

  useEffect(() => {
    // Simular carga de datos
    const loadEvents = async () => {
      setLoading(true);
      // TODO: Implementar carga desde Firebase
      // const eventData = await fetchEvents();
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEvents(mockEvents);
      setLoading(false);
    };

    loadEvents();
  }, []);

  const getEventStatus = (event: Event) => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (now < startDate) return 'upcoming';
    if (now >= startDate && now <= endDate) return 'ongoing';
    return 'completed';
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true;
    return getEventStatus(event) === filter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#0d6efd';
      case 'ongoing': return '#28a745';
      case 'completed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return '📅';
      case 'ongoing': return '🔴';
      case 'completed': return '✅';
      default: return '📋';
    }
  };

  if (loading) {
    return (
      <div className="event-list">
        <div className="text-center" style={{ paddingTop: '40px' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
          <p style={{ marginTop: '16px' }}>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-list">
      {/* Header */}
      <div className="text-center mb-24">
        <h1>Discover Events</h1>
        <p className="card-text">Join amazing events and connect with your community</p>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs mb-24">
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e9ecef',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: filter === 'all' ? '#0d6efd' : '#6c757d',
              borderBottom: filter === 'all' ? '2px solid #0d6efd' : 'none',
              whiteSpace: 'nowrap',
              fontWeight: filter === 'all' ? '500' : 'normal',
              cursor: 'pointer'
            }}
          >
            📋 All Events ({events.length})
          </button>
          
          <button
            onClick={() => setFilter('upcoming')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: filter === 'upcoming' ? '#0d6efd' : '#6c757d',
              borderBottom: filter === 'upcoming' ? '2px solid #0d6efd' : 'none',
              whiteSpace: 'nowrap',
              fontWeight: filter === 'upcoming' ? '500' : 'normal',
              cursor: 'pointer'
            }}
          >
            📅 Upcoming ({events.filter(e => getEventStatus(e) === 'upcoming').length})
          </button>
          
          <button
            onClick={() => setFilter('ongoing')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: filter === 'ongoing' ? '#0d6efd' : '#6c757d',
              borderBottom: filter === 'ongoing' ? '2px solid #0d6efd' : 'none',
              whiteSpace: 'nowrap',
              fontWeight: filter === 'ongoing' ? '500' : 'normal',
              cursor: 'pointer'
            }}
          >
            🔴 Happening Now ({events.filter(e => getEventStatus(e) === 'ongoing').length})
          </button>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎪</div>
            <h3 style={{ marginBottom: '8px' }}>
              {filter === 'all' ? 'No Events Available' : `No ${filter.charAt(0).toUpperCase() + filter.slice(1)} Events`}
            </h3>
            <p className="card-text">
              {filter === 'all' 
                ? "There are no events at the moment. Check back later for updates!"
                : `There are no ${filter} events right now.`
              }
            </p>
            {filter !== 'all' && (
              <button 
                className="btn btn-outline mt-16"
                onClick={() => setFilter('all')}
              >
                View All Events
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="row">
          {filteredEvents.map((event) => {
            const eventStatus = getEventStatus(event);
            
            return (
              <div key={event.id} className="col-12 col-md-6 col-lg-4 mb-24">
                <div className="card" style={{ height: '100%', position: 'relative' }}>
                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: getStatusColor(eventStatus),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {getStatusIcon(eventStatus)}
                    {eventStatus.toUpperCase()}
                  </div>

                  {/* Event Image Placeholder */}
                  <div style={{
                    height: '150px',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px'
                  }}>
                    🎉
                  </div>

                  <div className="card-body" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: 'calc(100% - 150px)' 
                  }}>
                    <h3 className="card-title" style={{ 
                      marginBottom: '8px',
                      fontSize: '18px',
                      lineHeight: '1.3'
                    }}>
                      {event.title}
                    </h3>
                    
                    <p className="card-text" style={{ 
                      marginBottom: '12px',
                      color: '#6c757d',
                      fontSize: '14px',
                      lineHeight: '1.4',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {event.description}
                    </p>

                    {/* Event Details */}
                    <div style={{ fontSize: '13px', color: '#6c757d', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ marginRight: '6px' }}>📅</span>
                        <span>{formatDate(event.startDate)} at {formatTime(event.startDate)}</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ marginRight: '6px' }}>📍</span>
                        <span>{event.venue.name}, {event.venue.city}</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ marginRight: '6px' }}>👤</span>
                        <span>{event.organizerName}</span>
                      </div>
                    </div>

                    {/* Event Stats */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '16px',
                      fontSize: '12px',
                      color: '#6c757d'
                    }}>
                      <span>👥 {event.stats.totalAttendees}</span>
                      <span>🗓️ {event.stats.totalActivities}</span>
                      <span>📸 {event.stats.totalPhotos}</span>
                    </div>

                    {/* Registration Status */}
                    {event.settings.requiresRegistration && (
                      <div style={{
                        fontSize: '12px',
                        backgroundColor: '#fff3cd',
                        color: '#856404',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        marginBottom: '12px',
                        textAlign: 'center'
                      }}>
                        📝 Registration Required
                        {event.settings.maxAttendees && (
                          <span> • {event.settings.maxAttendees - event.stats.totalAttendees} spots left</span>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <div style={{ marginTop: 'auto' }}>
                      <Link 
                        to={`/events/${event.id}`} 
                        className="btn btn-primary btn-block"
                        style={{ fontSize: '14px' }}
                      >
                        {eventStatus === 'ongoing' ? '🔴 Join Live Event' : 'View Event'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Stats */}
      {events.length > 0 && (
        <div className="card mt-24">
          <div className="card-body">
            <h4 style={{ marginBottom: '16px', textAlign: 'center' }}>Event Overview</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
              gap: '16px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0d6efd' }}>
                  {events.length}
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  Total Events
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                  {events.reduce((sum, event) => sum + event.stats.totalAttendees, 0)}
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  Total Attendees
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                  {events.reduce((sum, event) => sum + event.stats.totalActivities, 0)}
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  Total Activities
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fd7e14' }}>
                  {events.reduce((sum, event) => sum + event.stats.totalPhotos, 0)}
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  Photos Shared
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;