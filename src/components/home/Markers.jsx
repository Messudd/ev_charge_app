import { useContext, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import { globalContext } from "../../context/globalContextProvider";
import markerUserIcon from "../../utility/images/live.gif";
import markerClickIcon from "../../utility/images/charging.png";
import markerOther from "../../utility/images/other.png";
import L from "leaflet";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const markerIcon = new L.Icon({
  iconUrl: markerUserIcon,
  iconSize: [36, 42],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});

const markerEcharge = new L.Icon({
  iconUrl: markerClickIcon,
  iconSize: [34, 38],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});
const markerOtherStation = new L.Icon({
  iconUrl: markerOther,
  iconSize: [42, 40],
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
            map.setView([pos.lat, pos.lng], 16);
          },
        }}
      >
      </Marker>
    </>
  );
};

export const CreateMarkers = ({ filterTableData }) => {
  const map = useMap();
  return (
    <>
      {!filterTableData.loading &&
        filterTableData.locDatas?.map((item, idx) => (
          <Marker
            key={idx}
            position={[item.latitude, item.longitude]}
            icon ={item.model === 'Eşarj' ? markerEcharge : markerOtherStation}
            eventHandlers={{
              click: () => {
                map.setView([item.latitude, item.longitude], 15);
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
                <span style={{color: 'red'}}>{item.status}</span>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};
