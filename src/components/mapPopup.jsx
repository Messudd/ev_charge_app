import React, { useContext, useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import mark from "../utility/images/mark.png";
import perMark from "../utility/images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import L from "leaflet";
import { globalContext } from "../context/globalContextProvider";
import LeafletGecoder from "./home/leafletGeocoder";
import LeafletRouting from "./home/leafletRouting";
import "../css/popupMap.css";

const favMarker = new L.Icon({
  iconUrl: mark,
  iconSize: [34, 38],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});

const personMarker = new L.Icon({
    iconUrl: perMark,
    iconSize: [34, 38],
    iconAnchor: [11, 28],
    popupAnchor: [0, -40],
  });

const MapPopup = ({ value, setPopMap }) => {
  const { route, setRoute, otherPos , setOtherPos } = useContext(globalContext);
  const popRef = useRef();
  const closePopupMap = () => {
    setPopMap([]);
  };

  const setMapRouting = (lat, lng) => {
    setRoute({ ...route, route: false });
    setTimeout(() => {
      setRoute({
        lat: lat,
        lng: lng,
        route: true,
      });
    }, 300);
  };

  useEffect(() => {
        document.body.style.overflow = 'hidden';
    return () => {
        document.body.style.overflow = 'auto';
        setOtherPos({lat : '', lng : ''});
        setRoute({ ...route, route: false })
    };
  }, []);

  return (
    <>
      <div className="block-map">
        <div className="popup-map">
          <div className="close-map">
            <h3>Map Favorite Routing</h3>
            <FontAwesomeIcon
              className="x-mark"
              icon={faXmark}
              enableBackground="#fff"
              onClick={closePopupMap}
              fontSize="18px"
            />
          </div>
          <MapContainer
            ref={popRef}
            style={{ width: "100%", height: "100%" }}
            center={[value[0], value[1]]}
            zoom={12}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            zoomControl={true}
            dragging={true}
          >
            <TileLayer
              url="https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}@2x.png?key=CWyh1uHbXXLuNG4xZYXU"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LeafletGecoder />
            <Marker
              position={[value[0], value[1]]}
              icon={favMarker}
              eventHandlers={{
                click: () => {
                  popRef.current?.flyTo([value[0], value[1]], 15, {
                    duration: 3,
                  });
                },
              }}
            >
              <Popup>
                <p className="pop-p">
                  <li>
                    Lat : <span>{value[0]}</span>
                  </li>
                  <li>
                    Lng : <span>{value[1]}</span>
                  </li>
                  {otherPos.lat && otherPos.lng && (
                    <button
                      className="route-btn"
                      onClick={() => setMapRouting(value[0], value[1])}
                    >
                      <span>Route</span>
                      <FontAwesomeIcon icon={faLocationArrow} color="#fff" />
                    </button>
                  )}
                </p>
              </Popup>
            </Marker>
            {otherPos.lat && otherPos.lng && (
              <Marker
                position={[otherPos.lat, otherPos.lng]}
                icon={personMarker}
                eventHandlers={{
                    click: () => {
                      popRef.current?.flyTo([otherPos.lat, otherPos.lng], 15, {
                        duration: 3,
                      });
                    },
                  }}
              >
                <Popup>
                    <p>You are here !</p>
                </Popup>
              </Marker>
            )}
            {route.route && <LeafletRouting pos={otherPos} />}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default MapPopup;
