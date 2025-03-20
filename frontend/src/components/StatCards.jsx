const StatCards = () => {
  const stats = [
    {
      title: "Total Patient",
      count: "20",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    },
    {
      title: "Total Doctors",
      count: "20",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
          <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM16 11H13V14H11V11H8V9H11V6H13V9H16V11Z"/>
        </svg>
      )
    },
    {
      title: "Total Wards",
      count: "20",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
          <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
        </svg>
      )
    },
    {
      title: "Total Labs",
      count: "20",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
          <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"/>
        </svg>
      )
    },
  ];

  return (
    <div className="stat-cards">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="icon">{stat.icon}</div>
          <div className="content">
            <p className="title">{stat.title}</p>
            <h3 className="count">{stat.count}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;