import React from 'react';
import { useEvent } from '../EventContext';

const EventInfo: React.FC = () => {
  const { currentEvent } = useEvent();

  if (!currentEvent) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="event-info">
      {/* Main Description */}
      <div className="card mb-24">
        <div className="card-header">
          <h3>About This Event</h3>
        </div>
        <div className="card-body">
          <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
            {currentEvent.description}
          </p>
        </div>
      </div>

      {/* Event Details */}
      <div className="card mb-24">
        <div className="card-header">
          <h3>Event Details</h3>
        </div>
        <div className="card-body">
          <div className="event-details-grid" style={{ display: 'grid', gap: '16px' }}>
            {/* Date & Time */}
            <div className="detail-item">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', marginRight: '12px' }}>📅</span>
                <strong>Date & Time</strong>
              </div>
              <div style={{ marginLeft: '32px', color: '#6c757d' }}>
                <div>{formatDate(currentEvent.startDate)}</div>
                <div>
                  {formatTime(currentEvent.startDate)} - {formatTime(currentEvent.endDate)}
                </div>
                <div style={{ fontSize: '14px' }}>({currentEvent.timezone})</div>
              </div>
            </div>

            {/* Location */}
            <div className="detail-item">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', marginRight: '12px' }}>📍</span>
                <strong>Location</strong>
              </div>
              <div style={{ marginLeft: '32px', color: '#6c757d' }}>
                <div>{currentEvent.venue.name}</div>
                <div>{currentEvent.venue.address}</div>
                <div>{currentEvent.venue.city}, {currentEvent.venue.country}</div>
              </div>
            </div>

            {/* Organizer */}
            <div className="detail-item">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', marginRight: '12px' }}>👤</span>
                <strong>Organizer</strong>
              </div>
              <div style={{ marginLeft: '32px', color: '#6c757d' }}>
                {currentEvent.organizerName}
              </div>
            </div>

            {/* Attendees */}
            <div className="detail-item">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '20px', marginRight: '12px' }}>👥</span>
                <strong>Attendees</strong>
              </div>
              <div style={{ marginLeft: '32px', color: '#6c757d' }}>
                {currentEvent.stats.totalAttendees} people attending
                {currentEvent.settings.maxAttendees && (
                  <span> (of {currentEvent.settings.maxAttendees} max)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Settings & Features */}
      <div className="card mb-24">
        <div className="card-header">
          <h3>Event Features</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '8px', 
              backgroundColor: currentEvent.settings.isPublic ? '#e8f5e8' : '#fff3cd',
              borderRadius: '6px'
            }}>
              <span style={{ marginRight: '8px' }}>
                {currentEvent.settings.isPublic ? '🌍' : '🔒'}
              </span>
              <span style={{ fontSize: '14px' }}>
                {currentEvent.settings.isPublic ? 'Public Event' : 'Private Event'}
              </span>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '8px', 
              backgroundColor: currentEvent.settings.requiresRegistration ? '#fff3cd' : '#e8f5e8',
              borderRadius: '6px'
            }}>
              <span style={{ marginRight: '8px' }}>
                {currentEvent.settings.requiresRegistration ? '📝' : '🎫'}
              </span>
              <span style={{ fontSize: '14px' }}>
                {currentEvent.settings.requiresRegistration ? 'Registration Required' : 'Free Entry'}
              </span>
            </div>

            {currentEvent.settings.allowPhotoUpload && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '8px', 
                backgroundColor: '#e3f2fd',
                borderRadius: '6px'
              }}>
                <span style={{ marginRight: '8px' }}>📸</span>
                <span style={{ fontSize: '14px' }}>Photo Sharing</span>
              </div>
            )}

            {currentEvent.settings.enableComments && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '8px', 
                backgroundColor: '#f3e5f5',
                borderRadius: '6px'
              }}>
                <span style={{ marginRight: '8px' }}>💬</span>
                <span style={{ fontSize: '14px' }}>Comments Enabled</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration/Action Button */}
      {currentEvent.settings.requiresRegistration && (
        <div className="card">
          <div className="card-body text-center">
            <button className="btn btn-primary btn-block" style={{ padding: '12px' }}>
              Register for Event
            </button>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#6c757d' }}>
              Registration is required to attend this event
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInfo;