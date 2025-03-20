import StatCards from '../components/StatCards';
import PatientGraph from '../components/PatientGraph';
import AppointmentsTable from '../components/AppointmentsTable';
import DoctorsTable from '../components/DoctorsTable';
import StockTable from '../components/StockTable';

const Dashboard = () => {
  const stats = [
    { 
      icon: "👥", 
      title: "Total Patient", 
      count: "20",
      bgColor: "#ffffff"
    },
    { 
      icon: "💉", 
      title: "Total Doctors", 
      count: "20",
      bgColor: "#ffffff"
    },
    { 
      icon: "🏥", 
      title: "Total Wards", 
      count: "20",
      bgColor: "#ffffff"
    },
    { 
      icon: "🔬", 
      title: "Total Labs", 
      count: "20",
      bgColor: "#ffffff"
    }
  ];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-tile">
            <div className="stat-icon">
              <span>{stat.icon}</span>
            </div>
            <div className="stat-info">
              <p className="stat-title">{stat.title}</p>
              <h2 className="stat-count">{stat.count}</h2>
            </div>
          </div>
        ))}
      </div>
      <PatientGraph />
      <div className="tables-section">
        <AppointmentsTable />
        <DoctorsTable />
        <StockTable />
      </div>
    </div>
  );
};

export default Dashboard; 