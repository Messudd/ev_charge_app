import React from "react";
import {DotLoader} from "react-spinners";
import "./../css/loading.css";

const Loading = ({loading}) => {
  return (
    <div className="loading-body">
      <div className="loading">
       <DotLoader loading = {loading} color="darkred" size={50}/>
      </div>
    </div>
  );
};

export default Loading;
