import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../context/globalContextProvider";
import { Chart } from "chart.js/auto";
import { CategoryScale, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DataGraf = () => {
  const { filterTableData } = useContext(globalContext);
  Chart.register(CategoryScale, Tooltip, Legend);
  Chart.defaults.color = "whitesmoke";

  const [barData, setBarData] = useState({
    labels: ["AC", "DC"],
    datasets: [],
  });

  useEffect(() => {
    setBarData({
      ...barData,
      datasets: [
        {
          label: "Count",
          data: [
            filterTableData.locDatas.filter((item) => item.type === "AC")
              .length,
            filterTableData.locDatas.filter((item) => item.type === "DC")
              .length,
          ],
          backgroundColor: ["red", "whitesmoke"],
          borderRadius: 3,
          circumference: 180,
          rotation: 270,
        },
      ],
    });
  }, [filterTableData.locDatas]);

  return (
    <div className="line-graf">
      <div className="bar-g">
        <Doughnut data={barData} />
      </div>
      <div className="bar-content">
        <h3>
          Total : <span>{filterTableData.locDatas.length}</span>
        </h3>
        <p style={{ color: "red" }}>
          AC :{" "}
          <span>
            {
              filterTableData.locDatas.filter((item) => item.type === "AC")
                .length
            }
          </span>
        </p>
        <p style={{ color: "whitesmoke" }}>
          DC :{" "}
          <span>
            {
              filterTableData.locDatas.filter((item) => item.type === "DC")
                .length
            }
          </span>
        </p>
      </div>
    </div>
  );
};

export default DataGraf;
