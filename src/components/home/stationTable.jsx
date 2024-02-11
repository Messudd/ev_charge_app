import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { toastData } from "../../data/animationData";
import "react-toastify/dist/ReactToastify.css";
import "../../css/station_table.css";


const StationTable = () => {
  const { formLocationData, userFavorites, setUserFavorites } =
    useContext(globalContext);
  const [filterTableData, setFilterTableData] = useState([]);


  const addFavoriteList = (param) => {
    if (userFavorites.length > 0) {
      if (userFavorites.filter((item) => item.id === param.id).length > 0) {
        toast.warn("Station is already in favorites !", { ...toastData });
      } else {
        setUserFavorites([...userFavorites, param]);
        toast.success("Station added to favorites.", { ...toastData });
      }
    } else {
      setUserFavorites([...userFavorites, param]);
      toast.success("Station added to favorites.", { ...toastData });
    }
  };

  const filterTable = (e) => {
    const { value } = e.target;
    setFilterTableData(
      formLocationData.locDatas.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase().trim())
      )
    );
  };

  const filterType = (e) => {
    const { value } = e.target;
    setFilterTableData(
      formLocationData.locDatas.filter(
        (item) => item.type.toLowerCase() === value.toLowerCase()
      )
    );
  };

  useEffect(() => {
    setFilterTableData([...formLocationData.locDatas]);
  },[])

  return (
    <div className="station-table">
      <div className="filter-table">
        <h2>Filter</h2>
        <div className="in">
          <input
            type="text"
            placeholder="search name ..."
            name="name"
            onChange={filterTable}
          />
          <select defaultValue="" onChange={filterType}>
            <option value="" disabled>
              Type
            </option>
            <option name="type" value="DC">
              DC
            </option>
            <option name="type" value="AC">
              AC
            </option>
          </select>
        </div>
      </div>
      <div className="table-divv">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Station Name</th>
              <th>Type</th>
              <th>Detail</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {filterTableData.map((loc, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{loc.name}</td>
                  <td>{loc.type}</td>
                  <td className="td-btn">
                    <Link
                      to={`/user/detail/${loc.id}`}
                      style={{ background: "none", width: "100%" }}
                    >
                      <FontAwesomeIcon icon={faCircleInfo}/>
                    </Link>
                  </td>
                  <td
                    className="td-btn"
                    onClick={() => addFavoriteList(loc)}
                  >
                    <span
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: "900",
                        padding: "4px",
                      }}
                    >
                      +
                    </span>
                    <span>add</span>
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
