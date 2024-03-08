import React, { useContext, useRef } from "react";
import { globalContext } from "../context/globalContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import stationIcon from "../utility/images/map.png";
import "../css/fetchList.css";

const FetchList = () => {
  const {
    fetchList,
    setFetchList,
    setFilterTableData,
    filterTableData,
    route,
    setRoute,
    showFetchList,
    setShowFetchList,
    formLocationData,
  } = useContext(globalContext);

  const btnMap = useRef();

  const loadFilterTableData = (arr) => {
    setFilterTableData({
      ...filterTableData,
      locDatas: arr,
    });
    setTimeout(() => {
      setRoute({ ...route, route: false });
    }, 500);
  };
  const showAllOnMap = () => {
    let locs = [];
    if (fetchList.length > 0) {
      for (let arr of fetchList) {
        locs = [...locs, ...arr];
      }
      setFilterTableData({
        ...filterTableData,
        locDatas: locs,
      });
      setTimeout(() => {
        setRoute({ ...route, route: false });
      }, 500);
    }
  };
  const clearAll = () => {
    setFetchList([]);
    setFilterTableData({
      ...filterTableData,
      locDatas: [],
    });
  };
  const showHideComponent = () => {
    setShowFetchList(!showFetchList);
  };
  const removeFromList = (item) => {
    const idx = fetchList.indexOf(item);
    fetchList.splice(idx, 1);
    btnMap.current.click();
    if (fetchList.length === 0) {
      setFilterTableData({
        ...filterTableData,
        locDatas: formLocationData.locDatas,
      });
    }
  };

  return (
    <>
      <div className="mapping">
        <button onClick={showAllOnMap} ref={btnMap}>
         <span>Show All Stations</span>
         <img src= {stationIcon} alt="map" width={15} />
        </button>
        <button onClick={clearAll}>
          <span>Clear All</span>
          <FontAwesomeIcon icon={faTrash}/>
        </button>
        <div className="hide-show" onClick={showHideComponent}>
          <FontAwesomeIcon
            icon={showFetchList ? faEyeSlash : faEye}
            color="#fff"
            fontSize="1rem"
          />
        </div>
      </div>
      {showFetchList && (
        <div className="fetch-list" style={{overflowX: 'auto'}}>
          {fetchList.map((list, i) => (
            <div className="fetch-card" key={i}>
              <div className="fetch-bg">
                <div className="ex">
                  <FontAwesomeIcon
                    className="xfetch"
                    icon={faXmark}
                    onClick={() => removeFromList(list)}
                  />
                </div>
              </div>
              <div
                className="fetch-content"
                onClick={() => loadFilterTableData(list)}
              >
                <h3 className="city">{list[0].city}</h3>
                <h3 className="town">{list[0].town}</h3>
                <p>{list.length}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FetchList;
