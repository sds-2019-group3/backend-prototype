const mongoose = require('mongoose');

const { Schema } = mongoose;

const equipmentEnum = [
  'TV',
  'PROJECTOR',
];

const bookingSchema = new Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  leader: {
    type: String,
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
});

const roomSchema = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+-\w+$/,
  },
  floor: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: 1,
  },
  equipment: {
    type: [{
      type: String,
      uppercase: true,
      enum: equipmentEnum,
    }],
    required: true,
  },
  bookings: [bookingSchema],
  noiseLevel: {
    type: String,
    uppercase: true,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
  },
  temperatureLevel: {
    type: String,
    uppercase: true,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
  },
  wifiSpeed: Number,
});

module.exports = mongoose.model('Room', roomSchema);
