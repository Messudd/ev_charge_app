import { useContext, useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import { Marker, Popup, useMap } from "react-leaflet";
import { globalContext } from "../../context/globalContextProvider";
import markerUserIcon from "../../utility/images/live.gif";
import markerClickIcon from "../../utility/images/charging.png";
import markerOther from "../../utility/images/other.png";
import L  from "leaflet";

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
  const circleRef = useRef();
  const map = useMap();
  const { setMap } = useContext(globalContext);

  useEffect(() => {
    setMap(map);
    map.flyTo([pos.lat, pos.lng], 14,
      { duration : 3 });
  }, [pos.lat,pos.lng]);

  return (
      <Marker
        position={[pos.lat, pos.lng]}
        icon={markerIcon}
        eventHandlers={{
          click: (() => {
            console.log(circleRef);
            map.flyTo([pos.lat, pos.lng],14,{
              duration: 3
            })
          })
        }}
      >
      </Marker>
  );
};

export const CreateMarkers = ({ filterTableData }) => {
  const map = useMap();
  const { pos , route , setRoute } = useContext(globalContext);

  const setleafletRouting = (lat,lng) => {
    setRoute({...route , route: false});
    setTimeout(() =>{
      setRoute({
        lat: lat,
        lng: lng,
        route: true
      })
    },300);
  } 
  return (
    <>
      {!filterTableData.loading &&
        filterTableData.locDatas?.map((item, idx) => (
          <Marker
            key={idx}
            position={[item.latitude, item.longitude]}
            icon ={item.model === 'Eşarj' ? markerEcharge : markerOtherStation}
            // eventHandlers={{
            //   click: () => {
            //     map.flyTo([item.latitude, item.longitude], 14,
            //      { duration : 3 })
            //   },
            // }}
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
                    <button
                    className="route-btn"
                    onClick={() => setleafletRouting(item.latitude,item.longitude)}>Route</button>
                  )
                }
              </div>
            </Popup> 
          </Marker>
        ))}
    </>
  );
};
