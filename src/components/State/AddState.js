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
  const [postState, setPostState] = React.useState({
    name: "",
    capital: "",
    about: "",
    climate: "",
    history: "",
    time: "",
    food: "",
    locationId: "",
    img: [],
    lat: "",
    long: "",
  });

  const FetchPartition = async () => {
    const values = await Axios.get(`${BaseUrl}/v1/category`);
    if ((values.status == 200) | (values.status == 201)) {
      setShow(false);
    }
    setPartition(values.data);
  };

  const StateChange = async (e) => {
    if (e.target.name == "img") {
      setPostState({ ...postState, [e.target.name]: [e.target.value] });
    } else {
      setPostState({ ...postState, [e.target.name]: e.target.value });
    }
  };

  const SubmitStatePost = async () => {
    if (
      postState.name != "" &&
      postState.locationId != "" &&
      postState.capital != "" &&
      postState.img.length != 0 &&
      postState.about &&
      postState.lat != "" &&
      postState.long != ""
    ) {
      console.log(postState);
      setShow(true);
      let values = await Axios.post(`${BaseUrl}/v1/state`, postState);
      if ((values.status == 200) | (values.status == 201)) {
        setShow(false);
        setErr('')
        setPostState({
          name: "",
          capital: "",
          about: "",
          climate: "",
          history: "",
          time: "",
          food: "",
          locationId: "",
          img: [],
          lat: "",
          long: "",
        });
      }
    } else {
      console.log(postState);
      setErr("Submit Failed Check All Mandatery Fields");
    }
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
      </div>
      <div className="add-state-forms">
        <p>Add State Here!</p>
        <div>
          <label>State Name:</label>{" "}
          <input
            type="text"
            placeholder="State Name"
            name="name"
            onChange={(e) => StateChange(e)}
            value={postState.name}
          />
        </div>
        <div>
          <label>Partition:</label>{" "}
          <select
            name="locationId"
            onChange={(e) => StateChange(e)}
            value={postState.locationId}
          >
            <option value="">Select Partition</option>
            {Partition.map((e) => (
              <option value={e._id} key={e._id}>
                {e.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Capital:</label>{" "}
          <input
            type="text"
            placeholder="Enter Capital"
            name="capital"
            onChange={(e) => StateChange(e)}
            value={postState.capital}
          />
        </div>
        <div>
          <label>Url:</label>{" "}
          <input
            type="url"
            placeholder="image Url"
            name="img"
            onChange={(e) => StateChange(e)}
            value={postState.img}
          />
        </div>
        <div>
          <label>About:</label>{" "}
          <input
            type="text"
            placeholder="About State"
            name="about"
            onChange={(e) => StateChange(e)}
            value={postState.about}
          />
        </div>
        <div>
          <label>Time:</label>{" "}
          <input
            type="text"
            placeholder="Time To Visit"
            name="time"
            onChange={(e) => StateChange(e)}
            value={postState.time}
          />
        </div>
        <div>
          <label>History:</label>{" "}
          <input
            type="text"
            placeholder="History"
            name="history"
            onChange={(e) => StateChange(e)}
            value={postState.history}
          />
        </div>
        <div>
          <label>food:</label>{" "}
          <input
            type="text"
            placeholder="Famouse Food"
            name="food"
            onChange={(e) => StateChange(e)}
            value={postState.food}
          />
        </div>
        <div>
          <label>climate:</label>{" "}
          <input
            type="text"
            placeholder="climate"
            name="climate"
            onChange={(e) => StateChange(e)}
            value={postState.climate}
          />
        </div>
        <div>
          <label>Lat:</label>{" "}
          <input
            type="text"
            placeholder="Enter Latitude"
            name="lat"
            onChange={(e) => StateChange(e)}
            value={postState.lat}
          />
        </div>
        <div>
          <label>Long:</label>{" "}
          <input
            type="text"
            placeholder="Enter Longitude"
            name="long"
            onChange={(e) => StateChange(e)}
            value={postState.long}
          />
        </div>
        {err != "" ? <span className="manage-state-error">{err}</span> : ""}
        <button className="manage-statestate-btn" onClick={SubmitStatePost}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddState;
