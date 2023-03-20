import React from "react";
import { ScaleLoader } from "react-spinners";
import "./Loading.css";
function Loading({ show }) {
  return (
    show && (
      <div className="loader">
        <div className="loader-child">
          <ScaleLoader color="blue" />
        </div>
      </div>
    )
  );
}

export default Loading;
