import React, { useEffect } from "react";
import "./Places.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import BaseUrl from "../../env";
import Loading from "../Loader/Loading";
function Places() {
  const navigate = useNavigate();

  const [state, setState] = React.useState([]);
  const [show, setShow] = React.useState(true);
  const [postData, setpostData] = React.useState({
    name: "",
    stateId: "",
    img: "",
    placeCategory: "",
    lat: "",
    long: "",
    info: "",
  });
  const [err, setErr] = React.useState("");
  const FetchStatePlace = async () => {
    const values = await Axios.get(`${BaseUrl}/v1/state`);
    if ((values.status == 200) | (values.status == 201)) {
      setShow(false);
    }
    setState(values.data);
  };

  useEffect(() => {
    FetchStatePlace();
  }, []);

  const RoutPage = (e) => {
    navigate(`/${e}`);
  };

  const PlaceDataCollect = (e) => {
    const data = { ...postData, [e.target.name]: e.target.value };
    setpostData(data);
  };

  // Submit Places Flow

  const SubmitPlace = async () => {
    const { name, stateId, img, info, lat, long, placeCategory } = postData;
    if (
      name != "" &&
      stateId != "" &&
      img != "" &&
      info != "" &&
      lat != "" &&
      long != "" &&
      placeCategory != ""
    ) {
      setShow(true);
      let values = await Axios.post(`${BaseUrl}/v1/tourist`, postData);
      if ((values.status != 200) | (values.status != 201)) {
        setShow(false);
        let placesEmpty = {
          name: "",
          stateId: "",
          img: "",
          placeCategory: "",
          lat: "",
          long: "",
          info: "",
        };
        setpostData(placesEmpty);
      }
    } else {
      
      setErr("All Fields Required");
    }
  };

  return (
    <div className="manage-place-container">
      <Loading show={show} />
      <div className="manage-place-options">
        <button
          className="manage-place-btn-view"
          onClick={() => {
            RoutPage("ViewPlace");
          }}
        >
          View Places
        </button>
      </div>
      <div className="manage-place-form">
        <p>Add Place Here</p>
        <div>
          <label>Place Name:</label>
          <input
            type="text"
            placeholder="Place Name"
            name="name"
            value={postData.name}
            onChange={(e) => PlaceDataCollect(e)}
          />
        </div>
        <div>
          <label>State:</label>{" "}
          <select
            name="stateId"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.stateId}
          >
            <option value="">Select State</option>
            {state.map((e, i) => (
              <option value={e._id}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Info:</label>
          <input
            type="text"
            placeholder="Place Information"
            name="info"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.info}
          />
        </div>
        <div>
          <label>Category:</label>{" "}
          <select
            name="placeCategory"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.placeCategory}
          >
            <option value="">Select Category</option>
            <option value="hills">Hills</option>
            <option value="temples">Temple's</option>
            <option value="hills">Adventure</option>
            <option value="beach">Beach</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Url:</label>{" "}
          <input
            type="url"
            placeholder="image Url"
            name="img"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.img}
          />
        </div>
        <div>
          <label>Lat:</label>{" "}
          <input
            type="text"
            placeholder="Enter Latitude"
            name="lat"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.lat}
          />
        </div>
        <div>
          <label>Long:</label>{" "}
          <input
            type="text"
            placeholder="Enter Longitude"
            name="long"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.long}
          />
        </div>
        {err != "" ? <span className="manage-place-err">{err}</span> : ""}
        <button className="manage-place-btn" onClick={SubmitPlace}>
          Add Place
        </button>
      </div>
    </div>
  );
}

export default Places;
