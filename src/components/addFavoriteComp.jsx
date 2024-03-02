import React, { useRef, useState } from "react";
import { citys_data } from "../data/localData";
import "../css/addFavorite.css";

const AddFavoriteComp = () => {
  const [image, setImage] = useState("");
  const imgRef = useRef();

  const handleLoadImage = () => {
    imgRef.current.click();
  };

  return (
    <form action="" className="favorite-section">
      <div className="adress-picture">
        <div className="loc-profile" onClick={handleLoadImage}>
          {image ? (
            <img src={URL.createObjectURL(image)} alt="loc-img"></img>
          ) : (
            <img
              src="https://media.istockphoto.com/id/1313654783/vector/photo-upload-sticker-picture-flat-icons-uploading-your-photo-logo-camera-sign-vector-on.jpg?s=612x612&w=0&k=20&c=WdmvF_1p_7v-z_4cboZv5S9VYaRpHrnFsKqoLl1VLgA="
              alt="default"
            />
          )}
          <input
            type="file"
            id="file-loc"
            ref={imgRef}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="adress">
          <div className="adress-select">
            <select name="" id="" defaultValue="" style={{ flex: "1" }}>
              <option value="" disabled>
                City
              </option>
              {citys_data.map((item, idx) => (
                <option key={idx} value={item.il}>
                  {item.il}
                </option>
              ))}
            </select>
            <select name="" id="" style={{ flex: "0.5" }}>
              <option value="">Town</option>
            </select>
            <select defaultValue="" style={{ flex: "0.5" }}>
              <option value="">Type</option>
              <option value="">AC</option>
              <option value="">DC</option>
            </select>
          </div>
          <div className="adress-neigh">
            <input type="text" placeholder="Neighbourhood" />
          </div>
          <div className="adress-street">
            <input type="text" placeholder="Street" />
          </div>
        </div>
      </div>
      <div className="other-info">
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Latitude" />
        <input type="text" placeholder="Longitude" />
        <input type="text" placeholder="Power" />
        <input type="text" placeholder="Total" />
        <input type="text" placeholder="Status" />
        <input type="text" placeholder="Model" />
        <input type="text" placeholder="Model URL" />
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddFavoriteComp;
