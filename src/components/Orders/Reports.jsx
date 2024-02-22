import React, { useEffect, useState } from "react";
import "./reports.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";
import newRequests from "../../API/Newrequest";
import { Link } from "react-router-dom";

const Reports = () => {
  const [storageReports, setstorageReports] = useState([]);

  const [transportReports, settransportReports] = useState([]);

  useEffect(() => {
    const GetReports = async () => {
      try {
        const res = await newRequests("/getAllCompletedTrips");
        console.log(res.data);
        setstorageReports(res.data.storage);
        settransportReports(res.data.moving);
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
                <th>companyname</th>
                <th>Status</th>

                <th>username</th>
                <th>Compamny Ratig</th>
              </tr>
            </thead>
            <tbody>
              {storageReports.map((report, index) => (
                <tr key={index}>
                  <Link to="/reports/:id" style={{ textDecoration: "none" }}>
                    <td>{report._id}</td>
                  </Link>
                  <td>{report.itemdetails.operationLocation}</td>
                  <td>{report.providerdetails.companyname}</td>

                  <td>{report.status}</td>
                  <td>{report.userdetails.username}</td>
                  <td>{report.rating}</td>
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
                <th>Location</th>
                <th>companyname</th>
                <th>Status</th>

                <th>username</th>
                <th>Compamny Ratig</th>
              </tr>
            </thead>
            <tbody>
              {transportReports.map((report) => (
                <tr key={report._id}>
                  <Link to="/reports/:id" style={{ textDecoration: "none" }}>
                    <td>{report._id}</td>
                  </Link>
                  <td>{report.itemdetails.operationLocation}</td>
                  <td>{report.providerdetails.companyname}</td>

                  <td>{report.status}</td>
                  <td>{report.userdetails.username}</td>
                  <td>{report.rating}</td>
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
