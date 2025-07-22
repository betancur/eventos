import React from 'react';
import { useEvent } from '../EventContext';

const EventActivities: React.FC = () => {
  const { activities, currentEvent } = useEvent();

  if (!activities.length) {
    return (
      <div className="event-activities">
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗓️</div>
            <h3 style={{ marginBottom: '8px' }}>No Activities Yet</h3>
            <p className="card-text">
              The schedule for this event hasn't been published yet. Check back soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formatTime = (time: string) => {
    // Assuming time is in HH:MM format
    return time;
  };

  const groupActivitiesByDate = () => {
    const grouped = activities.reduce((acc, activity) => {
      const date = activity.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {} as Record<string, typeof activities>);

    // Sort activities within each date by start time
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => a.startTime.localeCompare(b.startTime));
    });

    return grouped;
  };

  const groupedActivities = groupActivitiesByDate();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'session': return '🎤';
      case 'workshop': return '🛠️';
      case 'break': return '☕';
      case 'networking': return '🤝';
      case 'meal': return '🍽️';
      default: return '📋';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'session': return '#e3f2fd';
      case 'workshop': return '#f3e5f5';
      case 'break': return '#fff3e0';
      case 'networking': return '#e8f5e8';
      case 'meal': return '#fff8e1';
      default: return '#f8f9fa';
    }
  };

  return (
    <div className="event-activities">
      {Object.entries(groupedActivities).map(([date, dateActivities]) => (
        <div key={date} className="day-schedule mb-24">
          {/* Date Header */}
          <div style={{ 
            marginBottom: '16px', 
            paddingBottom: '8px', 
            borderBottom: '2px solid #0d6efd' 
          }}>
            <h3 style={{ margin: '0', color: '#0d6efd' }}>
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
          </div>

          {/* Activities for this date */}
          <div className="activities-timeline">
            {dateActivities.map((activity, index) => (
              <div key={activity.id} className="activity-item" style={{
                display: 'flex',
                marginBottom: '16px',
                position: 'relative'
              }}>
                {/* Timeline */}
                <div style={{
                  width: '80px',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: '16px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#0d6efd',
                    marginBottom: '4px'
                  }}>
                    {formatTime(activity.startTime)}
                  </div>
                  {activity.endTime && (
                    <div style={{
                      fontSize: '10px',
                      color: '#6c757d'
                    }}>
                      {formatTime(activity.endTime)}
                    </div>
                  )}
                  
                  {/* Timeline dot */}
                  <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#0d6efd',
                    borderRadius: '50%',
                    marginTop: '8px',
                    position: 'relative'
                  }}>
                    {index < dateActivities.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '2px',
                        height: '60px',
                        backgroundColor: '#e9ecef'
                      }} />
                    )}
                  </div>
                </div>

                {/* Activity Content */}
                <div className="card" style={{ 
                  flex: 1,
                  backgroundColor: getActivityColor(activity.type),
                  border: 'none'
                }}>
                  <div className="card-body" style={{ padding: '16px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '18px', marginRight: '8px' }}>
                          {getActivityIcon(activity.type)}
                        </span>
                        <h4 style={{ margin: '0' }}>{activity.title}</h4>
                      </div>
                      
                      <span style={{
                        fontSize: '11px',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        color: '#6c757d',
                        textTransform: 'capitalize'
                      }}>
                        {activity.type}
                      </span>
                    </div>

                    {activity.description && (
                      <p style={{ 
                        margin: '0 0 12px 0', 
                        fontSize: '14px',
                        color: '#6c757d',
                        lineHeight: '1.4'
                      }}>
                        {activity.description}
                      </p>
                    )}

                    {/* Location & Speaker */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '13px' }}>
                      {activity.location.spaceName && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '4px' }}>📍</span>
                          <span>{activity.location.spaceName}</span>
                          {activity.location.capacity && (
                            <span style={{ color: '#6c757d', marginLeft: '4px' }}>
                              (max {activity.location.capacity})
                            </span>
                          )}
                        </div>
                      )}

                      {activity.speaker && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '4px' }}>👤</span>
                          <span>
                            {activity.speaker.name}
                            {activity.speaker.company && (
                              <span style={{ color: '#6c757d' }}> - {activity.speaker.company}</span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Registration Required */}
                    {activity.requiresRegistration && (
                      <div style={{ 
                        marginTop: '12px',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(255, 193, 7, 0.2)',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ fontSize: '12px' }}>
                          <span style={{ marginRight: '4px' }}>📝</span>
                          Registration required
                          {activity.maxAttendees && (
                            <span style={{ color: '#6c757d', marginLeft: '4px' }}>
                              (Limited to {activity.maxAttendees} attendees)
                            </span>
                          )}
                        </div>
                        <button 
                          className="btn btn-primary"
                          style={{ 
                            fontSize: '11px',
                            padding: '4px 12px',
                            height: 'auto'
                          }}
                        >
                          Register
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Event Stats */}
      <div className="card mt-24">
        <div className="card-body text-center">
          <h4 style={{ marginBottom: '16px' }}>Schedule Overview</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
            gap: '16px' 
          }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0d6efd' }}>
                {activities.length}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>
                Total Activities
              </div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                {activities.filter(a => a.requiresRegistration).length}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>
                Need Registration
              </div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                {new Set(activities.map(a => a.location.spaceName)).size}
              </div>
              <div style={{ fontSize: '12px', color: '#6c757d' }}>
                Unique Locations
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventActivities;