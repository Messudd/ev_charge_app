import React, { createContext, useState } from "react";

export const globalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [userChoise , setUserChoise] = useState({
    user_city : '',
    user_town: '',
    user_street : '',
    user_neigh: '',
  }) 
  const [formLocationData ,setFormLocationData] = useState({
    locDatas : [],
    loading : false,
  })
  const [mode, setMode] = useState('light');
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
        formLocationData,
        setFormLocationData,
        userNavInfo,
        setUserNavInfo,
        userFavorites,
        setUserFavorites,
        userChoise,
        setUserChoise,
        mapStyle,
        setMapStyle
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
