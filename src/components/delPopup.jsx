import React, { useContext, useEffect } from "react";
import { globalContext } from "../context/globalContextProvider";
import { toastData } from "../data/animationData";
import { toast } from "react-toastify";
import axios from "axios";
import API_BASE_URL from "../data/apiBaseUrl";
import BeatLoader from "react-spinners/BeatLoader";

const DelPopup = ({ setDelPopComp, delItem, txt }) => {
  const { userFavorites, setUserFavorites, setdelLoading, isdelLoading } =
    useContext(globalContext);

  const closeDelPopup = () => {
    setDelPopComp(false);
  };

  const deleteItemMethod = async(val) => {
    setdelLoading(true);
    let userValues = atob(localStorage.getItem("session")).split(":");
    let userId = localStorage.getItem("userId");
    console.log(val.id);
    await axios
      .delete(`${API_BASE_URL}/user/station/${userId}/${val.id}`,{
        auth: {
          username: userValues[0],
          password: userValues[1],
        }
      })
      .then((res) => {
        setUserFavorites(userFavorites.filter((item) => item.id !== val.id));
        toast.success(`Station removed from list. stationId : ${res.data.id}`, { ...toastData });
        setdelLoading(false);
        setDelPopComp(false);
      })
      .catch((err) => {
        toast.warn(`${err?.response.data.message}`, { ...toastData })
        setdelLoading(false);
        setDelPopComp(false);
      });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="del-big">
      <div className="delpop">
        <h3>Warning !</h3>
        <p>{txt}</p>
        <div>
          <button onClick={closeDelPopup}>Cancel</button>
          <button onClick={() => deleteItemMethod(delItem)}>
            {isdelLoading ? (
              <BeatLoader
                loading={isdelLoading}
                color="#fff"
                size={8}
                style={{ background: "none" }}
              ></BeatLoader>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default DelPopup;
