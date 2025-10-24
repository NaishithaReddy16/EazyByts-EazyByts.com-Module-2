// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

// Fake stock data
const stocks = [
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3850, change: "+25", percent: "+0.65%" },
  { symbol: "INFY", name: "Infosys", price: 1650, change: "-10", percent: "-0.60%" },
  { symbol: "RELI", name: "Reliance Industries", price: 2450, change: "+15", percent: "+0.62%" },
  { symbol: "HDFCB", name: "HDFC Bank", price: 1530, change: "+12", percent: "+0.79%" },
  { symbol: "SBIN", name: "State Bank of India", price: 630, change: "-5", percent: "-0.79%" },
];

// API endpoint
app.get("/api/stocks", (req, res) => {
  res.json(stocks);
});

// Start server
app.listen(5000, () => console.log("✅ Backend running on port 5000"));