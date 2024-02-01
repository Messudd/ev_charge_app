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

  return (
    <globalContext.Provider
      value={{
        formLocationData,
        setFormLocationData,
        userNavInfo,
        setUserNavInfo,
        userChoise,
        setUserChoise
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
