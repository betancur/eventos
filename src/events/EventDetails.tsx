import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { EventProvider, useEvent } from './EventContext';

// Sub-components for different sections
import EventInfo from './components/EventInfo';
import EventActivities from './components/EventActivities';
import EventGallery from './components/EventGallery';
import EventMap from './components/EventMap';

const EventDetailsContent: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const location = useLocation();
  const { currentEvent, loadEvent, loadActivities, loading, error } = useEvent();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    if (eventId) {
      loadEvent(eventId);
      loadActivities(eventId);
    }
  }, [eventId]);

  // Determine active tab from URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/gallery')) {
      setActiveTab('gallery');
    } else if (path.includes('/map')) {
      setActiveTab('map');
    } else if (path.includes('/activities')) {
      setActiveTab('activities');
    } else {
      setActiveTab('info');
    }
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="container text-center" style={{ paddingTop: '40px' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', margin: '0 auto' }}></div>
        <p style={{ marginTop: '16px' }}>Loading event...</p>
      </div>
    );
  }

  if (error || !currentEvent) {
    return (
      <div className="container text-center" style={{ paddingTop: '40px' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card-body">
            <h1 style={{ color: '#dc3545', marginBottom: '16px' }}>Event Not Found</h1>
            <p className="card-text">
              {error || 'The event you\'re looking for could not be found.'}
            </p>
            <Link to="/events" className="btn btn-primary mt-16">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details">
      {/* Event Header */}
      <div className="event-header" style={{ 
        marginBottom: '24px', 
        paddingBottom: '16px', 
        borderBottom: '1px solid #e9ecef' 
      }}>
        <div style={{ marginBottom: '8px' }}>
          <Link 
            to="/events" 
            style={{ 
              color: '#0d6efd', 
              textDecoration: 'none', 
              fontSize: '14px' 
            }}
          >
            ← Back to Events
          </Link>
        </div>
        
        <h1 style={{ marginBottom: '8px', lineHeight: '1.2' }}>
          {currentEvent.title}
        </h1>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '16px', 
          color: '#6c757d', 
          fontSize: '14px' 
        }}>
          <span>📅 {new Date(currentEvent.startDate).toLocaleDateString()}</span>
          <span>📍 {currentEvent.venue.name}</span>
          <span>👥 {currentEvent.stats.totalAttendees} attendees</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="event-tabs" style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e9ecef',
          overflowX: 'auto'
        }}>
          <Link
            to={`/events/${eventId}`}
            className={`tab-link ${activeTab === 'info' ? 'active' : ''}`}
            style={{
              padding: '12px 16px',
              textDecoration: 'none',
              color: activeTab === 'info' ? '#0d6efd' : '#6c757d',
              borderBottom: activeTab === 'info' ? '2px solid #0d6efd' : 'none',
              whiteSpace: 'nowrap',
              fontWeight: activeTab === 'info' ? '500' : 'normal'
            }}
          >
            ℹ️ Info
          </Link>
          
          <Link
            to={`/events/${eventId}/activities`}
            className={`tab-link ${activeTab === 'activities' ? 'active' : ''}`}
            style={{
              padding: '12px 16px',
              textDecoration: 'none',
              color: activeTab === 'activities' ? '#0d6efd' : '#6c757d',
              borderBottom: activeTab === 'activities' ? '2px solid #0d6efd' : 'none',
              whiteSpace: 'nowrap',
              fontWeight: activeTab === 'activities' ? '500' : 'normal'
            }}
          >
            🗓️ Schedule ({currentEvent.stats.totalActivities})
          </Link>
          
          {currentEvent.settings.allowPhotoUpload && (
            <Link
              to={`/events/${eventId}/gallery`}
              className={`tab-link ${activeTab === 'gallery' ? 'active' : ''}`}
              style={{
                padding: '12px 16px',
                textDecoration: 'none',
                color: activeTab === 'gallery' ? '#0d6efd' : '#6c757d',
                borderBottom: activeTab === 'gallery' ? '2px solid #0d6efd' : 'none',
                whiteSpace: 'nowrap',
                fontWeight: activeTab === 'gallery' ? '500' : 'normal'
              }}
            >
              🖼️ Photos ({currentEvent.stats.totalPhotos})
            </Link>
          )}
          
          {currentEvent.mapId && (
            <Link
              to={`/events/${eventId}/map`}
              className={`tab-link ${activeTab === 'map' ? 'active' : ''}`}
              style={{
                padding: '12px 16px',
                textDecoration: 'none',
                color: activeTab === 'map' ? '#0d6efd' : '#6c757d',
                borderBottom: activeTab === 'map' ? '2px solid #0d6efd' : 'none',
                whiteSpace: 'nowrap',
                fontWeight: activeTab === 'map' ? '500' : 'normal'
              }}
            >
              🗺️ Venue Map
            </Link>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="event-content">
        {activeTab === 'info' && <EventInfo />}
        {activeTab === 'activities' && <EventActivities />}
        {activeTab === 'gallery' && <EventGallery />}
        {activeTab === 'map' && <EventMap />}
      </div>
    </div>
  );
};

const EventDetails: React.FC = () => {
  return (
    <EventProvider>
      <EventDetailsContent />
    </EventProvider>
  );
};

export default EventDetails;