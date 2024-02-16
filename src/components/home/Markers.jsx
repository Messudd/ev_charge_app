import { useContext, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { globalContext } from "../../context/globalContextProvider";
import markerUserIcon from "../../utility/images/live.gif";
import markerClickIcon from "../../utility/images/charging.png";
import L from "leaflet";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const markerIcon = new L.Icon({
  iconUrl: markerUserIcon,
  iconSize: [36, 42],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});

const markerClick = new L.Icon({
  iconUrl: markerClickIcon,
  iconSize: [34, 38],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});

export const UserMarker = ({ pos }) => {
  const map = useMap();
  const { setMap } = useContext(globalContext);

  useEffect(() => {
    setMap(map);
  }, []);

  return (
    <>
      <Marker
        position={[pos.lat, pos.lng]}
        icon={markerIcon}
        eventHandlers={{
          click: () => {
            map.setView([pos.lat, pos.lng], 15);
          },
        }}
      >
        <Popup>
          <span style={{ fontWeight: "700" }}>you are here !</span>
        </Popup>
      </Marker>
    </>
  );
};

export const CreateMarkers = ({ formLocationData }) => {
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
                  <Link to={`/user/detail/${item.id}`}>
                    <img src={item.image} alt="ev_charge_foto" />
                  </Link>
                </div>
                <span>{item.type}</span>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};
