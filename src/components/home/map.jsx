import React, { useEffect, useState, useContext } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { motion } from "framer-motion";
import { variants } from "../../data/animationData";
import loc from "../../utility/images/current-location.png";
import { MapContainer, TileLayer ,Circle,LayerGroup } from "react-leaflet";
import { UserMarker, CreateMarkers } from "./Markers";
import "leaflet/dist/leaflet.css";
// import MarkerClusterGroup from "react-leaflet-cluster"; // use cluster --  Don't forget !!

const Map = () => {
  const satellite =
    "https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=kHLg8AiFGgnch1FMqKRv";
  const topo =
    "https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";
  const street =
    "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";
  const dark =
    "https://api.maptiler.com/maps/streets-v2-dark/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";

  const mapOptions = [
    { value: satellite, label: "Satellite" },
    { value: topo, label: "Topo" },
    { value: street, label: "Street" },
    { value: dark, label: "Dark" },
  ];

  const { formLocationData, mapStyle, setMapStyle, pos, setPos } =
    useContext(globalContext);
  const [center, setCenter] = useState({
    lat: 39.925533,
    lng: 32.866287,
  });
  const ZOOM_LEVEL = 6 || 0;

  const blueOptions = { color: "blue", fillColor: "blue" };

  const changeMapStyle = (e) => {
    setMapStyle(e.target.value);
  };

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

    navigator.geolocation.getCurrentPosition(onSucces, onError, {
      enableHighAccuracy: true,
      timeout: 5000,
    });
  };

  useEffect(() => {
    console.log("locDatas : ", formLocationData.locDatas);
  }, [formLocationData.loading, formLocationData.locDatas]);

  useEffect(() => {
    console.log("pos :", pos);
  }, [pos]);

  return (
    <>
      <div className="map-style">
        <p className="loc-parag">Live</p>
        <div className="button-location">
          <img
            className="get-location"
            style={{ filter: pos.loading && "brightness(150%)" }}
            onClick={getUserLocation}
            src={loc}
            alt=""
            width={26}
          />
        </div>
        <h3>Map : </h3>
        <select defaultValue="" onChange={changeMapStyle}>
          <option disabled value="">
            Select Type
          </option>
          {mapOptions.map((item, idx) => (
            <option key={idx} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="map-container"
      >
        <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom={false}>
          <TileLayer
            url={mapStyle}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pos.loading && (
            <LayerGroup>
              <Circle
                center={pos}
                pathOptions={blueOptions}
                radius={250}
              />
              <UserMarker pos={pos} />
            </LayerGroup>
          )}
          <CreateMarkers formLocationData={formLocationData} />
        </MapContainer>
      </motion.div>
    </>
  );
};

export default Map;
