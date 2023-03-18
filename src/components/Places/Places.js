import React, { useEffect } from "react";
import "./Places.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import BaseUrl from "../../env";

function Places() {
  const navigate = useNavigate();

  const [state, setState] = React.useState([]);

  const FetchStatePlace = async () => {
    const values = await Axios.get(`${BaseUrl}/v1/state`);
    setState(values.data);
  };

  useEffect(() => {
    FetchStatePlace();
  }, []);
  const RoutPage = (e) => {
    navigate(`/${e}`);
  };
  return (
    <div className="manage-place-container">
      <div className="manage-place-options">
        <button
          className="manage-place-btn-view"
          onClick={() => {
            RoutPage("ViewPlace");
          }}
        >
          View Places
        </button>
        {/* <button
          className="manage-place-btn-edit"
          onClick={() => {
            RoutPage("EditePlace");
          }}
        >
          Edite Places
        </button> */}
      </div>
      <div className="manage-place-form">
        <p>Add Place Here</p>
        <div>
          <label>Place Name:</label>
          <input type="text" placeholder="Place Name" />
        </div>
        <div>
          <label>State:</label>{" "}
          <select>
            <option>Select State</option>
            {state.map((e, i) => (
              <option>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Info:</label>
          <input type="text" placeholder="Place Information" />
        </div>
        <div>
          <label>Category:</label>{" "}
          <select>
            <option value="">Select Category</option>
            <option value="hills">Hills</option>
            <option value="temples">Temple's</option>
            <option value="hills">Adventure</option>
            <option value="beach">Beach</option>
          </select>
        </div>
        <div>
          <label>Url:</label> <input type="url" placeholder="image Url" />
        </div>
        <div>
          <label>Lat:</label> <input type="text" placeholder="Enter Latitude" />
        </div>
        <div>
          <label>Long:</label>{" "}
          <input type="text" placeholder="Enter Longitude" />
        </div>
        <button className="manage-place-btn">Add Place</button>
      </div>
    </div>
  );
}

export default Places;
