import React, { useState } from 'react';
import '../styles/management.css';
import './LabManagement.css';

const LabManagement = () => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: 'Vitamin C',
      expireDate: '2025-04-13',
      manufactureDate: '2021-04-13',
      supplierName: 'Kene',
      unitPrice: 1500.00,
      qty: 150
    },
    {
      id: 2,
      name: 'Paracetamol',
      expireDate: '2025-04-13',
      manufactureDate: '2021-04-13',
      supplierName: 'Kene',
      unitPrice: 4500.00,
      qty: 220
    }
  ]);

  const [formData, setFormData] = useState({
    medicineName: '',
    supplierName: '',
    expireDate: '',
    manufactureDate: '',
    qty: '',
    unitPrice: ''
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
    console.log('Adding medicine:', formData);
  };

  const handleUpdate = () => {
    // Add update logic here
    console.log('Updating medicine');
  };

  const handleDelete = () => {
    // Add delete logic here
    console.log('Deleting medicine');
  };

  const handleSearch = () => {
    // Add search logic here
    console.log('Searching medicine');
  };

  return (
    <div className="management-page">
      <h2>Medicine Management</h2>
      
      <div className="search-section">
        <button className="generate-report-btn">Generate Report</button>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Medicine ID"
            className="search-input"
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="form-container">
        <div className="form-row">
          <input
            type="text"
            name="medicineName"
            placeholder="Medicine name"
            value={formData.medicineName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="supplierName"
            placeholder="Supplier Name"
            value={formData.supplierName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <input
            type="date"
            name="expireDate"
            placeholder="Expire Date"
            value={formData.expireDate}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="manufactureDate"
            placeholder="Manufacture Date"
            value={formData.manufactureDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <input
            type="number"
            name="qty"
            placeholder="QTY"
            value={formData.qty}
            onChange={handleInputChange}
          />
          <div className="price-input">
            <span className="currency">Rs.</span>
            <input
              type="number"
              name="unitPrice"
              placeholder="Unit Price"
              value={formData.unitPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="button-group">
          <button className="add-btn" onClick={handleAdd}>Add</button>
          <button className="update-btn" onClick={handleUpdate}>Update</button>
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="table-container">
        <h3>Out of Stock</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Medicine Name</th>
              <th>Expire Date</th>
              <th>Manufacture Date</th>
              <th>Supplier Name</th>
              <th>Unit Price</th>
              <th>QTY</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(medicine => (
              <tr key={medicine.id}>
                <td>{medicine.id}</td>
                <td>{medicine.name}</td>
                <td>{medicine.expireDate}</td>
                <td>{medicine.manufactureDate}</td>
                <td>{medicine.supplierName}</td>
                <td>{medicine.unitPrice}</td>
                <td>{medicine.qty}</td>
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

export default LabManagement; 