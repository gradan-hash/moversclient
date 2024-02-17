import React, { useState } from "react";
import "./upload.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";
import imagess from "../../assets/storage.jpeg";

import toast, { Toaster } from "react-hot-toast";
import Requests from "../../API/Providerequest";

const Upload = () => {
  const [serviceType, setServiceType] = useState("");
  const [quotation, setQuotation] = useState("");
  const [operationLocation, setOperationLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(""); // State to store uploaded image URL
  const [isImageLoading, setIsImageLoading] = useState(false); // State to indicate image is being uploaded
  const [cartype, setcartype] = useState("");

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
        console.log(data.url);
        setImageURL(data.url); // Store the URL of uploaded image
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image. Please try again later.");
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageURL) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = {
      serviceType,
      quotation,
      operationLocation,
      cartype,
      description,
      imageURL, // Include the imageURL in the data you're sending
    };

    try {
      const response = await Requests.post("/postproducts", formData);
      console.log(response.data);
      toast.success("Data submitted successfully!");

      // Reset form (optional)
      setServiceType("");
      setQuotation("");
      setOperationLocation("");
      setDescription("");
      setImageURL("");
      setcartype("");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <>
      <Sidebar />
      <Toaster />

      <div className="upload-container">
        
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
              <label>cartype</label>
              <input
                type="text"
                value={cartype}
                onChange={(e) => setcartype(e.target.value)}
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
