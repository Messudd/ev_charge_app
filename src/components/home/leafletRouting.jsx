// import React, { useContext, useEffect } from 'react';
// import { globalContext } from '../../context/globalContextProvider';
// import {useMap} from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet-routing-machine';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';


// const LeafletRouting = () => {
//     const {pos} = useContext(globalContext);
//     const map = useMap();
//     useEffect(() => {
//         L.Routing.control({
//             waypoints: [
//               L.latLng(pos.lat,pos.lng),
//               L.latLng(57.6792, 11.949)
//             ]
//           }).addTo(map);
//     },[])

//   return null;
 
// }

// export default LeafletRouting;
