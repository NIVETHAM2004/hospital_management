import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WardManagement.css';

const WardManagement = () => {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWards, setFilteredWards] = useState([]);
  const [stats, setStats] = useState({
    totalWards: 0,
    availableBeds: 0,
    occupancyRate: 0
  });

  const [formData, setFormData] = useState({
    wardNumber: '',
    wardType: '',
    capacity: '',
    currentOccupancy: '',
    nurseInCharge: '',
    status: '',
    floor: '',
    description: '',
    equipment: '',
    lastMaintenance: '',
    nextMaintenance: '',
    specialNotes: ''
  });

  // Fetch wards data
  useEffect(() => {
    fetchWards();
  }, []);

  const fetchWards = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/wards');
      setWards(response.data.wards);
      setStats(response.data.stats);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch wards data');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (ward) => {
    setSelectedWard(ward);
    setFormData(ward);
    setIsEditing(true);
  };

  const handleDelete = async (wardId) => {
    if (window.confirm('Are you sure you want to delete this ward?')) {
      try {
        await axios.delete(`http://localhost:5000/api/wards/${wardId}`);
        fetchWards(); // Refresh the list
        if (selectedWard?._id === wardId) {
          handleCancel();
        }
      } catch (error) {
        setError('Failed to delete ward');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    
    try {
      // Validation
      if (!formData.wardNumber || !formData.wardType || !formData.capacity || !formData.floor) {
        setError('Please fill in all required fields');
        return;
      }

      // Convert capacity and occupancy to numbers
      const wardData = {
        ...formData,
        capacity: parseInt(formData.capacity),
        currentOccupancy: formData.currentOccupancy ? parseInt(formData.currentOccupancy) : 0
      };

      // Validate occupancy doesn't exceed capacity
      if (wardData.currentOccupancy > wardData.capacity) {
        setError('Current occupancy cannot exceed ward capacity');
        return;
      }

      let response;
      if (isEditing) {
        // Update existing ward
        response = await axios.put(`http://localhost:5000/api/wards/${selectedWard._id}`, wardData);
        alert('Ward updated successfully!');
      } else {
        // Add new ward
        response = await axios.post('http://localhost:5000/api/wards', wardData);
        alert(`New ward ${response.data.wardNumber} added successfully!`);
      }

      fetchWards(); // Refresh the list
      handleCancel(); // Reset form
    } catch (err) {
      console.error('Error saving ward:', err);
      const errorMessage = err.response?.data?.message || 'Failed to save ward. Please try again.';
      setError(errorMessage);
      alert(errorMessage);
    }
  };

  const handleCancel = () => {
    setSelectedWard(null);
    setIsEditing(false);
    setFormData({
      wardNumber: '',
      wardType: '',
      capacity: '',
      currentOccupancy: '',
      nurseInCharge: '',
      status: '',
      floor: '',
      description: '',
      equipment: '',
      lastMaintenance: '',
      nextMaintenance: '',
      specialNotes: ''
    });
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setFilteredWards([]);
      return;
    }

    // Filter wards based on ward number
    const results = wards.filter(ward => 
      ward.wardNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredWards(results);

    if (results.length === 0) {
      alert('No wards found with this number');
    }
  };

  return (
    <div className="ward-management-page">
      <h2>Ward Management</h2>
      
      <div className="search-section">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search by Ward Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            className="search-btn"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="ward-stats">
        <div className="stat-card">
          <h4>Total Wards</h4>
          <p>{stats.totalWards}</p>
        </div>
        <div className="stat-card">
          <h4>Available Beds</h4>
          <p>{stats.availableBeds}</p>
        </div>
        <div className="stat-card">
          <h4>Occupancy Rate</h4>
          <p>{stats.occupancyRate}%</p>
        </div>
      </div>

      <div className="ward-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Ward Number*</label>
              <input
                type="text"
                name="wardNumber"
                value={formData.wardNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ward Type*</label>
              <select
                name="wardType"
                value={formData.wardType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Ward Type</option>
                <option value="General">General</option>
                <option value="ICU">ICU</option>
                <option value="Emergency">Emergency</option>
                <option value="Pediatric">Pediatric</option>
                <option value="Maternity">Maternity</option>
                <option value="Surgery">Surgery</option>
                <option value="Psychiatric">Psychiatric</option>
              </select>
            </div>

            <div className="form-group">
              <label>Capacity*</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Current Occupancy</label>
              <input
                type="number"
                name="currentOccupancy"
                value={formData.currentOccupancy}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Nurse In Charge</label>
              <input
                type="text"
                name="nurseInCharge"
                value={formData.nurseInCharge}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Full">Full</option>
                <option value="Reserved">Reserved</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>

            <div className="form-group">
              <label>Floor</label>
              <select
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Floor</option>
                <option value="Ground Floor">Ground Floor</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floor">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
              </select>
            </div>

            <div className="form-group">
              <label>Last Maintenance</label>
              <input
                type="date"
                name="lastMaintenance"
                value={formData.lastMaintenance}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Next Maintenance</label>
              <input
                type="date"
                name="nextMaintenance"
                value={formData.nextMaintenance}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Equipment</label>
              <textarea
                name="equipment"
                value={formData.equipment}
                onChange={handleInputChange}
                placeholder="List major equipment in the ward"
              />
            </div>

            <div className="form-group full-width">
              <label>Special Notes</label>
              <textarea
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleInputChange}
                placeholder="Any special requirements or notes"
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit" className="add-btn">
              {isEditing ? 'Update Ward' : 'Add Ward'}
            </button>
            {isEditing && (
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="ward-list">
        <h3>Ward List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ward Number</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Occupancy</th>
                <th>Nurse In Charge</th>
                <th>Status</th>
                <th>Floor</th>
                <th>Next Maintenance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(filteredWards.length > 0 ? filteredWards : wards).map(ward => (
                <tr key={ward._id}>
                  <td>{ward.wardNumber}</td>
                  <td>{ward.wardType}</td>
                  <td>{ward.capacity}</td>
                  <td>
                    <div className="occupancy-bar">
                      <div 
                        className="occupancy-fill"
                        style={{
                          width: `${(ward.currentOccupancy / ward.capacity) * 100}%`,
                          backgroundColor: ward.currentOccupancy === ward.capacity ? '#e74c3c' : '#2ecc71'
                        }}
                      />
                      <span>{ward.currentOccupancy}/{ward.capacity}</span>
                    </div>
                  </td>
                  <td>{ward.nurseInCharge}</td>
                  <td>
                    <span className={`status-badge ${ward.status?.toLowerCase()}`}>
                      {ward.status}
                    </span>
                  </td>
                  <td>{ward.floor}</td>
                  <td>{ward.nextMaintenance ? new Date(ward.nextMaintenance).toLocaleDateString() : '-'}</td>
                  <td className="actions">
                    <button 
                      className="edit-btn" 
                      onClick={() => handleEdit(ward)}
                      title="Edit"
                    >
                      ✎
                    </button>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(ward._id)}
                      title="Delete"
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default WardManagement; 