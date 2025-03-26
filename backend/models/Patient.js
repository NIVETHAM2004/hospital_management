const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  dateOfBirth: {
    type: Date
  },
  address: {
    type: String
  },
  gender: {
    type: String
  },
  governmentScheme: {
    type: String
  },
  otherScheme: {
    type: String
  },
  schemeClaims: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Function to get the next sequence number for a given year
async function getNextSequence(year) {
  const lastPatient = await mongoose.model('Patient')
    .findOne({ patientId: new RegExp(`^${year}`) })
    .sort({ patientId: -1 });

  if (lastPatient) {
    const lastNumber = parseInt(lastPatient.patientId.split('-')[1]);
    return (lastNumber + 1).toString().padStart(3, '0');
  }
  return '001';
}

// Pre-save middleware to generate patient ID
patientSchema.pre('save', async function(next) {
  try {
    if (!this.patientId) {
      const year = new Date().getFullYear().toString().substr(-2);
      const sequence = await getNextSequence(year);
      const namePrefix = this.firstName.substr(0, 2).toUpperCase();
      this.patientId = `${year}${namePrefix}-${sequence}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if patient can claim government scheme
patientSchema.methods.canClaimScheme = function() {
  return this.schemeClaims < 2;
};

// Method to increment scheme claims
patientSchema.methods.incrementSchemeClaims = async function() {
  if (this.canClaimScheme()) {
    this.schemeClaims += 1;
    await this.save();
    return true;
  }
  return false;
};

module.exports = mongoose.model('Patient', patientSchema); 