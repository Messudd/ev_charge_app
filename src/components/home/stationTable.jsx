import React, { useContext, useState } from "react";
import { globalContext } from "../../context/globalContextProvider";
import { Link } from "react-router-dom";
import "../../css/station_table.css";

const StationTable = () => {
  const { formLocationData } = useContext(globalContext);

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
                  <td></td>
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
