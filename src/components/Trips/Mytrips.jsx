import React, { useEffect, useState } from "react";
import "../Orders/reports.scss";
import newRequests from "../../API/Newrequest";
import { Link } from "react-router-dom";
import Sidebarclient from "../Sidebar/Sidebarclient";


const Mytrips = () => {
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
      <Sidebarclient />
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
                  <Link
                    to={`/trips/${report._id}`}
                    style={{ textDecoration: "none" }}>
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
                  <Link
                    to={`/trips/${report._id}`}
                    style={{ textDecoration: "none" }}>
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

export default Mytrips;
