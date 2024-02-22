import React, { useEffect, useState } from "react";
import "./reports.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";
import newRequests from "../../API/Newrequest";

const Reports = () => {
  const [storageReports, setstorageReports] = useState([]);

  const [transportReports, settransportReports] = useState([]);

  useEffect(() => {
    const GetReports = async () => {
      try {
        const res = await newRequests("/getAllCompletedTrips");
        console.log(res.data);
        setstorageReports(res.data.itemdetails.serviceType == "storage");
        settransportReports(res.data.itemdetails.serviceType == "moving");
      } catch (error) {
        console.error(error);
      }
    };

    GetReports();
  }, []);

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
