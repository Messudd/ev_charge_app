import React, { useEffect, useState, useContext } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { motion } from "framer-motion";
import { variants } from "../../data/animationData";
import loc from '../../utility/images/loc.png';
import markerUserIcon from "../../utility/images/icons8-marker-40.png";
import markerClickIcon from "../../utility/images/icons8-marker-48.png";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [center, setCenter] = useState({
    lat: 39.925533,
    lng: 32.866287,
  });
  const ZOOM_LEVEL = 6;
  const [pos, setPos] = useState({
    lat: "",
    lng: "",
    loading: false,
  });

  const { formLocationData } = useContext(globalContext);

  const markerIcon = new L.Icon({
    iconUrl: markerUserIcon,
    iconSize: [22, 27],
    iconAnchor: [11, 28],
    popupAnchor: [0, -40],
  });

  const markerClick = new L.Icon({
    iconUrl: markerClickIcon,
    iconSize: [22, 27],
    iconAnchor: [11, 28],
    popupAnchor: [0, -40],
  });

  const getUserLocation = () => {
    const onSucces = (position) => {
      setPos({
        ...pos,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        loading: !pos.loading,
      });
    };
    const onError = (error) => {
      alert("Geolocation is not support ! ", error);
    };

    navigator.geolocation.getCurrentPosition(onSucces, onError);
  };

  useEffect(() => {
    console.log("pos :", pos);
    console.log("locDatas : ", formLocationData);
  }, [pos, formLocationData.loading]);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="map-container"
      >
        <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={true}>
          <TileLayer
            url="https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=kHLg8AiFGgnch1FMqKRv"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pos.loading && (
            <Marker position={[pos.lat, pos.lng]} icon={markerIcon}>
              <Popup>
                <span style={{ color: "#fff" }}>you are here</span>
              </Popup>
            </Marker>
          )}
          {(formLocationData.locDatas.length > 0 && !formLocationData.loading) && 
            formLocationData.locDatas.map((item, idx) => (
              <Marker
                key={idx}
                position={[item.latitude, item.longitude]}
                icon={markerClick}
              >
                <Popup>
                  <div
                    className="pops"
                    style={{ width: "100px" }}
                  >
                    <div style={{ color: "#fff" ,opacity: '0.8' , display: 'flex', padding: '2px auto' }}>{item.description}</div>
                    <img src= {item.image} width={60} alt="ev_charge_foto" />
                    <div style={{ color: "red" }}>{item.type}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </motion.div>
      <div className="button-location">
          <img className="get-location" 
           style={{filter : pos.loading &&  'brightness(140%)'}}
           onClick={getUserLocation} src= {loc} alt="" width={35}/>
      </div>
    </>
  );
};

export default Map;
