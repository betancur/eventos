import React, { useState, useEffect } from 'react';
import { useEvent } from '../EventContext';
import { useAuth } from '../../auth/AuthProvider';

const EventGallery: React.FC = () => {
  const { photos, currentEvent, loadPhotos } = useEvent();
  const { user } = useAuth();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'approved' | 'my-photos'>('approved');

  useEffect(() => {
    if (currentEvent) {
      loadPhotos(currentEvent.id);
    }
  }, [currentEvent]);

  if (!currentEvent?.settings.allowPhotoUpload) {
    return (
      <div className="event-gallery">
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
            <h3 style={{ marginBottom: '8px' }}>Photo Sharing Disabled</h3>
            <p className="card-text">
              Photo sharing is not enabled for this event.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredPhotos = photos.filter(photo => {
    switch (filter) {
      case 'all':
        return true;
      case 'approved':
        return photo.status === 'approved';
      case 'my-photos':
        return user && photo.uploadedBy === user.id;
      default:
        return photo.status === 'approved';
    }
  });

  const handlePhotoClick = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="event-gallery">
      {/* Gallery Header */}
      <div className="card mb-24">
        <div className="card-body">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Event Photos</h3>
              <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
                {currentEvent.stats.totalPhotos} photos shared by attendees
              </p>
            </div>
            
            {user && (
              <button className="btn btn-primary">
                📸 Upload Photo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs mb-24">
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e9ecef',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setFilter('approved')}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: 'none',
              color: filter === 'approved' ? '#0d6efd' : '#6c757d',
              borderBottom: filter === 'approved' ? '2px solid #0d6efd' : 'none',
              whiteSpace: 'nowrap',
              fontWeight: filter === 'approved' ? '500' : 'normal',
              cursor: 'pointer'
            }}
          >
            📸 All Photos
          </button>
          
          {user && (
            <button
              onClick={() => setFilter('my-photos')}
              style={{
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                color: filter === 'my-photos' ? '#0d6efd' : '#6c757d',
                borderBottom: filter === 'my-photos' ? '2px solid #0d6efd' : 'none',
                whiteSpace: 'nowrap',
                fontWeight: filter === 'my-photos' ? '500' : 'normal',
                cursor: 'pointer'
              }}
            >
              👤 My Photos
            </button>
          )}
        </div>
      </div>

      {/* Photo Grid */}
      {filteredPhotos.length === 0 ? (
        <div className="card">
          <div className="card-body text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📷</div>
            <h3 style={{ marginBottom: '8px' }}>
              {filter === 'my-photos' ? 'No Photos Yet' : 'No Photos Shared'}
            </h3>
            <p className="card-text">
              {filter === 'my-photos' 
                ? "You haven't uploaded any photos yet. Be the first to share memories from this event!"
                : "No photos have been shared for this event yet. Upload the first one!"
              }
            </p>
            {user && (
              <button className="btn btn-primary mt-16">
                Upload First Photo
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Photo Statistics */}
          <div className="card mb-24">
            <div className="card-body">
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: '16px',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0d6efd' }}>
                    {filteredPhotos.length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    {filter === 'my-photos' ? 'My Photos' : 'Total Photos'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
                    {new Set(filteredPhotos.map(p => p.uploadedBy)).size}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    Contributors
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
                    {filteredPhotos.filter(p => p.activityId).length}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    From Activities
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="photo-card"
                style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => handlePhotoClick(photo.url)}
              >
                {/* Photo */}
                <div style={{
                  aspectRatio: '1',
                  backgroundImage: `url(${photo.thumbnailUrl || photo.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  {/* Status indicator */}
                  {photo.status === 'pending' && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(255, 193, 7, 0.9)',
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '12px',
                      fontSize: '10px'
                    }}>
                      Pending
                    </div>
                  )}
                </div>

                {/* Photo Info */}
                <div style={{ padding: '12px' }}>
                  {photo.caption && (
                    <p style={{ 
                      margin: '0 0 8px 0', 
                      fontSize: '13px',
                      lineHeight: '1.4'
                    }}>
                      {photo.caption}
                    </p>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '11px',
                    color: '#6c757d'
                  }}>
                    <span>👤 {photo.uploaderName}</span>
                    <span>{new Date(photo.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
          onClick={closeModal}
        >
          <div style={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh'
          }}>
            <img
              src={selectedPhoto}
              alt="Event photo"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain'
              }}
            />
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventGallery;