// Create a new patient
router.post('/', async (req, res) => {
  try {
    // Create a new patient without explicitly setting patientId
    // The pre-save middleware will generate it automatically
    const patient = new Patient(req.body);
    
    // Save the new patient
    const savedPatient = await patient.save();
    
    // Return the complete patient object with the generated ID
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}); 