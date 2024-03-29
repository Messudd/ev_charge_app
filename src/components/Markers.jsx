import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Marker, Popup, useMap } from "react-leaflet";
import { globalContext } from "../context/globalContextProvider";
import markerUserIcon from "../utility/images/live.gif";
import markerClickIcon from "../utility/images/charging.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

const markerIcon = new L.Icon({
  iconUrl: markerUserIcon,
  iconSize: [36, 42],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});

const markerEcharge = new L.Icon({
  iconUrl: markerClickIcon,
  iconSize: [30, 34],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});

export const UserMarker = ({ pos }) => {
  const map = useMap();
  const { setCircle } = useContext(globalContext);

  return (
    <Marker
      position={[pos.lat, pos.lng]}
      icon={markerIcon}
      draggable={false}
      eventHandlers={{
        click: () => {
          setCircle(false);
          setTimeout(() => {
            map?.flyTo([pos.lat, pos.lng], 15, {
              duration: 3,
            });
          }, 500);
          setTimeout(() => {
            setCircle(true);
          }, 3500);
        },
      }}
    ></Marker>
  );
};

export const CreateMarkers = ({ Data }) => {
  const myMap = useMap();
  const { pos, route, setRoute, setMap } = useContext(globalContext);
  const [towns, setTowns] = useState([]);

  const setleafletRouting = (lat, lng) => {
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
    setMap(myMap);
    console.log("component did mount");
  }, []);

  useEffect(() => {
    setTowns([...new Set(Data.locDatas?.map((item) => item.town))]);
    console.log("towns : ", towns);
  }, [Data.locDatas]);

  return (
    <>
      {!Data.loading &&
        Data.locDatas?.map((item, idx) => (
          <Marker
            key={idx}
            position={[item.latitude, item.longitude]}
            icon={markerEcharge}
          >
            <Popup autoClose={true} closeOnClick={true}>
              <div className="pops">
                <h3>{item.name}</h3>
                <div className="pop-img">
                  <Link to={`/user/detail/${item.id}`}>
                    <img src={item.image} alt="ev_charge_foto" />
                  </Link>
                </div>
                <div className="detail">
                  <span>{item.power}</span>
                  <span>{"-"}</span>
                  <span>{item.type}</span>
                </div>
                <div className="detail">
                  <span>{item.model}</span>
                  <span>{"-"}</span>
                  <span>{"Socket :  " + item.total}</span>
                </div>
                <span style={{ color: "red" }}>{item.status}</span>
                {pos.loading && (
                  <button
                    className="route-btn"
                    onClick={() =>
                      setleafletRouting(item.latitude, item.longitude)
                    }
                  >
                    <span style={{ cursor: "pointer" }}>Route</span>
                    <FontAwesomeIcon icon={faLocationArrow} color="#fff" />
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};
