import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useEventStore } from '../store/eventStore';

function CreateEventModal({ onClose, onSuccess }) {
  const { createEvent, loading } = useEventStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    ticketPrice: '',
    totalCapacity: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await createEvent(formData);
      toast.success('Event created successfully!');
      onClose();
      if (onSuccess) onSuccess();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        eventDate: '',
        eventTime: '',
        location: '',
        ticketPrice: '',
        totalCapacity: '',
        image: null
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create event');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto my-4"
      >
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gradient">Create New Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl sm:text-3xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">Event Title *</label>
            <input
              type="text"
              name="title"
              required
              className="input-field text-sm sm:text-base"
              placeholder="Enter event title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              required
              rows="3"
              className="input-field text-sm sm:text-base"
              placeholder="Describe your event"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">Event Date *</label>
              <input
                type="date"
                name="eventDate"
                required
                className="input-field text-sm sm:text-base"
                value={formData.eventDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">Event Time *</label>
              <input
                type="time"
                name="eventTime"
                required
                className="input-field text-sm sm:text-base"
                value={formData.eventTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              name="location"
              required
              className="input-field text-sm sm:text-base"
              placeholder="Event venue"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium mb-2">Ticket Price ($) *</label>
              <input
                type="number"
                name="ticketPrice"
                required
                min="0"
                step="0.01"
                className="input-field text-sm sm:text-base"
                placeholder="0.00"
                value={formData.ticketPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Total Capacity *</label>
              <input
                type="number"
                name="totalCapacity"
                required
                min="1"
                className="input-field"
                placeholder="Number of tickets"
                value={formData.totalCapacity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="input-field"
            />
            {formData.image && (
              <p className="text-sm text-gray-400 mt-2">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline flex-1"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default CreateEventModal;
