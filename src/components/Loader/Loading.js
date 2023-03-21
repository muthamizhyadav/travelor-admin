import React from "react";
import { ScaleLoader, PacmanLoader } from "react-spinners";
import "./Loading.css";
function Loading({ show }) {
  return (
    show && (
      <div className="loader">
        <div className="loader-child">
          <PacmanLoader color="#36d7b7" />
        </div>
      </div>
    )
  );
}

export default Loading;
