import React, { useContext, useEffect } from "react";
import { globalContext } from "../context/globalContextProvider";
import { citys_data } from "../data/localData";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { toastData } from "../data/animationData";
import axios from "axios";

const BASE_API_URL = "http://192.168.1.13:8070/geolocation/ev";

const ManuelLocation = () => {
  const { userChoise, setUserChoise, fetchList, setFetchList } =
    useContext(globalContext);
  const { formLocationData, setFormLocationData, setColorStatus, colorStatus } =
    useContext(globalContext);
  const cities = citys_data.map((item) => item.il);

  const locFormOnHandleInputChange = (e) => {
    const { value, name } = e.target;
    setUserChoise({ ...userChoise, [name]: value });
  };

  const fetchLocation = async (url) => {
    let count = 0;
    return await axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setFormLocationData({
            ...formLocationData,
            locDatas: res.data,
            loading: false,
          });
          if (fetchList.length >= 0) {
            if (fetchList.length === 0) {
              setFetchList([...fetchList, res.data]);
            } else {
              for (let item of fetchList) {
                if (item[0].town === res.data[0].town) {
                  count++;
                }
              }
              if (count !== 1) {
                setFetchList([...fetchList, res.data]);
              }
            }
          }
        }, 200);
        setColorStatus(!colorStatus);
        toast.success("stations were found in this area.", { ...toastData });
      })
      .catch((err) => {
        toast.error(err.response.data.message, { ...toastData });
        setFormLocationData({ ...formLocationData, loading: false });
      });
  };

  const findChargeStation = async (e) => {
    e.preventDefault();
    setFormLocationData({ ...formLocationData, loading: true });
    if (userChoise.user_street === "" && userChoise.user_neigh === "") {
      fetchLocation(
        `${BASE_API_URL}/town/${userChoise.user_city}/${userChoise.user_town}`
      );
    } else if (userChoise.user_street === "" && userChoise.user_neigh !== "") {
      fetchLocation(
        `${BASE_API_URL}/neigh/${userChoise.user_city}/${userChoise.user_town}/${userChoise.user_neigh}`
      );
    } else {
      fetchLocation(
        `${BASE_API_URL}/street/${userChoise.user_city}/${userChoise.user_town}/${userChoise.user_neigh}/${userChoise.user_street}`
      );
    }
    // setUserChoise({
    //   user_city: "",
    //   user_town: "",
    //   user_street: "",
    //   user_neigh: "",
    // });
  };

  return (
    <div className="location-form">
      <h3>
        Find<span>Charge Station</span>
      </h3>
      <hr className="hrr" />
      <form onSubmit={findChargeStation}>
        <div className="city_selected">
          <select
            className="city-select"
            name="user_city"
            id="user_city"
            defaultValue=""
            onChange={locFormOnHandleInputChange}
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
        </div>
        <div className="town_selected">
          <select
            className="town-select"
            name="user_town"
            id="user_town"
            defaultValue=""
            disabled={userChoise.user_city ? false : true}
            onChange={locFormOnHandleInputChange}
          >
            <option value="" disabled>
              Please select a town
            </option>
            {userChoise.user_city &&
              citys_data
                .filter((item) => item.il === userChoise?.user_city)[0]
                .ilceleri.map((ilce, index) => (
                  <option key={index} value={ilce}>
                    {ilce}
                  </option>
                ))}
          </select>
        </div>
        <div className="user_neigh">
          <input
            type="text"
            id="user_neigh"
            name="user_neigh"
            // value={userChoise.user_neigh}
            placeholder="Neighbourhood  [Optional]"
            onChange={locFormOnHandleInputChange}
          />
        </div>
        <div className="user_street">
          <input
            type="text"
            disabled={userChoise.user_neigh === ""}
            id="user_street"
            name="user_street"
            // value={userChoise.user_street}
            placeholder="Street  [Optional]"
            onChange={locFormOnHandleInputChange}
          />
        </div>
        <button
          disabled={
            !(userChoise.user_city !== "" && userChoise.user_town !== "")
          }
          type="submit"
        >
          {formLocationData.loading ? (
            <BeatLoader
              loading={formLocationData.loading}
              color="#fff"
              size={10}
              style={{ background: "rgb(26, 26, 77)" }}
            ></BeatLoader>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </div>
  );
};

export default ManuelLocation;
