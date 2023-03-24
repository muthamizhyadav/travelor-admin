import React, { useEffect } from "react";
import "./EditeState.css";
import { useSearchParams } from "react-router-dom";
import Axios from "axios";
import BaseUrl from "../../env";
import Loading from "../Loader/Loading";

function EditeState() {
  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  const [stateData, setStateData] = React.useState({});
  const [show, setShow] = React.useState(true);

  // fetch State ById

  const FetchStateById = async () => {
    const data = await Axios.get(`${BaseUrl}/v1/state/${id}`);
    setStateData(data.data);
    if ((data.status != 200) | (data.status != 201)) {
      setShow(false);
    }
    console.log(stateData);
  };

  useEffect(() => {
    FetchStateById();
  }, []);

  const imageDel = async (e) => {
    console.log(e);
  };

  return (
    <div className="edite-state-container">
      <Loading show={show} />

      <div className="edit-state-title"></div>
      <div className="edit-state-form">
        <h1>Edite State</h1>

        <div>
          <label>State Name: </label>
          <input type="text" defaultValue={stateData.name} />
        </div>
        <div>
          <label>Capital: </label>
          <input type="text" defaultValue={stateData.capital} />
        </div>
        <div>
          <label>Image: </label>
          <input type="text" placeholder="Pase New Url" />
        </div>
        <div>
          <label>About: </label>
          <input type="text" defaultValue={stateData.about} />
        </div>
        <div>
          <label>Time: </label>
          <input type="text" defaultValue={stateData.time} />
        </div>
        <div>
          <label>History: </label>
          <input type="text" defaultValue={stateData.history} />
        </div>
        <div>
          <label>Food: </label>
          <input type="text" defaultValue={stateData.food} />
        </div>
        <div>
          <label>Climate: </label>
          <input type="text" defaultValue={stateData.climate} />
        </div>
        <div>
          <label>Time: </label>
          <input type="text" defaultValue={stateData.time} />
        </div>
        <div>
          <label>Latitude: </label>
          <input type="text" defaultValue={stateData.lat} />
        </div>
        <div>
          <label>Longitude: </label>
          <input type="text" defaultValue={stateData.long} />
        </div>
        <div className="edite-state-image">
          {stateData.img
            ? stateData.img.map((e) => (
                <>
                  <img src={e} alt="image" />
                  <button onClick={() => imageDel(e)}>delete</button>
                </>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default EditeState;

