import React from "react";
import "./singlestorage.scss";
import storage from "../../assets/storage.jpeg";

const SingleStorage = () => {
  // Hardcoded data for a single storage facility
  const image = storage;
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae massa vel velit maximus consectetur eget nec odio. Nulla facilisi. Quisque varius, purus nec vulputate vestibulum, ligula nunc finibus nulla,";
  const location = "Machakos";
  const capacity = "1000";
  const status = "Available";

  return (
    <div className="single-storage">
      <div className="storage-image">
        <img src={image} alt="Storage Facility" />
      </div>
      <div className="storage-details">
        <h2>Storage Facility</h2>
        <p>{description}</p>
        <p>Location: {location}</p>
        <p>Capacity: {capacity} sq. ft.</p>
        <p>Status: {status}</p>
        <button>Request Storage</button>
      </div>
    </div>
  );
};

export default SingleStorage;
