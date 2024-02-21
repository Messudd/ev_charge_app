import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toastData } from "../data/animationData";
import { useParams ,useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/detail.css";

const Detail = () => {
  const BASE_API_URL = "http://192.168.1.13:8070/geolocation/ev";
  const [detailLocation, setDetailLocation] = useState(null);
  let { id } = useParams();

  const history = useHistory();

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

  return (
    <div id="detail-root">
      {detailLocation && (
        <div className="detail-container">
          <div
            className="detail-image"
            style={{ backgroundImage: `url(${detailLocation.image})` }}
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
            <p style={{ color: "red" }}>Description</p>
            <p>{detailLocation.description}</p>
            <div className="back">
              <FontAwesomeIcon
               style={{cursor: 'pointer'}}
               onClick={() => {history.push('/user/home')}}
               icon={faChevronLeft} fontSize= '1.1rem' color="red" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
