import React, { useEffect, useState, useContext } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { motion } from "framer-motion";
import { variants } from "../../data/animationData";
import loc from "../../utility/images/current-location.png";
import { Circle, LayersControl, MapContainer, Rectangle, TileLayer } from "react-leaflet";
import { UserMarker, CreateMarkers } from "./Markers";
import LeafletGecoder from "./leafletGeocoder";
import LeafletRouting from "./leafletRouting";
import "leaflet/dist/leaflet.css";
// import MarkerClusterGroup from "react-leaflet-cluster"; // use cluster --  Don't forget !!

const Map = () => {
  const basic =
    "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=kHLg8AiFGgnch1FMqKRv";
  const satellite =
    "https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=kHLg8AiFGgnch1FMqKRv";
  const topo =
    "https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";
  const street =
    "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";
  const dark =
    "https://api.maptiler.com/maps/streets-v2-dark/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";

  const mapOptions = [
    { value: basic, label: "Default" },
    { value: satellite, label: "Satellite" },
    { value: topo, label: "Topo" },
    { value: street, label: "Street" },
    { value: dark, label: "Dark" },
  ];

  const {
    formLocationData,
    filterTableData,
    mapStyle,
    setMapStyle,
    pos,
    setPos,
    route,
    circle,
  } = useContext(globalContext);
  const [center, setCenter] = useState({
    lat: 39.925533,
    lng: 32.866287,
  });
  const ZOOM_LEVEL = 6 || 0;

  const changeMapStyle = (e) => {
    setMapStyle(e.target.value);
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      const onSucces = (position) => {
        setPos({
          ...pos,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          loading: true,
        });
      };
      const onError = (error) => {
        alert("User - location didn't find !", error);
      };

      navigator.geolocation.getCurrentPosition(onSucces, onError, {
        enableHighAccuracy: true,
        timeout: 5000,
      });
    } else {
      alert("Geolocation is not supporting by this browser !");
    }
  };

  useEffect(() => {
    console.log("locDatas : ", formLocationData.locDatas);
  }, [formLocationData.loading, formLocationData.locDatas]);

  useEffect(() => {
    console.log("pos :", pos);
  }, [pos.lat, pos.lng]);

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
            alt="location"
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
          <LeafletGecoder />
          {pos.loading && (
            <LayersControl position="bottomright">
              <LayersControl.Overlay checked name="user location">
                {pos.loading && <UserMarker pos={pos} />}
              </LayersControl.Overlay>
              {circle && (
                <LayersControl.Overlay name="user location area" checked pathOptions = {{fillColor: 'blue'}}>
                  <Circle
                    pathOptions={{ color: "blue" }}
                    center={[pos.lat, pos.lng]}
                    radius={300}
                  />
                </LayersControl.Overlay>
              )}
            </LayersControl>
          )}
          <CreateMarkers filterTableData={filterTableData} />
          {route.route && <LeafletRouting />}
        </MapContainer>
      </motion.div>
    </>
  );
};

export default Map;
