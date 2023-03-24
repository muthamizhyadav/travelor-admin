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
                  <button onClick={() => imageDel(e)}>
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.7692 4.18182L15.2564 13.2029C15.2288 13.6891 15.0225 14.146 14.6797 14.4801C14.337 14.8142 13.8837 15.0002 13.4127 15H4.58728C4.11628 15.0002 3.66301 14.8142 3.32027 14.4801C2.97752 14.146 2.77122 13.6891 2.74359 13.2029L2.23077 4.18182M7.15385 7.68182L9 9.59091M9 9.59091L10.8462 11.5M9 9.59091L10.8462 7.68182M9 9.59091L7.15385 11.5M1.92308 4.18182H16.0769C16.5865 4.18182 17 3.75418 17 3.22727V1.95455C17 1.42764 16.5865 1 16.0769 1H1.92308C1.41354 1 1 1.42764 1 1.95455V3.22727C1 3.75418 1.41354 4.18182 1.92308 4.18182Z"
                        stroke="#FF0000"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </>
              ))
            : ""}
        </div>
        <div className="edite-del-btn">
          <button>Save & Continue</button>
        </div>
      </div>
    </div>
  );
}

export default EditeState;
