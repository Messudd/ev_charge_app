import React, { useRef, useState } from "react";
import "../css/addFavorite.css";

const AddFavoriteComp = () => {
  const [image, setImage] = useState("");
  const [check, setCheck] = useState(false);
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
        <div className="adress-name">
          <div>
            <input type="text" placeholder="Name" />
          </div>
          <div>
            <input type="text" placeholder="Latitude" />
          </div>
          <div>
            <input type="text" placeholder="Longitude" />
          </div>
        </div>
      </div>
      <div className="other-info">
        <input type="text" placeholder="Adress" />
        <div className="c-div">
          <input type="checkbox" onChange={(e) => setCheck(e.target.checked)} />
          <span>is charge station ?</span>
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
