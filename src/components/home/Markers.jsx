import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Marker, Popup, useMap } from "react-leaflet";
import { globalContext } from "../../context/globalContextProvider";
import markerUserIcon from "../../utility/images/live.gif";
import markerClickIcon from "../../utility/images/charging.png";
import markerOther from "../../utility/images/other.png";
import pin from "../../utility/images/pin.png";
import L  from "leaflet";
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const markerIcon = new L.Icon({
  iconUrl: markerUserIcon,
  iconSize: [36, 42],
  iconAnchor: [11, 28],
  popupAnchor: [0, -40],
});
const markerPin = new L.Icon({
  iconUrl: pin,
  iconSize: [15, 20],
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
    map.flyTo([pos.lat, pos.lng], 14,
      { duration : 3 });
  }, []);

  return (
    <>
      <Marker
        position={[pos.lat, pos.lng]}
        icon={markerIcon}
        eventHandlers={{
          click: (() => {
            map.flyTo([pos.lat, pos.lng],14,{
              duration: 3
            })
          })
        }}
      >
      </Marker>
    </>
  );
};

export const CreateMarkers = ({ filterTableData }) => {
  const map = useMap();
  const { pos } = useContext(globalContext);
  const leafletRouting = (lat,lng) => {
    L.Marker.prototype.options.icon = markerPin;
    L.Routing.control({
            waypoints: [
              L.latLng(pos.lat,pos.lng),
              L.latLng(lat,lng)
            ],
            lineOptions: {
              styles : [
                {
                  color: 'darkred',
                  weight: 6,
                  opacity : 0.7
                }
              ]
            },
            routeWhileDragging: false,
            addWaypoints: false,
            fitSelectedRoutes: true,
            routeWhileDragging: false,
            showAlternatives: false,
            pointMarkerStyle : false
          }).addTo(map);
  }
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
                map.flyTo([item.latitude, item.longitude], 14,
                 { duration : 3 })
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
                {
                  pos.loading && (
                    <button onClick={() => leafletRouting(item.latitude,item.longitude)}>Route</button>
                  )
                }
              </div>
            </Popup> 
          </Marker>
        ))}
    </>
  );
};
