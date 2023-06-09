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
    img: [],
    placeCategory: "",
    lat: "",
    long: "",
    info: "",
    time: "",
    language: "",
    Rating: "",
    history: "",
    specialFood: "",
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
    let image = [];
    if (e.target.name == "img") {
      image.push(e.target.value);
      setpostData({ ...postData, img: image });
    } else {
      const data = { ...postData, [e.target.name]: e.target.value };
      setpostData(data);
    }
  };

  // Submit Places Flow

  const SubmitPlace = async () => {
    const { name, stateId, img, info, lat, long, placeCategory } = postData;
    console.log(postData);
    if (
      name != "" &&
      stateId != "" &&
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
            <option value="adventure">Adventure</option>
            <option value="beach">Beach</option>
            <option value="turist">Turist</option>
            <option value="museum">Museum</option>
            <option value="couples">Couples</option>
            <option value="architectural buildings">
              Architectural Buildings
            </option>
            <option value="masoleum">Mausoleum</option>
            <option value="cultural and Historical">
              Cultural and Historical
            </option>
            <option value="caves">Caves</option>
            <option value="pilgrimage sites">Pilgrimage sites</option>
            <option value="lake">Lake</option>
            <option value="falls">Falls</option>
            <option value="natural">Natural</option>
            <option value="church">Church</option>
            <option value="fort">Fort</option>
            <option value="valley">Valley</option>
            <option value="monumental sandstone arch">
              Monumental Sandstone Arch
            </option>
            <option value="major tourist destination">
              Major Tourist Destination
            </option>
            <option value="park">Park</option>
            <option value="evergreen forest">Evergreen forest</option>
            <option value="large monastery">Large monastery</option>
            <option value="mangrove forest">Mangrove Forest</option>
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
        <div>
          <label>Time:</label>{" "}
          <input
            type="text"
            placeholder="Time To VIsit"
            name="time"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.time}
          />
        </div>
        <div>
          <label>Language:</label>{" "}
          <input
            type="text"
            placeholder="Primary Language"
            name="language"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.language}
          />
        </div>
        <div>
          <label>history:</label>{" "}
          <input
            type="text"
            placeholder="History"
            name="history"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.history}
          />
        </div>
        <div>
          <label>specialFood:</label>{" "}
          <input
            type="text"
            placeholder="specialFood"
            name="specialFood"
            onChange={(e) => PlaceDataCollect(e)}
            value={postData.specialFood}
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
