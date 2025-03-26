const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  wardNumber: {
    type: String,
    required: [true, 'Ward number is required'],
    unique: true,
    trim: true
  },
  wardType: {
    type: String,
    required: [true, 'Ward type is required'],
    enum: {
      values: ['General', 'ICU', 'Emergency', 'Pediatric', 'Maternity', 'Surgery', 'Psychiatric'],
      message: '{VALUE} is not a valid ward type'
    }
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  currentOccupancy: {
    type: Number,
    default: 0,
    min: [0, 'Occupancy cannot be negative'],
    validate: {
      validator: function(v) {
        return v <= this.capacity;
      },
      message: 'Current occupancy ({VALUE}) cannot exceed capacity ({this.capacity})'
    }
  },
  nurseInCharge: String,
  status: {
    type: String,
    enum: {
      values: ['Active', 'Maintenance', 'Full', 'Reserved', 'Cleaning'],
      message: '{VALUE} is not a valid status'
    },
    default: 'Active'
  },
  floor: {
    type: String,
    required: [true, 'Floor is required'],
    enum: {
      values: ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor'],
      message: '{VALUE} is not a valid floor'
    }
  },
  description: String,
  equipment: String,
  lastMaintenance: Date,
  nextMaintenance: Date,
  specialNotes: String
}, {
  timestamps: true
});

// Add method to calculate occupancy rate
wardSchema.methods.getOccupancyRate = function() {
  return (this.currentOccupancy / this.capacity) * 100;
};

// Update status based on occupancy
wardSchema.pre('save', function(next) {
  if (this.currentOccupancy >= this.capacity) {
    this.status = 'Full';
  }
  next();
});

// Add error handling middleware
wardSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Ward number already exists'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Ward', wardSchema); 