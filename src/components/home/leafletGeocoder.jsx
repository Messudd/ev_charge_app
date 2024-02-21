import { useContext, useEffect } from 'react'
import { globalContext } from '../../context/globalContextProvider';
import {useMap} from 'react-leaflet';
import L from 'leaflet';

const LeafletGecoder = () => {
    const map = useMap();
    const { setPos }  = useContext(globalContext);

    useEffect(()=> {
        L.Control.geocoder({
            defaultMarkGeocode: false
          })
            .on('markgeocode', function(e) {
                setPos({lat: e.geocode.center.lat , lng: e.geocode.center.lng ,loading : true})
            })
            .addTo(map);

    },[])
  return null;
}

export default LeafletGecoder;
