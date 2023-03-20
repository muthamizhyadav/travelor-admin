import React, { useEffect } from "react";
import "./AddState.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import BaseUrl from "../../env";
import Loading from "../Loader/Loading";

function AddState() {
  const navigate = useNavigate();

  const [Partition, setPartition] = React.useState([]);
  const [err, setErr] = React.useState("");
  const [show, setShow] = React.useState(true);

  const FetchPartition = async () => {
    const values = await Axios.get(`${BaseUrl}/v1/category`);
    if ((values.status == 200) | (values.status == 201)) {
      setShow(false);
    }
    setPartition(values.data);
  };

  useEffect(() => {
    FetchPartition();
  }, []);

  const RoutPage = (e) => {
    navigate(`/${e}`);
  };
  return (
    <div className="add-state-container">
      <Loading show={show} />
      <div className="manage-state-options">
        <button
          className="manage-state-view"
          onClick={() => RoutPage("ViewState")}
        >
          View State
        </button>
        {/* <button
          className="manage-state-edite"
          onClick={() => RoutPage("EditeState")}
        >
          Edite State
        </button> */}
      </div>
      <div className="add-state-forms">
        <p>Add State Here!</p>
        <div>
          <label>State Name:</label>{" "}
          <input type="text" placeholder="State Name" />
        </div>
        <div>
          <label>Partition:</label>{" "}
          <select>
            <option value="">Select Partition</option>
            {Partition.map((e) => (
              <option value={e.Name} key={e._id}>
                {e.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Url:</label> <input type="url" placeholder="image Url" />
        </div>
        <div>
          <label>About:</label> <input type="text" placeholder="About State" />
        </div>
        <div>
          <label>Time:</label> <input type="text" placeholder="Time To Visit" />
        </div>
        <div>
          <label>History:</label> <input type="text" placeholder="History" />
        </div>
        <div>
          <label>food:</label> <input type="text" placeholder="Famouse Food" />
        </div>
        <div>
          <label>climate:</label> <input type="text" placeholder="climate" />
        </div>
        <div>
          <label>Lat:</label> <input type="text" placeholder="Enter Latitude" />
        </div>
        <div>
          <label>Long:</label>{" "}
          <input type="text" placeholder="Enter Longitude" />
        </div>
        <button className="manage-statestate-btn">Save</button>
      </div>
    </div>
  );
}

export default AddState;
