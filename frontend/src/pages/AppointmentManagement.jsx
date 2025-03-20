import { useState } from 'react';

const AppointmentManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;

  // Sample appointment data
  const appointmentsData = [
    { id: 1, name: "Chance Vaccaro", date: "10.01.2023", time: "12:54", email: "chance@email.com", mobile: "0785553221", nic: "956231478V", dob: "1995-06-15", status: "Pending" },
    { id: 2, name: "Desirae Kenter", date: "04.12.2023", time: "03:21", email: "desirae@email.com", mobile: "0724728839", nic: "887459632V", dob: "1988-03-22", status: "Rejected" },
    { id: 3, name: "Patlyn Lubin", date: "10.01.2023", time: "12:54", email: "patlyn@email.com", mobile: "0784924839", nic: "923456789V", dob: "1992-08-30", status: "Pending" },
    { id: 4, name: "Phillip Bator", date: "04.12.2023", time: "03:21", email: "phillip@email.com", mobile: "0784757839", nic: "901234567V", dob: "1990-12-05", status: "Pending" },
    { id: 5, name: "Emerson Stanton", date: "10.01.2023", time: "12:54", email: "emerson@email.com", mobile: "0785553221", nic: "856789123V", dob: "1985-04-18", status: "Accept" },
    { id: 6, name: "Alfredo Madsen", date: "03.08.2019", time: "12:54", email: "alfredo@email.com", mobile: "0724728839", nic: "934567891V", dob: "1993-11-25", status: "Rejected" },
    { id: 7, name: "Sarah Connor", date: "15.01.2023", time: "14:30", email: "sarah@email.com", mobile: "0784924839", nic: "912345678V", dob: "1991-07-12", status: "Pending" },
    { id: 8, name: "John Smith", date: "05.12.2023", time: "09:15", email: "john@email.com", mobile: "0784757839", nic: "878912345V", dob: "1987-09-28", status: "Accept" },
    { id: 9, name: "Emma Wilson", date: "11.01.2023", time: "11:00", email: "emma@email.com", mobile: "0785553221", nic: "945678912V", dob: "1994-02-14", status: "Pending" },
    { id: 10, name: "Michael Brown", date: "06.12.2023", time: "16:45", email: "michael@email.com", mobile: "0724728839", nic: "891234567V", dob: "1989-05-20", status: "Rejected" },
    // Add more data as needed
  ];

  // Filter appointments based on search term
  const filteredAppointments = appointmentsData.filter(appointment =>
    appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.mobile.includes(searchTerm)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    // In a real application, you would update the database here
    console.log(`Appointment ${id} status changed to ${newStatus}`);
  };

  return (
    <div className="management-page">
      <div className="page-header">
        <h1>Appointment Management</h1>
        <button className="generate-report">Generate Report</button>
      </div>

      <div className="management-form">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select className="filter-select">
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="all">All time</option>
          </select>
        </div>

        <div className="appointments-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>NIC</th>
                <th>DOB</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.name}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.mobile}</td>
                  <td>{appointment.nic}</td>
                  <td>{appointment.dob}</td>
                  <td>
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="accept-btn"
                      onClick={() => handleStatusChange(appointment.id, 'Accept')}
                    >
                      Accept
                    </button>
                    <button 
                      className="reject-btn"
                      onClick={() => handleStatusChange(appointment.id, 'Reject')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ←
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement; 