import React, { useState, useEffect } from 'react';
import { useEvent } from '../EventContext';

const EventMap: React.FC = () => {
  const { eventMap, currentEvent, loadEventMap } = useEvent();
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);

  useEffect(() => {
    if (currentEvent?.mapId) {
      loadEventMap(currentEvent.mapId);
    }
  }, [currentEvent]);

  if (!currentEvent?.mapId) {
    return (
      <div className="event-map">
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
            <h3 style={{ marginBottom: '8px' }}>No Venue Map</h3>
            <p className="card-text">
              The venue map for this event is not available yet.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mock data while eventMap is loading
  const mockMap = {
    id: currentEvent.mapId,
    name: 'Convention Center Main Floor',
    venue: currentEvent.venue.name,
    imageUrl: '/images/venue-map.jpg', // This would be a real image URL
    spaces: [
      {
        id: 'space1',
        name: 'Main Auditorium',
        type: 'stage' as const,
        capacity: 500,
        description: 'Main presentation space with professional A/V setup',
        coordinates: {
          type: 'rectangle' as const,
          points: [
            { x: 20, y: 30 },
            { x: 60, y: 30 },
            { x: 60, y: 50 },
            { x: 20, y: 50 }
          ]
        },
        amenities: ['WiFi', 'Power outlets', 'AC', 'Professional lighting']
      },
      {
        id: 'space2',
        name: 'Registration Desk',
        type: 'registration' as const,
        description: 'Event check-in and information point',
        coordinates: {
          type: 'rectangle' as const,
          points: [
            { x: 10, y: 10 },
            { x: 30, y: 10 },
            { x: 30, y: 25 },
            { x: 10, y: 25 }
          ]
        },
        amenities: ['WiFi', 'Power outlets']
      },
      {
        id: 'space3',
        name: 'Networking Lounge',
        type: 'networking' as const,
        capacity: 100,
        description: 'Comfortable seating area for informal conversations',
        coordinates: {
          type: 'rectangle' as const,
          points: [
            { x: 65, y: 10 },
            { x: 90, y: 10 },
            { x: 90, y: 40 },
            { x: 65, y: 40 }
          ]
        },
        amenities: ['WiFi', 'Comfortable seating', 'Coffee station']
      }
    ],
    isTemplate: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    usedInEvents: [currentEvent.id]
  };

  const getSpaceColor = (type: string) => {
    switch (type) {
      case 'stage': return '#e3f2fd';
      case 'registration': return '#fff3e0';
      case 'exhibition': return '#f3e5f5';
      case 'catering': return '#e8f5e8';
      case 'networking': return '#fff8e1';
      default: return '#f8f9fa';
    }
  };

  const getSpaceIcon = (type: string) => {
    switch (type) {
      case 'stage': return '🎤';
      case 'registration': return '📝';
      case 'exhibition': return '🏪';
      case 'catering': return '🍽️';
      case 'networking': return '🤝';
      default: return '📍';
    }
  };

  return (
    <div className="event-map">
      {/* Map Header */}
      <div className="card mb-24">
        <div className="card-body">
          <h3 style={{ margin: '0 0 8px 0' }}>{mockMap.name}</h3>
          <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
            Interactive venue map - Click on areas to see details
          </p>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="card mb-24">
        <div className="card-body" style={{ padding: '0' }}>
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            paddingTop: '60%', // 5:3 aspect ratio
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {/* Mock venue layout */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'linear-gradient(45deg, #f8f9fa 25%, transparent 25%), linear-gradient(-45deg, #f8f9fa 25%, transparent 25%)',
              backgroundSize: '20px 20px'
            }}>
              {/* Render clickable spaces */}
              {mockMap.spaces.map((space) => (
                <div
                  key={space.id}
                  onClick={() => setSelectedSpace(space.id === selectedSpace ? null : space.id)}
                  style={{
                    position: 'absolute',
                    left: `${space.coordinates.points[0].x}%`,
                    top: `${space.coordinates.points[0].y}%`,
                    width: `${space.coordinates.points[1].x - space.coordinates.points[0].x}%`,
                    height: `${space.coordinates.points[2].y - space.coordinates.points[1].y}%`,
                    backgroundColor: selectedSpace === space.id ? '#0d6efd' : getSpaceColor(space.type),
                    border: `2px solid ${selectedSpace === space.id ? '#0a58ca' : '#dee2e6'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: selectedSpace === space.id ? 'white' : '#495057',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedSpace === space.id ? '0 4px 8px rgba(13, 110, 253, 0.3)' : 'none'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '16px', marginBottom: '2px' }}>
                      {getSpaceIcon(space.type)}
                    </div>
                    <div style={{ fontSize: '10px', lineHeight: '1.2' }}>
                      {space.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Space Details */}
      {selectedSpace && (
        <div className="card mb-24">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>
                {getSpaceIcon(mockMap.spaces.find(s => s.id === selectedSpace)?.type || '')}
              </span>
              <h4 style={{ margin: '0' }}>
                {mockMap.spaces.find(s => s.id === selectedSpace)?.name}
              </h4>
            </div>
          </div>
          <div className="card-body">
            {(() => {
              const space = mockMap.spaces.find(s => s.id === selectedSpace);
              if (!space) return null;
              
              return (
                <>
                  {space.description && (
                    <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>
                      {space.description}
                    </p>
                  )}
                  
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {space.capacity && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '16px', marginRight: '8px' }}>👥</span>
                        <span><strong>Capacity:</strong> {space.capacity} people</span>
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '16px', marginRight: '8px' }}>🏷️</span>
                      <span><strong>Type:</strong> {space.type.charAt(0).toUpperCase() + space.type.slice(1)}</span>
                    </div>
                    
                    {space.amenities && space.amenities.length > 0 && (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '16px', marginRight: '8px' }}>✨</span>
                          <span><strong>Amenities:</strong></span>
                        </div>
                        <div style={{ marginLeft: '24px' }}>
                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '8px' 
                          }}>
                            {space.amenities.map((amenity, index) => (
                              <span
                                key={index}
                                style={{
                                  fontSize: '12px',
                                  backgroundColor: '#e3f2fd',
                                  color: '#1976d2',
                                  padding: '4px 8px',
                                  borderRadius: '12px'
                                }}
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Space Legend */}
      <div className="card">
        <div className="card-header">
          <h4 style={{ margin: '0' }}>Venue Legend</h4>
        </div>
        <div className="card-body">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '12px' 
          }}>
            {Array.from(new Set(mockMap.spaces.map(s => s.type))).map((type) => (
              <div
                key={type}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  backgroundColor: getSpaceColor(type),
                  borderRadius: '6px',
                  border: '1px solid #dee2e6'
                }}
              >
                <span style={{ fontSize: '16px', marginRight: '8px' }}>
                  {getSpaceIcon(type)}
                </span>
                <span style={{ fontSize: '14px', textTransform: 'capitalize' }}>
                  {type}
                </span>
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '6px',
            fontSize: '12px',
            color: '#6c757d'
          }}>
            💡 <strong>Tip:</strong> Click on any colored area on the map above to see detailed information about that space.
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMap;