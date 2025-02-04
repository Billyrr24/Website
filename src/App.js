import React, { useState, useEffect } from "react";

const SHEET_ID = "Wallet Info (Sorted by VTRS)";
const API_KEY = "";
const RANGE = "A:Q"; // Fetch only columns A to Q
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setData(data.values || []); // Ensure data is formatted properly
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const formatNumber = (value) => {
    return !isNaN(value) && value !== "" ? Number(value).toLocaleString() : value;
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1e1e1e", // Dark theme
    color: "#ffffff", // White text
  };

  const thStyle = {
    backgroundColor: "#333",
    padding: "10px",
    borderBottom: "2px solid #555",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #444",
    textAlign: "left",
    minWidth: "100px", // Ensures consistent width
    maxWidth: "200px", // Prevents excessive stretching
    whiteSpace: "nowrap", // Prevents multi-line wrapping
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  if (loading) {
    return <div style={{ color: "#ffffff", textAlign: "center", padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#121212", minHeight: "100vh" }}>
      <h2 style={{ color: "#ffffff", textAlign: "center" }}>Wallet Info Dashboard</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            {data[0].map((header, index) => (
              <th key={index} style={thStyle}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={tdStyle}>{formatNumber(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
