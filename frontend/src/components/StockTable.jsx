const StockTable = () => {
  const stocks = [
    { id: 1, name: "Vitamin C", expireDate: "2025-04-13", manufactureDate: "2021-12-13", price: "1500.00", qty: "150" },
    { id: 2, name: "Paracetamol", expireDate: "2025-05-13", manufactureDate: "2022-04-04", price: "1500.00", qty: "225" },
  ];

  return (
    <div className="stock-table">
      <h2>Out of Stock</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Drug Name</th>
            <th>Expire Date</th>
            <th>Manufacture Date</th>
            <th>Price</th>
            <th>QTY</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.name}</td>
              <td>{stock.expireDate}</td>
              <td>{stock.manufactureDate}</td>
              <td>{stock.price}</td>
              <td>{stock.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable; 