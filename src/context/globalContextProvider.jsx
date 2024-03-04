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
  const [circle, setCircle] = useState(false);
  const [filterTableData, setFilterTableData] = useState([]);
  const [mode, setMode] = useState('light');
  const [prewPopup, setPrewPopup] = useState(false);
  const [isdelLoading, setdelLoading] = useState(false);
  const [colorStatus , setColorStatus] = useState(false);
  const [userNavInfo, setUserNavInfo] = useState({
    userName: "Mesud",
    gender: "MALE",
  });
  const [route , setRoute] = useState({
    lat: '',
    lng: '',
    route: false
  })
  const [otherPos, setOtherPos] = useState({
    lat: '',
    lng: ''
  })
  const [routes, setRoutes] = useState([]);
  const [userFavorites ,setUserFavorites] = useState([]);
  const [mapStyle ,setMapStyle] = useState(
    'https://api.maptiler.com/maps/bright-v2/{z}/{x}/{y}@2x.png?key=CWyh1uHbXXLuNG4xZYXU'
  )

  return (
    <globalContext.Provider
      value={{
        pos,
        setPos,
        map,
        setMap,
        colorStatus,
        setColorStatus,
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
        setPrewPopup,
        route,
        setRoute,
        routes,
        setRoutes,
        circle,
        setCircle,
        otherPos,
        setOtherPos,
        isdelLoading,
        setdelLoading,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
