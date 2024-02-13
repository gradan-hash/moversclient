import React, { useState } from "react";
import "./upload.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";

const Upload = () => {
  const [serviceType, setServiceType] = useState("");
  const [quotation, setQuotation] = useState("");
  const [operationLocation, setOperationLocation] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data here, e.g., send to a backend server
    console.log({ serviceType, quotation, operationLocation, files });
    // Reset form or give feedback to the user
  };

  return (
    <>
      <Sidebar />

      <div className="upload-container">
        <div className="upload-top">
          {/* Placeholder for user image */}
          <img src="path/to/user-image.jpg" alt="User" className="user-image" />
        </div>
        <div className="upload-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Type of Service:</label>
              <div className="radio-options">
                <input
                  type="radio"
                  value="storage"
                  name="serviceType"
                  onChange={(e) => setServiceType(e.target.value)}
                />{" "}
                Storage
                <input
                  type="radio"
                  value="moving"
                  name="serviceType"
                  onChange={(e) => setServiceType(e.target.value)}
                />{" "}
                Moving
                <input
                  type="radio"
                  value="both"
                  name="serviceType"
                  onChange={(e) => setServiceType(e.target.value)}
                />{" "}
                Both
              </div>
            </div>
            <div className="form-group">
              <label>Quotation:</label>
              <input
                type="text"
                value={quotation}
                onChange={(e) => setQuotation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Operation Location:</label>
              <input
                type="text"
                value={operationLocation}
                onChange={(e) => setOperationLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Upload Images:</label>
              <input type="file" multiple onChange={handleFileChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="upload-bottom">
          {/* Optional: display uploaded file names or images preview */}
        </div>
      </div>
    </>
  );
};

export default Upload;
