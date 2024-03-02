import React, { useContext, useEffect } from "react";
import { globalContext } from "../context/globalContextProvider";
import { toastData } from "../data/animationData";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

const DelPopup = ({ setDelPopComp, delItem, txt }) => {
  const { userFavorites, setUserFavorites, setdelLoading, isdelLoading } =
    useContext(globalContext);

  const closeDelPopup = () => {
    setDelPopComp(false);
  };

  const deleteItemMethod = (val) => {
    setdelLoading(true);
    try {
      setTimeout(() => {
        setUserFavorites(userFavorites.filter((item) => item.id !== val.id));
        setdelLoading(false);
        toast.success("Station removed from list.", { ...toastData });
        setDelPopComp(false);
      }, 500);
    } catch {
      toast.error("An error occurred while deleting !", { ...toastData });
      setdelLoading(false);
      setDelPopComp(false);
    }
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
