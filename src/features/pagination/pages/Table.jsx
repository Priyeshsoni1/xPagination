import React, { useEffect, useState } from "react";
import { fetchTable } from "../server/Fetcher";

export const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [count, setCount] = useState(1);
  const fetchData = async () => {
    try {
      const data = await fetchTable();

      setTableData(data);

      setShowData(data.slice(0, 10 * count));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(tableData);

  const handleNext = () => {
    if (count < Math.ceil(tableData.length / 10)) {
      setShowData(tableData.slice(10 * count, 10 * (count + 1)));
      setCount((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (count > 1) {
      setShowData(tableData.slice(10 * (count - 1), 10 * count));
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h2>Employee Data Table</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead
          style={{
            padding: "1rem",
            height: "2rem",
            backgroundColor: "#27A34DFF",
            color: "#FFFFFFFF",
          }}
        >
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {showData.length > 0 ? (
            showData.map((item) => (
              <tr
                key={item.id}
                style={{
                  padding: "1rem",
                  height: "2rem",
                }}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          textAlign: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <button
          onClick={handlePrevious}
          style={{
            backgroundColor: "#27A34DFF",
            color: "#FFFFFFFF",
            height: "1.7rem",
            borderRadius: "5px",
          }}
        >
          Previous
        </button>
        <p
          style={{
            backgroundColor: "#27A34DFF",
            color: "#FFFFFFFF",
            height: "2rem",
            width: "2rem",
            borderRadius: "5px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {count}
        </p>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: "#27A34DFF",
            color: "#FFFFFFFF",
            height: "1.7rem",
            borderRadius: "5px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
