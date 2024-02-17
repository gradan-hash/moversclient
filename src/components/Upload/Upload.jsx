import React, { useState } from "react";
import "./upload.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";
import imagess from "../../assets/storage.jpeg";
import axios from "axios"; // Make sure to install axios with npm or yarn

const Upload = () => {
  const [serviceType, setServiceType] = useState("");
  const [quotation, setQuotation] = useState("");
  const [operationLocation, setOperationLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(""); // State to store uploaded image URL
  const [isImageLoading, setIsImageLoading] = useState(false); // State to indicate image is being uploaded

  const handleFileChange = async (event) => {
    setIsImageLoading(true);
    const file = event.target.files[0]; // Assuming single file upload
    if (file) {
      const formData = new FormData();
      formData.append("upload_preset", "muohmkoe");
      formData.append("cloud_name", "dgofftfvk");
      formData.append("file", file);

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dgofftfvk/upload",
          { method: "POST", body: formData }
        );
        const data = await response.json();
        setImageURL(data.url); // Store the URL of uploaded image
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again later.");
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageURL) {
      alert("Please upload an image.");
      return;
    }

    const formData = {
      serviceType,
      quotation,
      operationLocation,
      description,
      imageURL, // Include the imageURL in the data you're sending
    };

    try {
      // Replace `yourBackendEndpoint` with the actual endpoint where you handle the form submission
      const response = await axios.post("yourBackendEndpoint", formData);
      console.log(response.data);
      alert("Data submitted successfully!");

      // Reset form (optional)
      setServiceType("");
      setQuotation("");
      setOperationLocation("");
      setDescription("");
      setImageURL("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <Sidebar />

      <div className="upload-container">
        <div className="upload-top">
          {/* Placeholder for user image */}
          <img src={imagess} alt="User" className="user-image" />
        </div>
        <div className="upload-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Upload Images:</label>
              <input type="file" onChange={handleFileChange} />
              {isImageLoading && <p>Uploading image...</p>}
            </div>
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
                  value="moving and storage"
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
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isImageLoading}>
              Submit
            </button>
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
