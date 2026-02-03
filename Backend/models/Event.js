import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  location: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  totalCapacity: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    paymentId: { type: String },
    paymentStatus: { type: String, default: 'completed' },
    registeredAt: { type: Date, default: Date.now }
  }],
  image: { type: String },
  imagePublicId: { type: String },
  isActive: { type: Boolean, default: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);