import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useEventStore } from '../store/eventStore';
import { useAuthStore } from '../store/authStore';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentEvent, fetchEventById, loading, deleteEvent, registerForEvent } = useEventStore();
  const { user } = useAuthStore();
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchEventById(id).catch(() => {
      toast.error('Event not found');
      navigate('/events');
    });
  }, [id, fetchEventById, navigate]);

  const isOwner = currentEvent?.owner?._id === user?.id || currentEvent?.owner === user?.id;

  const handleRegister = async () => {
    if (!user) {
      toast.error('Please login to register for events');
      navigate('/login');
      return;
    }

    if (currentEvent.availableTickets === 0) {
      toast.error('This event is sold out');
      return;
    }

    try {
      setRegistering(true);
      await registerForEvent(id);
      toast.success('Successfully registered for event!');
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to register for event';
      toast.error(message);
    } finally {
      setRegistering(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        toast.success('Event deleted successfully');
        navigate('/events');
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  if (loading || !currentEvent) {
    return (
      <div className="min-h-screen bg-dark p-8">
        <div className="container-custom max-w-4xl">
          <div className="card animate-pulse">
            <div className="h-64 bg-dark-700 rounded-lg mb-4"></div>
            <div className="h-8 bg-dark-700 rounded mb-4"></div>
            <div className="h-4 bg-dark-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-dark-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="container-custom max-w-4xl">
        <Link to="/events" className="text-primary hover:text-primary-600 mb-6 inline-block">
          ← Back to Events
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card"
        >
          {/* Event Image */}
          {currentEvent.image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img 
                src={currentEvent.image} 
                alt={currentEvent.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Event Header */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2 text-gradient">{currentEvent.title}</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span>By {currentEvent.owner?.name || 'Unknown'}</span>
              <span>•</span>
              <span>{new Date(currentEvent.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Event Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Date & Time</h3>
                <p className="text-lg">
                  📅 {new Date(currentEvent.eventDate).toLocaleDateString()} at {currentEvent.eventTime}
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Location</h3>
                <p className="text-lg">📍 {currentEvent.location}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Ticket Price</h3>
                <p className="text-2xl font-bold text-secondary">${currentEvent.ticketPrice}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Availability</h3>
                <p className="text-lg">
                  {currentEvent.availableTickets} / {currentEvent.totalCapacity} tickets available
                </p>
                <div className="w-full bg-dark-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${((currentEvent.totalCapacity - currentEvent.availableTickets) / currentEvent.totalCapacity) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Status</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                  currentEvent.isActive ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {currentEvent.isActive ? '✓ Active' : '✗ Inactive'}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">About This Event</h3>
            <p className="text-gray-300 leading-relaxed">{currentEvent.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {isOwner ? (
              <>
                <button 
                  onClick={() => toast.info('Edit functionality coming soon!')}
                  className="btn-primary flex-1"
                >
                  Edit Event
                </button>
                <button 
                  onClick={handleDelete}
                  className="btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Delete Event
                </button>
              </>
            ) : (
              <button 
                onClick={handleRegister}
                className="btn-primary w-full"
                disabled={currentEvent.availableTickets === 0 || registering}
              >
                {registering 
                  ? 'Registering...' 
                  : currentEvent.availableTickets === 0 
                    ? 'Sold Out' 
                    : 'Register for Event'}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default EventDetails;
