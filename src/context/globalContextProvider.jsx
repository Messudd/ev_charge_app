import React, { createContext, useState } from "react";

export const globalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [userChoise , setUserChoise] = useState({
    user_city : '',
    user_town: '',
    user_street : '',
    user_neigh: '',
  });
  const [map , setMap] = useState(null);
  const [pos, setPos] = useState({
    lat: "",
    lng: "",
    loading: false,
  });

  const [formLocationData ,setFormLocationData] = useState({
    locDatas : null,
    loading : false,
  });
  const [filterTableData, setFilterTableData] = useState([]);
  const [mode, setMode] = useState('light');
  const [prewPopup, setPrewPopup] = useState(false);
  const [userNavInfo, setUserNavInfo] = useState({
    userName: "Mesud",
    gender: "MALE",
  });
  const [userFavorites ,setUserFavorites] = useState([]);
  const [mapStyle ,setMapStyle] = useState(
    'https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=kHLg8AiFGgnch1FMqKRv'
  )

  return (
    <globalContext.Provider
      value={{
        pos,
        setPos,
        map,
        setMap,
        formLocationData,
        setFormLocationData,
        filterTableData,
        setFilterTableData,
        userNavInfo,
        setUserNavInfo,
        userFavorites,
        setUserFavorites,
        userChoise,
        setUserChoise,
        mapStyle,
        setMapStyle,
        prewPopup,
        setPrewPopup
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
