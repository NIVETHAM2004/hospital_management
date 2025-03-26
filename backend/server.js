const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/hospitalManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
  retryWrites: true,
  w: 'majority'
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  // Start server only after successful database connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const connection = mongoose.connection;
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
});

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// ==================== Invoice Schema and Model ====================
const invoiceSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  labName: String,
  treatment: String,
  wardNumber: String,
  totalAmount: String,
  patientId: String,
  governmentScheme: String
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// Invoice Routes
app.get('/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/invoices', async (req, res) => {
  const invoice = new Invoice(req.body);
  try {
    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/invoices/:id', async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedInvoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/invoices/:id', async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==================== Patient Model and Routes ====================
// Import the Patient model from models folder
const Patient = require('./models/Patient');

// Patient Routes
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error('Error fetching patients:', err);
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const newPatient = await patient.save();
    console.log('Created patient with ID:', newPatient.patientId);
    res.status(201).json(newPatient);
  } catch (err) {
    console.error('Error creating patient:', err);
    res.status(400).json({ message: err.message });
  }
});

// Check if patient can claim government scheme
app.get('/api/patients/:id/can-claim', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ 
      canClaim: patient.canClaimScheme(),
      claimsUsed: patient.schemeClaims,
      remainingClaims: 2 - patient.schemeClaims
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Record a scheme claim for a patient
app.post('/api/patients/:id/claim', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    if (!patient.canClaimScheme()) {
      return res.status(400).json({ 
        message: 'Maximum claims reached. Cannot claim government scheme anymore.',
        claimsUsed: patient.schemeClaims
      });
    }

    await patient.incrementSchemeClaims();
    res.json({ 
      success: true, 
      claimsUsed: patient.schemeClaims,
      remainingClaims: 2 - patient.schemeClaims,
      message: patient.schemeClaims >= 2 ? 'Final claim used' : 'Claim recorded successfully'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/patients/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/patients/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Download invoice and update claims
app.post('/api/invoices/:id/download', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // If the invoice has a patient ID and government scheme, update claims
    if (invoice.patientId && invoice.governmentScheme) {
      const patient = await Patient.findOne({ patientId: invoice.patientId });
      if (patient && patient.canClaimScheme()) {
        await patient.incrementSchemeClaims();
        console.log(`Updated claims for patient ${patient.patientId}: ${patient.schemeClaims}/2`);
      }
    }

    // Here you would typically generate and send the invoice file
    // For now, we'll just send a success message
    res.json({ 
      message: 'Invoice downloaded and claims updated',
      claimsUpdated: true
    });
  } catch (err) {
    console.error('Error processing invoice download:', err);
    res.status(500).json({ message: err.message });
  }
});

// Import Ward model
const Ward = require('./models/Ward');

// Ward Routes
app.get('/api/wards', async (req, res) => {
  try {
    const wards = await Ward.find();
    
    // Calculate statistics
    const totalWards = wards.length;
    const totalCapacity = wards.reduce((sum, ward) => sum + ward.capacity, 0);
    const totalOccupancy = wards.reduce((sum, ward) => sum + ward.currentOccupancy, 0);
    const occupancyRate = totalCapacity > 0 ? (totalOccupancy / totalCapacity) * 100 : 0;
    const availableBeds = totalCapacity - totalOccupancy;

    res.json({
      wards,
      stats: {
        totalWards,
        totalCapacity,
        totalOccupancy,
        occupancyRate: Math.round(occupancyRate),
        availableBeds
      }
    });
  } catch (err) {
    console.error('Error fetching wards:', err);
    res.status(500).json({ message: 'Error fetching wards' });
  }
});

app.post('/api/wards', async (req, res) => {
  try {
    // Validate required fields
    const { wardNumber, wardType, capacity, floor } = req.body;
    
    // Convert capacity to number
    const wardData = {
      ...req.body,
      capacity: parseInt(capacity),
      currentOccupancy: req.body.currentOccupancy ? parseInt(req.body.currentOccupancy) : 0
    };

    // Create new ward
    const ward = new Ward(wardData);
    
    // Validate the ward data
    const validationError = ward.validateSync();
    if (validationError) {
      const errorMessages = Object.values(validationError.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errorMessages 
      });
    }

    // Save the ward
    const newWard = await ward.save();
    console.log('New ward created:', newWard);
    res.status(201).json(newWard);
  } catch (err) {
    console.error('Error creating ward:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Ward number already exists' });
    }
    res.status(400).json({ 
      message: err.message || 'Error creating ward',
      error: err
    });
  }
});

app.put('/api/wards/:id', async (req, res) => {
  try {
    const updatedWard = await Ward.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedWard) {
      return res.status(404).json({ message: 'Ward not found' });
    }
    res.json(updatedWard);
  } catch (err) {
    console.error('Error updating ward:', err);
    res.status(400).json({ message: err.message || 'Error updating ward' });
  }
});

app.delete('/api/wards/:id', async (req, res) => {
  try {
    const deletedWard = await Ward.findByIdAndDelete(req.params.id);
    if (!deletedWard) {
      return res.status(404).json({ message: 'Ward not found' });
    }
    res.json({ message: 'Ward deleted successfully' });
  } catch (err) {
    console.error('Error deleting ward:', err);
    res.status(500).json({ message: 'Error deleting ward' });
  }
});