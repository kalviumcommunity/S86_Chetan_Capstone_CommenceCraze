import { create } from 'zustand';
import { eventService } from '../services/eventService';

export const useEventStore = create((set, get) => ({
  events: [],
  myEvents: [],
  currentEvent: null,
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const data = await eventService.getAllEvents();
      set({ events: data.events || [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to fetch events',
        loading: false
      });
    }
  },

  fetchMyEvents: async () => {
    set({ loading: true, error: null });
    try {
      const data = await eventService.getMyEvents();
      set({ myEvents: data.events || [], loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to fetch your events',
        loading: false
      });
    }
  },

  fetchEventById: async (id) => {
    set({ loading: true, error: null });
    try {
      const event = await eventService.getEventById(id);
      set({ currentEvent: event, loading: false });
      return event;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to fetch event',
        loading: false
      });
      throw error;
    }
  },

  createEvent: async (eventData) => {
    set({ loading: true, error: null });
    try {
      const newEvent = await eventService.createEvent(eventData);
      set((state) => ({
        events: [newEvent, ...state.events],
        myEvents: [newEvent, ...state.myEvents],
        loading: false
      }));
      return newEvent;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to create event',
        loading: false
      });
      throw error;
    }
  },

  updateEvent: async (id, eventData) => {
    set({ loading: true, error: null });
    try {
      const updatedEvent = await eventService.updateEvent(id, eventData);
      set((state) => ({
        events: state.events.map((e) => (e._id === id ? updatedEvent : e)),
        myEvents: state.myEvents.map((e) => (e._id === id ? updatedEvent : e)),
        currentEvent: updatedEvent,
        loading: false,
      }));
      return updatedEvent;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to update event',
        loading: false
      });
      throw error;
    }
  },

  deleteEvent: async (id) => {
    set({ loading: true, error: null });
    try {
      await eventService.deleteEvent(id);
      set((state) => ({
        events: state.events.filter((e) => e._id !== id),
        myEvents: state.myEvents.filter((e) => e._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to delete event',
        loading: false
      });
      throw error;
    }
  },
  registerForEvent: async (id, registrationData) => {
    set({ loading: true, error: null });
    try {
      const result = await eventService.registerForEvent(id, registrationData);
      set((state) => ({
        events: state.events.map((e) =>
          e._id === id ? result.event : e
        ),
        currentEvent: result.event,
        loading: false,
      }));
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.error || 'Failed to register for event',
        loading: false
      });
      throw error;
    }
  },
  clearError: () => set({ error: null }),
}));
