import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useEventStore } from '../store/eventStore';

function EditEventModal({ event, onClose, onSuccess }) {
  const { updateEvent, loading } = useEventStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    ticketPrice: '',
    totalCapacity: '',
    image: null,
    isActive: true
  });

  useEffect(() => {
    if (event) {
      // Format the date to YYYY-MM-DD for the HTML date input
      let formattedDate = '';
      if (event.eventDate) {
        try {
          formattedDate = new Date(event.eventDate).toISOString().split('T')[0];
        } catch (e) {
          console.error('Error parsing date:', e);
        }
      }

      setFormData({
        title: event.title || '',
        description: event.description || '',
        eventDate: formattedDate,
        eventTime: event.eventTime || '',
        location: event.location || '',
        ticketPrice: event.ticketPrice !== undefined ? event.ticketPrice : '',
        totalCapacity: event.totalCapacity !== undefined ? event.totalCapacity : '',
        image: null, // Start with null unless a new file is uploaded
        isActive: event.isActive !== undefined ? event.isActive : true
      });
    }
  }, [event]);

  const hasTicketsSold = event && event.ticketsSold > 0;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send. If a new image isn't selected, don't pass it or pass null
    const submitData = { ...formData };
    if (!submitData.image) {
      delete submitData.image;
    }

    try {
      await updateEvent(event._id, submitData);
      toast.success('Event updated successfully!');
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update event');
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
          <h2 className="text-xl sm:text-2xl font-bold text-gradient">Edit Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl sm:text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {hasTicketsSold && (
          <div className="mb-4 p-3 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded text-xs sm:text-sm">
            ⚠️ <strong>{event.ticketsSold} ticket(s) sold.</strong> Event date, capacity, and ticket price cannot be modified.
          </div>
        )}

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
              <label className="block text-xs sm:text-sm font-medium mb-2">
                Event Date * {hasTicketsSold && <span className="text-amber-400">(Disabled)</span>}
              </label>
              <input
                type="date"
                name="eventDate"
                required
                disabled={hasTicketsSold}
                className={`input-field text-sm sm:text-base ${hasTicketsSold ? 'bg-dark-600 text-gray-500 cursor-not-allowed' : ''}`}
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
              <label className="block text-xs sm:text-sm font-medium mb-2">
                Ticket Price ($) * {hasTicketsSold && <span className="text-amber-400">(Disabled)</span>}
              </label>
              <input
                type="number"
                name="ticketPrice"
                required
                min="0"
                step="0.01"
                disabled={hasTicketsSold}
                className={`input-field text-sm sm:text-base ${hasTicketsSold ? 'bg-dark-600 text-gray-500 cursor-not-allowed' : ''}`}
                placeholder="0.00"
                value={formData.ticketPrice}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Total Capacity * {hasTicketsSold && <span className="text-amber-400">(Disabled)</span>}
              </label>
              <input
                type="number"
                name="totalCapacity"
                required
                min="1"
                disabled={hasTicketsSold}
                className={`input-field text-sm sm:text-base ${hasTicketsSold ? 'bg-dark-600 text-gray-500 cursor-not-allowed' : ''}`}
                placeholder="Number of tickets"
                value={formData.totalCapacity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Image (Upload new to replace)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="input-field"
            />
            {event?.image && !formData.image && (
              <p className="text-xs text-gray-400 mt-2">
                Current image exists. Uploading a new file will replace it.
              </p>
            )}
            {formData.image && (
              <p className="text-sm text-gray-400 mt-2">
                Selected new: {formData.image.name}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isActive" className="text-sm font-medium select-none">
              Event is Active (Visible to public for registration)
            </label>
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
              {loading ? 'Updating...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default EditEventModal;
