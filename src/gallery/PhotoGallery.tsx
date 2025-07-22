import React, { useState } from 'react';

// Mock photo data - will be replaced with Supabase data
const mockPhotos = [
  {
    id: 1,
    url: 'https://via.placeholder.com/300x200?text=Event+Photo+1',
    title: 'Opening Ceremony',
    event: 'Tech Conference 2025',
    uploadedBy: 'John Doe',
    uploadedAt: '2025-07-20T10:00:00Z',
    isVisible: true
  },
  {
    id: 2,
    url: 'https://via.placeholder.com/300x200?text=Event+Photo+2',
    title: 'Keynote Speaker',
    event: 'Tech Conference 2025',
    uploadedBy: 'Jane Smith',
    uploadedAt: '2025-07-20T11:30:00Z',
    isVisible: true
  },
  {
    id: 3,
    url: 'https://via.placeholder.com/300x200?text=Event+Photo+3',
    title: 'Workshop Session',
    event: 'Design Workshop',
    uploadedBy: 'Mike Johnson',
    uploadedAt: '2025-07-20T14:15:00Z',
    isVisible: true
  },
  {
    id: 4,
    url: 'https://via.placeholder.com/300x200?text=Event+Photo+4',
    title: 'Networking Break',
    event: 'Tech Conference 2025',
    uploadedBy: 'Sarah Wilson',
    uploadedAt: '2025-07-20T15:45:00Z',
    isVisible: true
  },
  {
    id: 5,
    url: 'https://via.placeholder.com/300x200?text=Event+Photo+5',
    title: 'Panel Discussion',
    event: 'Tech Conference 2025',
    uploadedBy: 'Alex Brown',
    uploadedAt: '2025-07-20T16:20:00Z',
    isVisible: true
  },
  {
    id: 6,
    url: 'https://via.placeholder.com/300x200?text=Event+Photo+6',
    title: 'Closing Ceremony',
    event: 'Design Workshop',
    uploadedBy: 'Emily Davis',
    uploadedAt: '2025-07-20T17:00:00Z',
    isVisible: true
  }
];

interface PhotoGalleryProps {
  eventId?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ eventId }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Filter photos based on event or show all
  const filteredPhotos = mockPhotos.filter(photo => {
    if (eventId) {
      return photo.isVisible; // For specific event, show all visible photos
    }
    if (filter === 'all') {
      return photo.isVisible;
    }
    return photo.event === filter && photo.isVisible;
  });

  const uniqueEvents = Array.from(new Set(mockPhotos.map(photo => photo.event)));

  const openModal = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const selectedPhotoData = selectedPhoto 
    ? mockPhotos.find(photo => photo.id === selectedPhoto)
    : null;

  return (
    <div className="photo-gallery">
      {/* Header */}
      <div className="text-center mb-24">
        <h1>{eventId ? 'Event Photos' : 'Photo Gallery'}</h1>
        <p className="card-text">
          {eventId 
            ? 'Photos from this event shared by attendees'
            : 'Browse photos from all our events'
          }
        </p>
      </div>

      {/* Upload button (placeholder for future implementation) */}
      {!eventId && (
        <div className="text-center mb-24">
          <button className="btn btn-primary">
            📸 Upload Photo
          </button>
        </div>
      )}

      {/* Event filter (only show if not viewing specific event) */}
      {!eventId && (
        <div className="mb-24">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Filter by Event</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button 
                  className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setFilter('all')}
                >
                  All Events
                </button>
                {uniqueEvents.map(event => (
                  <button 
                    key={event}
                    className={`btn ${filter === event ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setFilter(event)}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <div className="row">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="col-12 col-md-6 col-lg-4">
            <div className="card mb-16">
              <div 
                style={{ 
                  position: 'relative', 
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onClick={() => openModal(photo.id)}
              >
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  🔍
                </div>
              </div>
              <div className="card-body">
                <h4 className="card-title" style={{ fontSize: '16px' }}>
                  {photo.title}
                </h4>
                <p className="card-text" style={{ fontSize: '14px', marginBottom: '4px' }}>
                  <strong>Event:</strong> {photo.event}
                </p>
                <p className="card-text" style={{ fontSize: '12px', color: '#6c757d' }}>
                  By {photo.uploadedBy} • {new Date(photo.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPhotos.length === 0 && (
        <div className="text-center">
          <p>No photos available for the selected filter.</p>
          <p className="card-text">Photos will appear here once they are uploaded!</p>
        </div>
      )}

      {/* Modal for enlarged photo view */}
      {selectedPhoto && selectedPhotoData && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
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
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer',
                zIndex: 1
              }}
              onClick={closeModal}
            >
              ×
            </button>
            
            {/* Photo */}
            <img 
              src={selectedPhotoData.url} 
              alt={selectedPhotoData.title}
              style={{ 
                width: '100%',
                height: 'auto',
                maxHeight: '70vh',
                objectFit: 'contain'
              }}
            />
            
            {/* Photo info */}
            <div style={{ padding: '16px' }}>
              <h3 style={{ marginBottom: '8px' }}>{selectedPhotoData.title}</h3>
              <p style={{ marginBottom: '4px', fontSize: '14px' }}>
                <strong>Event:</strong> {selectedPhotoData.event}
              </p>
              <p style={{ marginBottom: '0', fontSize: '12px', color: '#6c757d' }}>
                Uploaded by {selectedPhotoData.uploadedBy} on {new Date(selectedPhotoData.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
