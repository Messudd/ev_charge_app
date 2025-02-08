import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Marker, Popup, useMap } from "react-leaflet";
import { globalContext } from "../context/globalContextProvider";
import markerClickIcon from "../utility/images/charging.png";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRoute } from "@fortawesome/free-solid-svg-icons";

const userIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#1E8CBE" fill-opacity="0.2">
        <animate 
          attributeName="r" 
          values="14;12;14" 
          dur="1.5s" 
          repeatCount="indefinite" 
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        />
      </circle>
      <circle cx="16" cy="16" r="10" fill="#1E8CBE" fill-opacity="0.4">
        <animate 
          attributeName="r" 
          values="10;8;10" 
          dur="1.5s" 
          repeatCount="indefinite" 
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        />
      </circle>
      <circle cx="16" cy="16" r="6" fill="#1E8CBE">
        <animate 
          attributeName="r" 
          values="6;5;6" 
          dur="1.5s" 
          repeatCount="indefinite" 
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
        />
      </circle>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
  className: "user-marker-icon",
});

const markerEcharge = new L.Icon({
  iconUrl: markerClickIcon,
  iconSize: [30, 34],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});

export const UserMarker = ({ pos }) => {
  const map = useMap();
  return (
    <Marker
      position={[pos.lat, pos.lng]}
      icon={userIcon}
      draggable={false}
      eventHandlers={{
        click: () => {
          setTimeout(() => {
            map?.flyTo([pos.lat, pos.lng], 15, {
              duration: 3,
            });
          }, 500);
        },
      }}
    ></Marker>
  );
};

export const CreateMarkers = ({ Data }) => {
  const myMap = useMap();
  const { pos, route, setRoute, setMap } = useContext(globalContext);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!Data.loading &&
        Data.locDatas?.map((item, idx) => (
          <Marker
            key={idx}
            position={[item.latitude, item.longitude]}
            icon={markerEcharge}
            eventHandlers={{
              mouseover: (e) => {
                e.target.openPopup();
              },
            }}
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
                  <>
                    <a
                      className="google-maps"
                      href={`https://www.google.com/maps?q=${item.latitude},${item.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open with google maps
                    </a>
                    <button
                      className="route-btn"
                      onClick={() =>
                        setleafletRouting(item.latitude, item.longitude)
                      }
                    >
                      <span style={{ cursor: "pointer" }}>Route</span>
                      <FontAwesomeIcon
                        icon={faRoute}
                        color="#fff"
                        fontSize={15}
                      />
                    </button>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};
