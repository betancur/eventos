import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Temporary mock data - will be replaced with Supabase data
const mockEventDetails = {
  1: {
    id: 1,
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring the latest innovations and industry leaders.',
    longDescription: 'Join us for a comprehensive technology conference that brings together industry experts, innovators, and enthusiasts. This year\'s event features keynote speakers from major tech companies, hands-on workshops, and networking opportunities.',
    date: '2025-08-15',
    time: '09:00 AM - 06:00 PM',
    location: 'Convention Center',
    address: '123 Tech Street, Innovation City',
    image: null,
    isPublic: true,
    organizer: 'Tech Events Inc.',
    capacity: 500,
    price: 'Free',
    tags: ['Technology', 'Innovation', 'Networking']
  },
  2: {
    id: 2,
    title: 'Design Workshop',
    description: 'Interactive workshop on modern design principles and user experience.',
    longDescription: 'Dive deep into the world of modern design with this hands-on workshop. Learn about user experience principles, design thinking, and practical tools used by industry professionals.',
    date: '2025-08-20',
    time: '10:00 AM - 04:00 PM',
    location: 'Creative Studio',
    address: '456 Design Avenue, Art District',
    image: null,
    isPublic: true,
    organizer: 'Design Collective',
    capacity: 50,
    price: '$75',
    tags: ['Design', 'UX', 'Workshop']
  }
};

const mockSchedule = [
  { time: '09:00 AM', title: 'Registration & Coffee', speaker: '', description: 'Welcome and networking' },
  { time: '10:00 AM', title: 'Opening Keynote', speaker: 'Dr. Jane Smith', description: 'The Future of Technology' },
  { time: '11:00 AM', title: 'Panel Discussion', speaker: 'Industry Leaders', description: 'AI and Machine Learning Trends' },
  { time: '12:00 PM', title: 'Lunch Break', speaker: '', description: 'Networking lunch' },
  { time: '01:30 PM', title: 'Workshop Session 1', speaker: 'Various', description: 'Hands-on technical workshops' },
  { time: '03:00 PM', title: 'Coffee Break', speaker: '', description: '' },
  { time: '03:30 PM', title: 'Workshop Session 2', speaker: 'Various', description: 'Advanced topics' },
  { time: '05:00 PM', title: 'Closing Remarks', speaker: 'Event Organizers', description: 'Wrap-up and next steps' }
];

const mockSpeakers = [
  {
    id: 1,
    name: 'Dr. Jane Smith',
    title: 'Chief Technology Officer',
    company: 'TechCorp',
    bio: 'Dr. Smith is a renowned expert in artificial intelligence with over 15 years of experience in the tech industry.',
    image: null,
    social: {
      twitter: '@janesmith',
      linkedin: 'jane-smith-tech'
    }
  },
  {
    id: 2,
    name: 'Alex Johnson',
    title: 'Senior Product Designer',
    company: 'DesignStudio',
    bio: 'Alex specializes in user experience design and has worked with startups and Fortune 500 companies.',
    image: null,
    social: {
      twitter: '@alexdesigns',
      linkedin: 'alex-johnson-design'
    }
  }
];

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const eventId = id ? parseInt(id) : 1;
  const event = mockEventDetails[eventId as keyof typeof mockEventDetails];

  if (!event) {
    return (
      <div className="text-center">
        <h1>Event Not Found</h1>
        <p>The event you're looking for doesn't exist.</p>
        <Link to="/events" className="btn btn-primary">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="event-details">
      {/* Event Header */}
      <div className="card mb-24">
        {event.image && (
          <img 
            src={event.image} 
            alt={event.title}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        )}
        <div className="card-body">
          <h1 className="card-title">{event.title}</h1>
          <p className="card-text mb-16">{event.description}</p>
          
          <div className="row mb-16">
            <div className="col-12 col-md-6">
              <strong>📅 Date:</strong> {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="col-12 col-md-6">
              <strong>🕐 Time:</strong> {event.time}
            </div>
          </div>
          
          <div className="row mb-16">
            <div className="col-12 col-md-6">
              <strong>📍 Location:</strong> {event.location}
            </div>
            <div className="col-12 col-md-6">
              <strong>💰 Price:</strong> {event.price}
            </div>
          </div>
          
          <div className="mb-16">
            <strong>📧 Organizer:</strong> {event.organizer}
          </div>
          
          <div className="mb-16">
            <strong>👥 Capacity:</strong> {event.capacity} attendees
          </div>
          
          {event.tags && (
            <div className="mb-16">
              <strong>🏷️ Tags:</strong> {event.tags.join(', ')}
            </div>
          )}
          
          <div className="row">
            <div className="col-12 col-md-6">
              <button className="btn btn-primary btn-block mb-16">
                Register for Event
              </button>
            </div>
            <div className="col-12 col-md-6">
              <button className="btn btn-outline btn-block mb-16">
                Add to Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Description */}
      <div className="card mb-24">
        <div className="card-header">
          <h2>About This Event</h2>
        </div>
        <div className="card-body">
          <p>{event.longDescription}</p>
          <p><strong>Address:</strong> {event.address}</p>
        </div>
      </div>

      {/* Schedule */}
      <div className="card mb-24">
        <div className="card-header">
          <h2>Event Schedule</h2>
        </div>
        <div className="card-body">
          {mockSchedule.map((item, index) => (
            <div key={index} className="schedule-item" style={{ borderBottom: '1px solid #e9ecef', paddingBottom: '16px', marginBottom: '16px' }}>
              <div className="row">
                <div className="col-12 col-md-3">
                  <strong>{item.time}</strong>
                </div>
                <div className="col-12 col-md-9">
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                    {item.title}
                  </h4>
                  {item.speaker && (
                    <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                      Speaker: {item.speaker}
                    </p>
                  )}
                  {item.description && (
                    <p style={{ fontSize: '14px', marginBottom: '0' }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Speakers */}
      <div className="card mb-24">
        <div className="card-header">
          <h2>Featured Speakers</h2>
        </div>
        <div className="card-body">
          <div className="row">
            {mockSpeakers.map((speaker) => (
              <div key={speaker.id} className="col-12 col-md-6 col-lg-4 mb-16">
                <div className="speaker-card" style={{ textAlign: 'center', padding: '16px' }}>
                  {speaker.image ? (
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%', 
                        objectFit: 'cover',
                        marginBottom: '8px'
                      }}
                    />
                  ) : (
                    <div style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '50%', 
                      backgroundColor: '#e9ecef',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 8px',
                      fontSize: '24px'
                    }}>
                      👤
                    </div>
                  )}
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                    {speaker.name}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '4px' }}>
                    {speaker.title}
                  </p>
                  <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '8px' }}>
                    {speaker.company}
                  </p>
                  <p style={{ fontSize: '12px', marginBottom: '8px' }}>
                    {speaker.bio}
                  </p>
                  <div style={{ fontSize: '12px' }}>
                    {speaker.social.twitter && (
                      <span style={{ marginRight: '8px' }}>
                        🐦 {speaker.social.twitter}
                      </span>
                    )}
                    {speaker.social.linkedin && (
                      <span>
                        💼 {speaker.social.linkedin}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="text-center">
        <Link to="/events" className="btn btn-secondary">
          ← Back to Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
