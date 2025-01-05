import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { globalContext } from "../context/globalContextProvider";
import { toast } from "react-toastify";
import { toastData } from "../data/animationData";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/detail.css";

const Detail = () => {
  const BASE_API_URL = "https://192.168.1.13:8040/geolocation/ev";
  const [detailLocation, setDetailLocation] = useState(null);
  const { route, setRoute } = useContext(globalContext);
  let { id } = useParams();

  const history = useHistory();

  const defaultImage =
    "https://www.seekpng.com/png/detail/523-5232035_traditional-ev-charging-sign.png";

  const getLocDetail = async (param, url) => {
    await axios
      .get(url + `/${param}`)
      .then((res) => {
        setDetailLocation(res.data);
      })
      .catch((err) => {
        toast.error("this location not found detail : " + err.message, {
          ...toastData,
        });
      });
  };

  useEffect(() => {
    getLocDetail(id, BASE_API_URL);
  }, [id]);

  useEffect(() => {
    let id = localStorage.getItem('userId');
    id === undefined && history.push('/login');
    setRoute({ ...route, route: false });
  }, []);

  return (
    <div id="detail-root">
      {detailLocation && (
        <div className="detail-container">
          <div
            className="detail-image"
            style={{
              backgroundImage: detailLocation.image
                ? `url(${detailLocation.image})`
                : `url(${defaultImage})`,
            }}
          ></div>
          <div className="detail-content">
            <h2>{detailLocation.name}</h2>
            <p>
              <span>City : </span>
              <span>{detailLocation.city}</span>
            </p>
            <p>
              <span>Town : </span>
              <span>{detailLocation.town}</span>
            </p>
            <p>
              <span>Neighbourhood : </span>
              <span>{detailLocation.neighbourhood}</span>
            </p>
            <p>
              <span>Street : </span>
              <span>{detailLocation.street}</span>
            </p>
            <p>
              <span>Type : </span>
              <span>{detailLocation.type}</span>
            </p>
            <p>
              <li>
                <span>Power : </span>
                <span>
                  {detailLocation.power}
                  {" ,"}
                </span>
              </li>
              <li>
                <span>Total : </span>
                <span>
                  {detailLocation.total}
                  {" ,"}
                </span>
              </li>
              <li>
                <span>Status : </span>
                <span>{detailLocation.status}</span>
              </li>
            </p>
            <div className="coordinate">
              <p>
                <span>Latitude {" > "} </span>
                <span>{detailLocation.latitude}</span>
              </p>
              <p>
                <span>Longitude {" > "} </span>
                <span>{detailLocation.longitude}</span>
              </p>
            </div>
            <p style={{ color: "red" }}>Adress : </p>
            <p>{detailLocation.description}</p>
            <div className="back">
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push("/user/home");
                }}
                icon={faChevronLeft}
                fontSize="1.1rem"
                color="red"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
