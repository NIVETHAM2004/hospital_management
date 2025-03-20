import React, { useState } from 'react';
import '../styles/management.css';
import './WardManagement.css';

const WardManagement = () => {
  const [wards, setWards] = useState([
    {
      id: 1,
      wardNumber: 'W001',
      wardType: 'General',
      capacity: 20,
      currentOccupancy: 15,
      nurseInCharge: 'Sarah Johnson',
      status: 'Active',
      floor: '1st Floor'
    },
    {
      id: 2,
      wardNumber: 'W002',
      wardType: 'ICU',
      capacity: 10,
      currentOccupancy: 8,
      nurseInCharge: 'Michael Brown',
      status: 'Active',
      floor: '2nd Floor'
    }
  ]);

  const [formData, setFormData] = useState({
    wardNumber: '',
    wardType: '',
    capacity: '',
    currentOccupancy: '',
    nurseInCharge: '',
    status: '',
    floor: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = () => {
    // Add validation and API call here
    console.log('Adding ward:', formData);
  };

  const handleUpdate = () => {
    // Add update logic here
    console.log('Updating ward');
  };

  const handleDelete = () => {
    // Add delete logic here
    console.log('Deleting ward');
  };

  const handleSearch = () => {
    // Add search logic here
    console.log('Searching ward');
  };

  return (
    <div className="management-page">
      <h2>Ward Management</h2>
      
      <div className="search-section">
        <button className="generate-report-btn">Generate Report</button>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Ward Number"
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="form-container">
        <div className="form-row">
          <input
            type="text"
            name="wardNumber"
            placeholder="Ward Number"
            value={formData.wardNumber}
            onChange={handleInputChange}
          />
          <select
            name="wardType"
            value={formData.wardType}
            onChange={handleInputChange}
          >
            <option value="">Select Ward Type</option>
            <option value="General">General</option>
            <option value="ICU">ICU</option>
            <option value="Emergency">Emergency</option>
            <option value="Pediatric">Pediatric</option>
            <option value="Maternity">Maternity</option>
          </select>
        </div>

        <div className="form-row">
          <input
            type="number"
            name="capacity"
            placeholder="Total Capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="currentOccupancy"
            placeholder="Current Occupancy"
            value={formData.currentOccupancy}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="nurseInCharge"
            placeholder="Nurse In Charge"
            value={formData.nurseInCharge}
            onChange={handleInputChange}
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Full">Full</option>
          </select>
        </div>

        <div className="form-row">
          <select
            name="floor"
            value={formData.floor}
            onChange={handleInputChange}
          >
            <option value="">Select Floor</option>
            <option value="Ground Floor">Ground Floor</option>
            <option value="1st Floor">1st Floor</option>
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
          </select>
        </div>

        <div className="button-group">
          <button className="add-btn" onClick={handleAdd}>Add</button>
          <button className="update-btn" onClick={handleUpdate}>Update</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="table-container">
        <h3>Ward List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ward Number</th>
              <th>Ward Type</th>
              <th>Capacity</th>
              <th>Current Occupancy</th>
              <th>Nurse In Charge</th>
              <th>Status</th>
              <th>Floor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {wards.map(ward => (
              <tr key={ward.id}>
                <td>{ward.id}</td>
                <td>{ward.wardNumber}</td>
                <td>{ward.wardType}</td>
                <td>{ward.capacity}</td>
                <td>{ward.currentOccupancy}</td>
                <td>{ward.nurseInCharge}</td>
                <td>
                  <span className={`status-badge ${ward.status.toLowerCase()}`}>
                    {ward.status}
                  </span>
                </td>
                <td>{ward.floor}</td>
                <td>
                  <button className="edit-btn">✎</button>
                  <button className="delete-btn">✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardManagement; 