import { useContext, useEffect } from 'react'
import { globalContext } from '../../context/globalContextProvider';
import { useMap } from "react-leaflet";
import pin from "../../utility/images/pin.png";
import L  from "leaflet";
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const LeafletRouting = () => {
    const { pos,route ,setRoutes } = useContext(globalContext);
    const map = useMap();

    const markerPin = new L.Icon({
        iconUrl: pin,
        iconSize: [15, 20],
        iconAnchor: [11, 28],
        popupAnchor: [0, -40],
      });

    useEffect(() => {
        L.Marker.prototype.options.icon = markerPin;
        const routingControl =  L.Routing.control({
                waypoints: [
                  L.latLng(pos.lat,pos.lng),
                  L.latLng(route.lat,route.lng)
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
              })
              .on('routesfound', function(e) {
                setRoutes(e.routes);
              }).addTo(map);
        return () => map.removeControl(routingControl);
    },[route.lat,route.lng,pos.lat,pos.lng])
    
  return null;
}

export default LeafletRouting;