import React, { useContext, useEffect } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faCircleInfo, faSearch } from "@fortawesome/free-solid-svg-icons";
import { toastData } from "../../data/animationData";
import vehicle from "../../utility/images/vehicle.gif";
import chargeImg from "../../utility/images/charge.png";
import stationIcon from "../../utility/images/map.png";
import "react-toastify/dist/ReactToastify.css";
import "../../css/station_table.css";

const StationTable = () => {
  const {
    pos,
    map,
    formLocationData,
    filterTableData,
    setFilterTableData,
    userFavorites,
    setUserFavorites,
    route,
    setRoute,
    setCircle
  } = useContext(globalContext);

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
    const { value, type } = e.target;
    setFilterTableData({
      ...filterTableData,
      locDatas:
        type === "text"
          ? filterTableData.locDatas.filter((item) =>
              item.name.toLowerCase().includes(value.toLowerCase().trim())
            )
          : filterTableData.locDatas.filter((item) => item.type === value),
    });
  };

  const calculateDistance = (pos, loc) => {
    if (!(map === null)) {
      let distance = map.distance(
        [pos.lat, pos.lng],
        [loc.latitude, loc.longitude]
      );
      if (distance > 1000) {
        return `${(distance / 1000).toFixed(3)} Km`;
      }
      return `${distance.toFixed(3)} Meter`;
    }
  };

  const sortFilterTable = () => {
    let farDatas = [];
    let nearDatas = [];
    for (let item of filterTableData.locDatas) {
      if (calculateDistance(pos, item).includes("Km")) {
        farDatas.push(item);
      } else nearDatas.push(item);
    }
    setFilterTableData({
      ...filterTableData,
      locDatas: [
        ...nearDatas?.sort(
          (a, b) =>
            Number(calculateDistance(pos, a).split(" ")[0]) -
            Number(calculateDistance(pos, b).split(" ")[0])
        ),
        ...farDatas?.sort(
          (a, b) =>
            Number(calculateDistance(pos, a).split(" ")[0]) -
            Number(calculateDistance(pos, b).split(" ")[0])
        ),
      ],
    });
  };

  const loadAllData = () => {
    setFilterTableData({ ...formLocationData });
  };

  const showStationOnMap = (lat, lng) => {
    window.scrollTo(0, 0);
    setCircle(false);
    map.flyTo([lat, lng], 18, { duration: 3 });
    setTimeout(() => {
      setCircle(true);
    }, 3500);
  };
  useEffect(() => {
    setRoute({ ...route, route: false });
  }, [filterTableData.locDatas?.length]);

  useEffect(() => {
    setFilterTableData({ ...formLocationData });
  }, [formLocationData.locDatas]);

  return (
    <>
      {filterTableData.locDatas?.length > 0 ? (
        <div className="station-table">
          <div className="filter-table">
            <h2>Filter</h2>
            <div className="in">
              <label htmlFor="search-input">
                <FontAwesomeIcon icon={faSearch} color="#fff" opacity={0.8} />
              </label>
              <input
                type="text"
                id="search-input"
                placeholder="search name ..."
                name="name"
                onChange={filterTable}
              />
              <select defaultValue="" type="select" onChange={filterTable}>
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
              {pos.lat && pos.lng && (
                <button className="sort-btn" onClick={sortFilterTable}>
                  Nearest
                </button>
              )}
            </div>
          </div>
          <div className="table-divv">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Station Name</th>
                  <th>Type</th>
                  {pos.lat && pos.lng && (
                    <th
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <img src={vehicle} alt="vehicle" width={30} />
                      Map
                    </th>
                  )}
                  <th>Detail</th>
                  <th
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <img src={chargeImg} alt="charge" width={30} />
                    Favorite
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterTableData.locDatas.map((loc, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{loc.name}</td>
                      <td>{loc.type}</td>
                      <td
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          showStationOnMap(loc.latitude, loc.longitude)
                        }
                      >
                        <img
                          style={{ margin: "0 auto" }}
                          src={stationIcon}
                          alt="station-icon"
                          width={18}
                        />
                      </td>
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
          <button className="table-info-btn" onClick={loadAllData}>
            All
          </button>
          <p
            style={{
              color: "red",
              fontWeight: "600",
              fontFamily: "danss",
              fontSize: "1.5rem",
            }}
          >
            No Station !
          </p>
        </div>
      )}
    </>
  );
};

export default StationTable;
