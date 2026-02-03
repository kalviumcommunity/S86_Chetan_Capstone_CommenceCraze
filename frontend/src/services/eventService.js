import api from './api';

export const eventService = {
  // Get all events
  getAllEvents: async () => {
    const response = await api.get('/api/');
    return response.data;
  },

  // Get single event by ID
  getEventById: async (id) => {
    const response = await api.get(`/api/${id}`);
    return response.data;
  },

  // Get my events (events created by current user)
  getMyEvents: async () => {
    const response = await api.get('/api/my/events');
    return response.data;
  },

  // Create new event
  createEvent: async (eventData) => {
    const formData = new FormData();

    // Append all event data
    Object.keys(eventData).forEach((key) => {
      if (key === 'image') {
        if (eventData[key] instanceof File) {
          formData.append('image', eventData[key]);
        }
        // If it's null, we don't append anything, or we could explicitly skip it
      } else if (eventData[key] !== null && eventData[key] !== undefined) {
        formData.append(key, eventData[key]);
      }
    });

    const response = await api.post('/api/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update event
  updateEvent: async (id, eventData) => {
    const formData = new FormData();

    Object.keys(eventData).forEach((key) => {
      if (key === 'image') {
        if (eventData[key] instanceof File) {
          formData.append('image', eventData[key]);
        }
      } else if (eventData[key] !== null && eventData[key] !== undefined) {
        formData.append(key, eventData[key]);
      }
    });

    const response = await api.put(`/api/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete event
  deleteEvent: async (id) => {
    const response = await api.delete(`/api/${id}`);
    return response.data;
  },

  // Register for event
  registerForEvent: async (id, registrationData) => {
    const response = await api.post(`/api/${id}/register`, registrationData);
    return response.data;
  },
};

export default eventService;
