import React, { useState } from 'react';

// Mock map data - will be replaced with Supabase data
const mockMapData = {
  eventId: 1,
  eventName: 'Tech Conference 2025',
  mapImageUrl: 'https://via.placeholder.com/800x600?text=Event+Map',
  spaces: [
    {
      id: 1,
      name: 'Main Auditorium',
      description: 'Main stage for keynote presentations and major sessions',
      capacity: 300,
      features: ['Stage', 'Audio/Video', 'Air Conditioning'],
      photoUrl: 'https://via.placeholder.com/400x300?text=Main+Auditorium',
      heatZone: {
        x: 200,
        y: 150,
        width: 200,
        height: 100
      }
    },
    {
      id: 2,
      name: 'Workshop Room A',
      description: 'Interactive workshop space with breakout areas',
      capacity: 50,
      features: ['Whiteboards', 'Projector', 'Moveable Furniture'],
      photoUrl: 'https://via.placeholder.com/400x300?text=Workshop+Room+A',
      heatZone: {
        x: 450,
        y: 100,
        width: 120,
        height: 80
      }
    },
    {
      id: 3,
      name: 'Workshop Room B',
      description: 'Hands-on coding and technical sessions',
      capacity: 40,
      features: ['Computers', 'High-speed Internet', 'Power Outlets'],
      photoUrl: 'https://via.placeholder.com/400x300?text=Workshop+Room+B',
      heatZone: {
        x: 450,
        y: 200,
        width: 120,
        height: 80
      }
    },
    {
      id: 4,
      name: 'Networking Lounge',
      description: 'Casual space for networking and refreshments',
      capacity: 100,
      features: ['Comfortable Seating', 'Coffee Station', 'WiFi'],
      photoUrl: 'https://via.placeholder.com/400x300?text=Networking+Lounge',
      heatZone: {
        x: 100,
        y: 350,
        width: 300,
        height: 120
      }
    },
    {
      id: 5,
      name: 'Exhibition Hall',
      description: 'Sponsor booths and product demonstrations',
      capacity: 200,
      features: ['Display Areas', 'Power Access', 'Storage'],
      photoUrl: 'https://via.placeholder.com/400x300?text=Exhibition+Hall',
      heatZone: {
        x: 500,
        y: 350,
        width: 250,
        height: 150
      }
    }
  ]
};

interface MapViewProps {
  eventId?: number;
}

const MapView: React.FC<MapViewProps> = ({ eventId }) => {
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null);
  const [showSpaceModal, setShowSpaceModal] = useState(false);

  // In a real app, this would fetch data based on eventId
  const mapData = mockMapData;

  const handleSpaceClick = (spaceId: number) => {
    setSelectedSpace(spaceId);
    setShowSpaceModal(true);
  };

  const closeModal = () => {
    setShowSpaceModal(false);
    setSelectedSpace(null);
  };

  const selectedSpaceData = selectedSpace 
    ? mapData.spaces.find(space => space.id === selectedSpace)
    : null;

  return (
    <div className="map-view">
      {/* Header */}
      <div className="text-center mb-24">
        <h1>Event Map</h1>
        <p className="card-text">
          Interactive map of {mapData.eventName}. Click on highlighted areas to see space details.
        </p>
      </div>

      {/* Map Container */}
      <div className="card mb-24">
        <div className="card-body">
          <div 
            style={{ 
              position: 'relative', 
              display: 'inline-block',
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {/* Map Image */}
            <img 
              src={mapData.mapImageUrl}
              alt="Event Map"
              style={{ 
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
            
            {/* Heat Zones (clickable areas) */}
            {mapData.spaces.map((space) => (
              <div
                key={space.id}
                style={{
                  position: 'absolute',
                  left: `${(space.heatZone.x / 800) * 100}%`,
                  top: `${(space.heatZone.y / 600) * 100}%`,
                  width: `${(space.heatZone.width / 800) * 100}%`,
                  height: `${(space.heatZone.height / 600) * 100}%`,
                  backgroundColor: 'rgba(13, 110, 253, 0.3)',
                  border: '2px solid #0d6efd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0d6efd',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
                onClick={() => handleSpaceClick(space.id)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(13, 110, 253, 0.5)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(13, 110, 253, 0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                title={space.name}
              >
                <span style={{ 
                  background: 'rgba(255,255,255,0.9)', 
                  padding: '2px 4px', 
                  borderRadius: '2px',
                  fontSize: '10px'
                }}>
                  {space.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Space List */}
      <div className="card mb-24">
        <div className="card-header">
          <h2>Available Spaces</h2>
        </div>
        <div className="card-body">
          <div className="row">
            {mapData.spaces.map((space) => (
              <div key={space.id} className="col-12 col-md-6 col-lg-4 mb-16">
                <div 
                  className="card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSpaceClick(space.id)}
                >
                  <img 
                    src={space.photoUrl}
                    alt={space.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h4 className="card-title" style={{ fontSize: '16px' }}>
                      {space.name}
                    </h4>
                    <p className="card-text" style={{ fontSize: '14px', marginBottom: '8px' }}>
                      {space.description}
                    </p>
                    <p className="card-text" style={{ fontSize: '12px', color: '#6c757d' }}>
                      Capacity: {space.capacity} people
                    </p>
                    <div style={{ fontSize: '12px' }}>
                      <strong>Features:</strong> {space.features.slice(0, 2).join(', ')}
                      {space.features.length > 2 && '...'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="card">
        <div className="card-header">
          <h3>Map Legend</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-md-6">
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(13, 110, 253, 0.3)',
                  border: '2px solid #0d6efd',
                  borderRadius: '2px',
                  marginRight: '8px'
                }}></div>
                <span>Clickable Space</span>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <p style={{ fontSize: '14px', margin: '0' }}>
                💡 <strong>Tip:</strong> Click on highlighted areas or space cards to view detailed information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Space Detail Modal */}
      {showSpaceModal && selectedSpaceData && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '16px',
              borderBottom: '1px solid #e9ecef'
            }}>
              <h2 style={{ margin: 0 }}>{selectedSpaceData.name}</h2>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: '0',
                  width: '30px',
                  height: '30px'
                }}
                onClick={closeModal}
              >
                ×
              </button>
            </div>
            
            {/* Space photo */}
            <img 
              src={selectedSpaceData.photoUrl}
              alt={selectedSpaceData.name}
              style={{ 
                width: '100%',
                height: '250px',
                objectFit: 'cover'
              }}
            />
            
            {/* Space details */}
            <div style={{ padding: '16px' }}>
              <p style={{ marginBottom: '16px' }}>
                {selectedSpaceData.description}
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                <strong>Capacity:</strong> {selectedSpaceData.capacity} people
              </div>
              
              <div>
                <strong>Available Features:</strong>
                <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                  {selectedSpaceData.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <button className="btn btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
