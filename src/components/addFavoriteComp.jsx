import React, { useEffect, useRef, useState } from "react";
import "../css/addFavorite.css";

const initialFavorite = {
  image: "",
  name: "",
  latitude: "",
  longitude: "",
  description: "",
  power: "",
  type: "",
};

const AddFavoriteComp = () => {
  const [check, setCheck] = useState(false);
  const [favoriteLoc, setFavoriteLoc] = useState(initialFavorite);
  const imgRef = useRef();

  const handleLoadImage = () => {
    imgRef.current.click();
  };

  const handleInChange = (e) => {
    const { value, name, type } = e.target;
    setFavoriteLoc({
      ...favoriteLoc,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const handleAddFavotite = (e) => {
    e.preventDefault();
    setFavoriteLoc(initialFavorite);
  };

  useEffect(() => {
    console.log("addData : ", favoriteLoc);
  }, [favoriteLoc]);

  return (
    <form onSubmit={handleAddFavotite} className="favorite-section">
      <div className="adress-picture">
        <div className="loc-profile" onClick={handleLoadImage}>
          {favoriteLoc.image ? (
            <img
              src={URL.createObjectURL(favoriteLoc.image)}
              alt="loc-img"
            ></img>
          ) : (
            <img
              src="https://media.istockphoto.com/id/1313654783/vector/photo-upload-sticker-picture-flat-icons-uploading-your-photo-logo-camera-sign-vector-on.jpg?s=612x612&w=0&k=20&c=WdmvF_1p_7v-z_4cboZv5S9VYaRpHrnFsKqoLl1VLgA="
              alt="default"
            />
          )}
          <input
            type="file"
            name="image"
            id="file-loc"
            ref={imgRef}
            onChange={handleInChange}
          />
        </div>
        <div className="adress-name">
          <div>
            <input
              type="text"
              name="name"
              value={favoriteLoc.name}
              placeholder="Name"
              onChange={handleInChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="latitude"
              value={favoriteLoc.latitude}
              placeholder="Latitude"
              onChange={handleInChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="longitude"
              value={favoriteLoc.longitude}
              placeholder="Longitude"
              onChange={handleInChange}
            />
          </div>
        </div>
      </div>
      <div className="other-info">
        <input
          type="text"
          placeholder="Adress"
          name="description"
          value={favoriteLoc.description}
          onChange={handleInChange}
        />
        <div className="c-div">
          <input
            type="checkbox"
            id="ischarge"
            onChange={(e) => setCheck(e.target.checked)}
          />
          <label htmlFor="ischarge">is charge station ?</label>
        </div>
        {check && (
          <div className="check">
            <input type="text" placeholder="Power" />
            <select defaultValue="" id="type-station">
              <option value="" disabled>
                Type
              </option>
              <option value="AC">AC</option>
              <option value="DC">DC</option>
            </select>
          </div>
        )}
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddFavoriteComp;
