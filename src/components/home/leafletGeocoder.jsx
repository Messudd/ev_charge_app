import { useContext, useEffect } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

const LeafletGecoder = () => {
  const map = useMap();
  const { setPos, route, setRoute , setOtherPos } = useContext(globalContext);

  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e) {
        setPos({
          lat: e.geocode.center.lat,
          lng: e.geocode.center.lng,
          loading: true,
        });
        setOtherPos({
          lat: e.geocode.center.lat,
          lng: e.geocode.center.lng,
        })
        map?.flyTo([e.geocode.center.lat, e.geocode.center.lng], 14, {
          duration: 3,
        });
        setRoute({ ...route, route: false });
      })
      .addTo(map);
  }, []);
  return null;
};

export default LeafletGecoder;
