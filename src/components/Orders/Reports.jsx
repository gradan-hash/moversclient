import React from "react";
import "./reports.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";

const Reports = () => {
  const storageReports = [
    {
      id: 1,
      location: "Warehouse 5",
      city: "New York",
      capacityUsed: "75%",
      itemsStored: 300,
    },
    {
      id: 2,
      location: "Warehouse 12",
      city: "San Francisco",
      capacityUsed: "60%",
      itemsStored: 200,
    },
    // Add more storage reports as needed
  ];

  const transportReports = [
    {
      id: 1,
      serviceProvider: "FastTrans",
      from: "Chicago",
      to: "Detroit",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: 2,
      serviceProvider: "QuickMove",
      from: "Boston",
      to: "New York",
      status: "Completed",
      date: "2024-01-18",
    },
    // Add more transport reports as needed
  ];

  return (
    <>
      <Sidebar />
      <div className="reports">
        <section className="reportSection">
          <h2>Storage Reports</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>City</th>
                <th>Capacity Used</th>
                <th>Items Stored</th>
              </tr>
            </thead>
            <tbody>
              {storageReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.location}</td>
                  <td>{report.city}</td>
                  <td>{report.capacityUsed}</td>
                  <td>{report.itemsStored}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="reportSection">
          <h2>Transport Reports</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Service Provider</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transportReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.serviceProvider}</td>
                  <td>{report.from}</td>
                  <td>{report.to}</td>
                  <td>{report.status}</td>
                  <td>{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Reports;
