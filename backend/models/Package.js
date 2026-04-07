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
  }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
