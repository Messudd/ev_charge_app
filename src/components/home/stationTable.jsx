import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { toastData } from "../../data/animationData";
import  vehicle  from '../../utility/images/vehicle.gif';
import "react-toastify/dist/ReactToastify.css";
import "../../css/station_table.css";

const StationTable = () => {
  const {
    pos,
    map,
    formLocationData,
    setFormLocationData,
    userFavorites,
    setUserFavorites,
  } = useContext(globalContext);
  
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
    const { value , type } = e.target;
    console.log('e_type : ',type);
    setFormLocationData({
      ...formLocationData,
      locDatas: type === 'text'  ? formLocationData.locDatas.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase().trim())) : formLocationData.locDatas.filter((item) =>
        item.type === value
      )}
      )
  }

  const calculateDistance = (pos,loc) => {
    if(!(map === null)){
      let distance = map.distance([pos.lat , pos.lng] , [loc.latitude , loc.longitude]);
      if(distance > 1000){
        return `${(distance/1000).toFixed(3)} Km`;
      } 
     return `${distance.toFixed(3)} Meter`;
    
    }
  }

  const loadAllData = () => {
    setFormLocationData({...formLocationData , locDatas : filterTableData});
  }

  useEffect(() => {
    setFilterTableData([...formLocationData.locDatas]);
  }, []);

  useEffect(() => {
    console.log(('map : ',map));
  }, [pos]);

  return (
    <>
      {formLocationData.locDatas?.length > 0 ? (
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
              <select defaultValue="" type = 'select' onChange={filterTable}>
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
                  {(pos.lat && pos.lng) && <th style={{display: 'flex' , alignItems: 'center' , gap: '15px'}}><img src= {vehicle} alt="vehicle" width={40} />Distance</th> }
                  <th>Detail</th>
                  <th>Favorite</th>
                </tr>
              </thead>
              <tbody>
                {formLocationData.locDatas.map((loc, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{loc.name}</td>
                      <td>{loc.type}</td>
                      {(pos.lat && pos.lng) && <td>
                        {calculateDistance(pos,loc)}</td>}
                      <td className="td-btn">
                        <Link
                          to={`/user/detail/${loc.id}`}
                          style={{ background: "none", width: "100%" }}
                        >
                          <FontAwesomeIcon icon={faCircleInfo} />
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
      ) : (
        <div className="info-catch">
          <button className="table-info-btn"
          onClick={loadAllData}>All</button>
          <p
            style={{
              color: "red",
              fontWeight: "600",
              fontFamily: "danss",
              fontSize: "1.5rem",
            }}
          >
            Station not found !
          </p>
        </div>
      )}
    </>
  );
};

export default StationTable;
