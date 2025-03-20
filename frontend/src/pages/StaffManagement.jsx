import { useState } from 'react';
import './StaffManagement.css';

const StaffManagement = () => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    role: '',
    gender: '',
    email: '',
    mobile: '',
    address: '',
    nic: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const staffData = [
    { id: 1, name: "Madhusha", role: "Doctor", gender: "Male", email: "Madhusha@gmail.com", mobile: "078-6662516", nic: "8626526", dob: "1999-04-13", status: "Online" },
    { id: 2, name: "Madhusha", role: "Doctor", gender: "Male", email: "Madhusha@gmail.com", mobile: "078-6662516", nic: "1616151", dob: "1999-04-13", status: "Online" },
    { id: 3, name: "Madhusha", role: "Doctor", gender: "Male", email: "Madhusha@gmail.com", mobile: "078-6662516", nic: "1715151", dob: "1999-04-13", status: "Online" },
    { id: 4, name: "Madhusha", role: "Doctor", gender: "Male", email: "Madhusha@gmail.com", mobile: "078-6662516", nic: "1616151", dob: "1999-04-13", status: "Online" },
  ];

  return (
    <div className="staff-page">
      <h2 className="page-title">Staff Management</h2>
      
      <div className="staff-form-container">
        <div className="header-section">
          <button className="generate-btn">Generate Report</button>
          <div className="search-box">
            <input type="text" placeholder="ID" />
            <button className="search-btn">Search</button>
          </div>
        </div>

        <div className="input-grid">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          
          <select defaultValue="">
            <option value="" disabled>Role</option>
            <option>Doctor</option>
            <option>Nurse</option>
          </select>
          
          <select defaultValue="">
            <option value="" disabled>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          
          <input type="email" placeholder="Email" />
          <input type="tel" placeholder="Mobile Number" />
          
          <textarea placeholder="Address" className="full-width"></textarea>
          
          <input type="text" placeholder="NIC" />
          <input type="date" placeholder="Date of Birth" />
          
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />

          <div className="button-group">
            <button className="register-btn">Register</button>
            <button className="update-btn">Update</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      </div>

      <div className="recent-doctors">
        <h3>Recent Doctors</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>NIC</th>
              <th>DOB</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.name}</td>
                <td>{staff.role}</td>
                <td>{staff.gender}</td>
                <td>{staff.email}</td>
                <td>{staff.mobile}</td>
                <td>{staff.nic}</td>
                <td>{staff.dob}</td>
                <td>
                  <span className={`status ${staff.status.toLowerCase()}`}>
                    {staff.status}
                  </span>
                </td>
                <td>
                  <button className="delete-icon">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement; 