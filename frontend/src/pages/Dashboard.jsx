import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useEventStore } from '../store/eventStore';
import CreateEventModal from '../components/CreateEventModal';

function Dashboard() {
  const { user } = useAuthStore();
  const { myEvents, fetchMyEvents, loading } = useEventStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  const stats = [
    { 
      title: 'My Events', 
      value: myEvents.length, 
      icon: '📅',
      color: 'text-primary' 
    },
    { 
      title: 'Active Events', 
      value: myEvents.filter(e => e.isActive).length, 
      icon: '🎉',
      color: 'text-secondary' 
    },
    { 
      title: 'Total Tickets', 
      value: myEvents.reduce((acc, e) => acc + (e.ticketsSold || 0), 0), 
      icon: '🎫',
      color: 'text-green-500' 
    }
  ];

  return (
    <div className="min-h-screen bg-dark p-4 sm:p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container-custom"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gradient">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-400">Welcome back, {user?.name}!</p>
          </div>
          {(user?.role === 'organizer' || user?.role === 'admin') && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-primary w-full sm:w-auto text-sm sm:text-base"
            >
              + Create Event
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Stats Cards */}
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:shadow-glow transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">{stat.title}</p>
                  <p className={`text-2xl sm:text-3xl font-bold ${stat.color} mt-2`}>
                    {loading ? '...' : stat.value}
                  </p>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link to="/events">
              <button className="btn-primary w-full text-sm sm:text-base">View All Events</button>
            </Link>
            <button 
              className="btn-outline w-full text-sm sm:text-base"
              onClick={() => {
                const el = document.getElementById('recent-events');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              My Events
            </button>
            <button className="btn-secondary w-full text-sm sm:text-base">
              📊 View Analytics
            </button>
          </div>
        </div>

        {/* Recent Events */}
        <div className="card" id="recent-events">
          <h2 className="text-2xl font-bold mb-4">My Recent Events</h2>
          {loading ? (
            <p className="text-gray-400">Loading events...</p>
          ) : myEvents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">You haven't created any events yet.</p>
              {(user?.role === 'organizer' || user?.role === 'admin') ? (
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="btn-primary"
                >
                  Create Your First Event
                </button>
              ) : (
                <Link to="/events">
                  <button className="btn-primary">Browse Events</button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {myEvents.slice(0, 5).map((event) => (
                <Link key={event._id} to={`/events/${event._id}`}>
                  <div className="p-4 bg-dark-700 rounded-lg hover:bg-dark-600 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <p className="text-gray-400 text-sm">
                          {new Date(event.eventDate).toLocaleDateString()} at {event.eventTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary font-semibold">
                          {event.availableTickets} / {event.totalCapacity} tickets
                        </p>
                        <p className="text-sm text-gray-400">
                          ${event.ticketPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showCreateModal && (
          <CreateEventModal 
            onClose={() => setShowCreateModal(false)} 
            onSuccess={fetchMyEvents}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard;
