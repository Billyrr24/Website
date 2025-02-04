import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQV0Qjm7k6EaeIvyvEKbLoti-F_abvF3D4iVNrzXGxSXFPRkbHghwueDWz7IjG-SnzOSGX8qIjRorjQ/pub?gid=1972655678&single=true&output=csv") // Replace with your published CSV URL
      .then((response) => response.text())
      .then((text) => {
        const rows = text.split("\n").map((row) => row.split(","));
        setData(rows);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = data.filter((row) =>
    row.some((cell) => cell.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Blockchain Dashboard</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", marginBottom: "20px", width: "100%" }}
      />
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table border="1" width="100%">
          <thead>
            <tr>
              {data[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
