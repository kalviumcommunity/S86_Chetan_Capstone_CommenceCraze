import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEventStore } from '../store/eventStore';
import { useAuthStore } from '../store/authStore';
import CreateEventModal from '../components/CreateEventModal';

function Events() {
  const { events, fetchEvents, loading } = useEventStore();
  const { user } = useAuthStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateClick = () => {
    if (user?.role === 'organizer') {
      setShowCreateModal(true);
    } else {
      toast.info('Only organizers can create events');
    }
  };

  return (
    <div className="min-h-screen bg-dark p-4 sm:p-6 md:p-8">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">Events</h1>
            <p className="text-sm sm:text-base text-gray-400 mt-2">
              {loading ? 'Loading...' : `${events.length} events available`}
            </p>
          </div>
          <button 
            onClick={handleCreateClick}
            className="btn-primary w-full sm:w-auto text-sm sm:text-base"
          >
            + Create Event
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-40 sm:h-48 bg-dark-700 rounded-lg mb-4"></div>
                <div className="h-5 sm:h-6 bg-dark-700 rounded mb-2"></div>
                <div className="h-4 bg-dark-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card text-center py-12 sm:py-16 md:py-20"
          >
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4">📅</div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">No Events Yet</h2>
            <p className="text-sm sm:text-base text-gray-400 mb-6">Be the first to create an event!</p>
            <button 
              onClick={handleCreateClick}
              className="btn-primary text-sm sm:text-base"
            >
              Create Event
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/events/${event._id}`}>
                  <div className="card hover:shadow-glow transition-all duration-300 cursor-pointer">
                    {event.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold mb-2 text-primary hover:text-primary-600">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-300">
                        <span>📅</span>
                        <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                        <span className="text-gray-500">•</span>
                        <span>{event.eventTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <span>📍</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-secondary font-bold text-lg">
                          ${event.ticketPrice}
                        </span>
                        <span className="text-gray-400">
                          {event.availableTickets}/{event.totalCapacity} available
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <CreateEventModal onClose={() => setShowCreateModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Events;
