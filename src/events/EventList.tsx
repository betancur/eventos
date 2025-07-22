import React from 'react';
import { Link } from 'react-router-dom';

// Temporary placeholder data - will be replaced with Supabase data
const mockEvents = [
  {
    id: 1,
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring the latest innovations and industry leaders.',
    date: '2025-08-15',
    location: 'Convention Center',
    image: null,
    isPublic: true
  },
  {
    id: 2,
    title: 'Design Workshop',
    description: 'Interactive workshop on modern design principles and user experience.',
    date: '2025-08-20',
    location: 'Creative Studio',
    image: null,
    isPublic: true
  }
];

const EventList: React.FC = () => {
  return (
    <div className="event-list">
      <div className="text-center mb-24">
        <h1>Upcoming Events</h1>
        <p className="card-text">Discover and participate in amazing events</p>
      </div>
      
      <div className="row">
        {mockEvents.map((event) => (
          <div key={event.id} className="col-12 col-md-6 col-lg-4">
            <div className="card">
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h3 className="card-title">{event.title}</h3>
                <p className="card-text">{event.description}</p>
                <div className="card-text">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="card-text mb-16">
                  <strong>Location:</strong> {event.location}
                </div>
                <Link to={`/events/${event.id}`} className="btn btn-primary btn-block">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {mockEvents.length === 0 && (
        <div className="text-center">
          <p>No events available at the moment.</p>
          <p className="card-text">Check back later for updates!</p>
        </div>
      )}
    </div>
  );
};

export default EventList;
