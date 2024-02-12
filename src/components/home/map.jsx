import React, { useEffect, useState, useContext } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { motion } from "framer-motion";
import { variants } from "../../data/animationData";
import loc from "../../utility/images/loc.png";
import markerUserIcon from "../../utility/images/placeholder.png";
import markerClickIcon from "../../utility/images/icons8-marker-48.png";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
// import MarkerClusterGroup from "react-leaflet-cluster"; // use cluster --  Don't forget !!
import "leaflet/dist/leaflet.css";

const UserMarker = ({ pos, markerIcon }) => {
  const map = useMap();
  return (
    <>
      <Marker
        position={[pos.lat, pos.lng]}
        icon={markerIcon}
        eventHandlers={{
          click: () => {
            map.setView([pos.lat,pos.lng], 15);
          },
        }}
      >
        <Popup>
          <span style={{ color: "#fff" }}>you are here</span>
        </Popup>
      </Marker>
    </>
  );
};

const CreateMarkers = ({ formLocationData, markerClick }) => {
  const map = useMap();
  return (
    <>
      {!formLocationData.loading &&
        formLocationData.locDatas?.map((item, idx) => (
          <Marker
            key={idx}
            position={[item.latitude, item.longitude]}
            icon={markerClick}
            eventHandlers={{
              click: () => {
                map.setView([item.latitude, item.longitude], 13);
              },
            }}
          >
            <Popup>
              <div className="pops">
                <h3>{item.name}</h3>
                <div className="pop-img">
                  <img src={item.image} alt="ev_charge_foto" />
                </div>
                <span>{item.type}</span>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

const Map = () => {
  const satellite =
    "https://api.maptiler.com/maps/satellite/256/{z}/{x}/{y}.jpg?key=kHLg8AiFGgnch1FMqKRv";
  const topo =
    "https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";
  const street =
    "https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=kHLg8AiFGgnch1FMqKRv";

  const mapOptions = [
    { value: satellite, label: "Satellite" },
    { value: topo, label: "Topo" },
    { value: street, label: "Street" },
  ];

  const { formLocationData, mapStyle, setMapStyle } = useContext(globalContext);
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

  const markerIcon = new L.Icon({
    iconUrl: markerUserIcon,
    iconSize: [25, 27],
    iconAnchor: [11, 28],
    popupAnchor: [0, -40],
  });

  const markerClick = new L.Icon({
    iconUrl: markerClickIcon,
    iconSize: [25, 27],
    iconAnchor: [11, 28],
    popupAnchor: [0, -40],
  });

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
    console.log("pos :", pos);
    console.log("locDatas : ", formLocationData);
  }, [pos, formLocationData.loading]);

  return (
    <>
      <div className="map-style">
        <div className="button-location">
          <img
            className="get-location"
            style={{ filter: pos.loading && "brightness(140%)" }}
            onClick={getUserLocation}
            src={loc}
            alt=""
            width={35}
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
        <MapContainer center={center} zoom={ZOOM_LEVEL} scrollWheelZoom = {false} >
          <TileLayer
            url={mapStyle}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pos.loading && <UserMarker pos={pos} markerIcon={markerIcon} />}
          <CreateMarkers
            formLocationData={formLocationData}
            markerClick={markerClick}
          />
        </MapContainer>
      </motion.div>
    </>
  );
};

export default Map;
