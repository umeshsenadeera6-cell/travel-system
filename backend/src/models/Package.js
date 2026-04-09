const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  duration: { type: String, required: true },
  description: { type: String, required: true },
  itinerary: [{ type: mongoose.Schema.Types.Mixed }],
  inclusions: [{ type: String }],
  category: { 
    type: String, 
    enum: ['Inbound', 'Outbound'], 
    required: true 
  },
  type: {
    type: String,
    enum: ['Day', 'Round'],
    default: 'Day'
  },
  localizations: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  route: {
    stops: [{ label: String, lat: Number, lng: Number }],
    path: [{ lat: Number, lng: Number }]
  },
  isLimitedTime: { type: Boolean, default: false },
  discountPercentage: { type: Number, default: 0 },
  expiryDate: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
