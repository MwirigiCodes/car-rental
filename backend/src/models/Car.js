import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  cc: { type: String, required: true },
  year: { type: String, required: true },
  dailyCost: { type: String, required: true },
  availability: {
    type: String,
    enum: ['Unavailable', 'Available'],
    default: 'Available',
  },
});

const Car = mongoose.model('Car', carSchema);

export default Car;
