import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PatientGraph = () => {
  const data = [
    { name: 'Mon-14', patients: 1500 },
    { name: 'Tue-15', patients: 2212 },
    { name: 'Wed-16', patients: 1400 },
    { name: 'Thu-17', patients: 1800 },
    { name: 'Fri-18', patients: 1600 },
    { name: 'Sat-19', patients: 1450 },
    { name: 'Sun-20', patients: 1400 },
  ];

  const stats = [
    { label: "All time", value: "41 234" },
    { label: "30 days", value: "41 234" },
    { label: "7 days", value: "41 234" },
  ];

  return (
    <div className="patient-graph">
      <div className="graph-header">
        <h2>Patients</h2>
        <select className="">
          <option>7 days</option>
          <option>30 days</option>
          <option>All time</option>
        </select>
      </div>
      <div className="graph-container" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="patients" 
              stroke="#6c5ce7" 
              strokeWidth={2}
              dot={{ fill: "#6c5ce7", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <p className="label">{stat.label}</p>
            <h3 className="value">{stat.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientGraph;