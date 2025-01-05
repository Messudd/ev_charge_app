import React, { useEffect, useState } from "react";
import { citys_data } from "../data/localData";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { toastData } from "../data/animationData";
import API_BASE_URL from "../data/apiBaseUrl";
import "../css/addFavorite.css";

const initialFavorite = {
  stationName: "",
  latitude: "",
  longitude: "",
  city: "",
  town: "",
  district: "",
  street: "",
  power: "",
  type: "",
  address: "",
  imageUrl: "",
};

const AddFavoriteComp = () => {
  const [check, setCheck] = useState(false);
  const [favoriteLoc, setFavoriteLoc] = useState(initialFavorite);

  const cities = citys_data.map((item) => item.il);

  const handleInChange = (e) => {
    const { value, name } = e.target;
    setFavoriteLoc({
      ...favoriteLoc,
      [name]: value,
    });
  };

  const handleAddFavotite = async (e) => {
    e.preventDefault();
    let adrs = `${favoriteLoc.district} - ${favoriteLoc.street} - 
    ${favoriteLoc.town}/${favoriteLoc.city.toUpperCase()}`;
    let data = { ...favoriteLoc, address: adrs }
    let userValues = atob(localStorage.getItem("session")).split(":");
    let userId = localStorage.getItem("userId");
    await axios
      .post(`${API_BASE_URL}/user/station/${userId}`,data,{
        auth: {
          username: userValues[0],
          password: userValues[1],
        },
      })
      .then((res) => {
        toast.success(`Station added to favorites. stationId: ${res.data.id}`, { ...toastData })
      })
      .catch((err) => {
        toast.warn(`${err.response.data.message}`, { ...toastData })
      });
    setFavoriteLoc(initialFavorite);
    setCheck(false);
  };

  useEffect(() => {
    console.log("addData : ", favoriteLoc);
  }, [favoriteLoc]);

  return (
    <>
      <form onSubmit={handleAddFavotite} className="favorite-section">
        <div className="adress-picture">
          <div className="loc-profile">
            {favoriteLoc.imageUrl ? (
              <img src={favoriteLoc.imageUrl} alt="loc-img"></img>
            ) : (
              <img
                src="https://media.istockphoto.com/id/1313654783/vector/photo-upload-sticker-picture-flat-icons-uploading-your-photo-logo-camera-sign-vector-on.jpg?s=612x612&w=0&k=20&c=WdmvF_1p_7v-z_4cboZv5S9VYaRpHrnFsKqoLl1VLgA="
                alt="default"
              />
            )}
          </div>
          <div className="adress-name">
            <div>
              <input
                type="text"
                name="stationName"
                value={favoriteLoc.stationName}
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
            name="imageUrl"
            id="loc-image"
            value={favoriteLoc.imageUrl}
            placeholder="Station image URL"
            onChange={handleInChange}
          />
          <select
            name="city"
            id="city"
            //defaultValue=""
            value={favoriteLoc.city}
            onChange={handleInChange}
          >
            <option value="" disabled>
              Please select a city
            </option>
            {cities.map((city, idx) => (
              <option key={idx} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            name="town"
            id="town"
            value={favoriteLoc.town}
            disabled={favoriteLoc.city ? false : true}
            onChange={handleInChange}
          >
            <option value="" disabled>
              Please select a town
            </option>
            {favoriteLoc.city &&
              citys_data
                .filter((item) => item.il === favoriteLoc.city)[0]
                .ilceleri.map((ilce, index) => (
                  <option key={index} value={ilce}>
                    {ilce}
                  </option>
                ))}
          </select>
          <input
            type="text"
            placeholder="Neighbourhood name "
            name="district"
            value={favoriteLoc.district}
            onChange={handleInChange}
          />
          <input
            type="text"
            placeholder="Street name"
            name="street"
            value={favoriteLoc.street}
            onChange={handleInChange}
          />
          <div className="c-div">
            <input
              type="checkbox"
              id="ischarge"
              checked={check}
              onChange={(e) => setCheck(e.target.checked)}
            />
            <label htmlFor="ischarge">is charge station ?</label>
          </div>
          {check && (
            <div className="check">
              <input
                type="text"
                placeholder="Power , kVA or kW"
                name="power"
                value={favoriteLoc.power}
                onChange={handleInChange}
              />
              <select
                value={favoriteLoc.type}
                id="type-station"
                name="type"
                onChange={handleInChange}
              >
                <option value="" disabled>
                  Type
                </option>
                <option value="AC">AC</option>
                <option value="DC">DC</option>
              </select>
            </div>
          )}
          <button disabled={check ? false : true} type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AddFavoriteComp;
