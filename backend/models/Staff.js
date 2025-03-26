const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Doctor', 'Nurse', 'Admin'],
    default: 'Doctor'
  },
  specialization: {
    type: String,
    required: function() {
      return this.role === 'Doctor';
    }
  },
  department: String,
  yearsOfExperience: {
    type: Number,
    required: true,
    min: 0
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: true
  },
  address: String,
  nic: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  dob: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Online', 'Offline', 'Busy'],
    default: 'Online'
  },
  isEmergencyDoctor: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Calculate age
staffSchema.methods.getAge = function() {
  const today = new Date();
  const birthDate = new Date(this.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Get senior status
staffSchema.methods.isSenior = function() {
  return this.yearsOfExperience >= 10;
};

// Validate NIC format
staffSchema.path('nic').validate(function(nic) {
  const oldFormat = /^[0-9]{9}[vVxX]$/;
  const newFormat = /^[0-9]{12}$/;
  return oldFormat.test(nic) || newFormat.test(nic);
}, 'Invalid NIC format');

module.exports = mongoose.model('Staff', staffSchema); 