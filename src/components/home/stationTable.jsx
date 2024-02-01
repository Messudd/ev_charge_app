import React, { useContext } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../css/station_table.css";

const StationTable = () => {
  const { formLocationData, userFavorites, setUserFavorites } = useContext(globalContext);

  const toastData = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const addFavoriteList = (param) => {
    if (userFavorites.length > 0) {
      if (userFavorites.filter((item) => item.id === param.id).length > 0) {
        toast.warn("The station is already in favorites !", {...toastData});
      } else {
        setUserFavorites([...userFavorites, param]);
        toast.success("Station added to favorites.", {...toastData});}
    } else {
      setUserFavorites([...userFavorites, param]);
      toast.success("Station added to favorites.", {...toastData});
    }
  };

  return (
    <div className="station-table">
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Town</th>
              <th>Neighbourhood</th>
              <th>Street</th>
              <th>Type</th>
              <th>Detail</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {[...formLocationData.locDatas].map((loc, index) => {
              return (
                <tr key={index}>
                  <td>{loc.name}</td>
                  <td>{loc.city}</td>
                  <td>{loc.town}</td>
                  <td>{loc.neighbourhood}</td>
                  <td>{loc.street}</td>
                  <td>{loc.type}</td>
                  <td id="td-btn">
                    <Link
                      style={{ background: "none", width: "100%" }}
                      to={`/user/detail/${loc.id}`}
                    >
                      Go
                    </Link>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      cursor="pointer"
                      onClick={() => addFavoriteList(loc)}
                      icon={faStar}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationTable;
