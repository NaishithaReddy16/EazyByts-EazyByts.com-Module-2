import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title } from "chart.js";
import "./App.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

function App() {
  const [stocks, setStocks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    axios.get("https://dashboard-1-backend-3.onrender.com /api/stocks")
      .then(res => {
        setStocks(res.data);
        calculatePortfolio(res.data);
        triggerNotifications(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const calculatePortfolio = (data) => {
    const total = data.reduce((sum, stock) => sum + stock.price, 0);
    setPortfolioValue(total);
  };

  const triggerNotifications = (data) => {
    const alerts = data
      .filter(stock => stock.change.startsWith("+"))
      .map(stock => `${stock.symbol} is gaining! Up ${stock.percent}`);
    setNotifications(alerts);
  };

  // Fake chart data (example trend)
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Stock Price Trend (₹)",
        data: stocks.map(s => s.price),
        borderColor: "green",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="App">
      <h1>📈 Stock Market Dashboard</h1>

      <div className="portfolio">
        <h3>💼 Portfolio Value: ₹{portfolioValue}</h3>
      </div>

      <div className="chart">
        <Line data={chartData} />
      </div>

      <h2>Stock List</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th>Price (₹)</th>
            <th>Change</th>
            <th>% Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, i) => (
            <tr key={i}>
              <td>{stock.symbol}</td>
              <td>{stock.name}</td>
              <td>{stock.price}</td>
              <td>{stock.change}</td>
              <td>{stock.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="notifications">
        <h2>🔔 Notifications</h2>
        {notifications.length > 0 ? (
          notifications.map((n, i) => <p key={i}>{n}</p>)
        ) : (
          <p>No alerts right now</p>
        )}
      </div>
    </div>
  );
}

export default App;