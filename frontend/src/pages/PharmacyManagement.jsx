import { LineChart, PieChart } from '../components/charts';
import '../styles/management.css';

const PharmacyManagement = () => {
  const stats = [
    { title: "Total Customer", count: "20" },
    { title: "Total Medicine", count: "20" },
    { title: "Total Manufacturers", count: "20" }
  ];

  const purchaseData = [
    { name: 'Jan', value: 1500 },
    { name: 'Feb', value: 2200 },
    { name: 'Mar', value: 1800 },
    { name: 'Apr', value: 2400 },
    { name: 'May', value: 2000 },
    { name: 'Jun', value: 3000 }
  ];

  const stockData = [
    { name: 'Tablets', value: 400 },
    { name: 'Syrups', value: 300 },
    { name: 'Injections', value: 200 },
    { name: 'Others', value: 100 }
  ];

  const stockTableData = [
    { 
      id: 1, 
      drugName: "Vitamin C", 
      expireDate: "2025-04-13", 
      manufactureDate: "2021-12-13",
      price: "1500.00",
      qty: "150",
      status: "In Stock"
    },
    { 
      id: 2, 
      drugName: "Paracetamol", 
      expireDate: "2025-05-13", 
      manufactureDate: "2022-04-04",
      price: "1500.00",
      qty: "225",
      status: "Low Stock"
    }
  ];

  return (
    <div className="management-page">
      <h1>Pharmacy Management</h1>
      <div className="stats-row">
        {stats.map((stat, index) => (
          <div key={index} className="stat-box">
            <h3>{stat.title}</h3>
            <p>{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Purchase Reports</h3>
          <LineChart data={purchaseData} />
        </div>
        <div className="chart-box">
          <h3>Medicine Stock</h3>
          <PieChart data={stockData} />
        </div>
      </div>

      <div className="stock-table">
        <h3>Stock Details</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Drug Name</th>
              <th>Expire Date</th>
              <th>Manufacture Date</th>
              <th>Price</th>
              <th>QTY</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {stockTableData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.drugName}</td>
                <td>{item.expireDate}</td>
                <td>{item.manufactureDate}</td>
                <td>{item.price}</td>
                <td>{item.qty}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacyManagement; 