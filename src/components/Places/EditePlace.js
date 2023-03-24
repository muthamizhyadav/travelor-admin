import React from "react";
import "./EditePlace.css";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";
import BaseUrl from "../../env";
import Loading from "../Loader/Loading";

function EditePlace() {
  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");

  return (
    <div className="edite-place-container">
      <div className="edite-place-forms">
        <h1>Edite Place</h1>
        <div>
          <label>PLace Name: </label>
          <input type="text" defaultValue={"Place Name"} />
        </div>
        <div>
          <label>State Name: </label>
          {/* <input type="text" defaultValue={"State Name"} /> */}
          <select defaultValue={"State Name"}>
            <option>State Name</option>
          </select>
        </div>
        <div>
          <label>info: </label>
          <input type="text" defaultValue={"info"} />
        </div>
        <div>
          <label>URL: </label>
          <input type="text" placeholder="past update image URl here" />
        </div>
        <div>
          <label>Popular: </label>
          <input type="text" value="Yes" />
        </div>
        <div>
          <label>TopFive: </label>
          <input type="text" value="Yes" />
        </div>
        <div className="edite-place-image">
          <img
            src="https://media.istockphoto.com/id/1436513092/photo/thala-beach-nature-reserve-far-north-queensland.jpg?b=1&s=170667a&w=0&k=20&c=Kn4J1O_dDF-zwUm_NaNjoibJrN0BOowtuRBRkr5Wpk0="
            alt=""
          />
          <button>
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
        </div>
        <div className="edite-place-submit">
          <button>Save & Continue</button>
        </div>
      </div>
    </div>
  );
}

export default EditePlace;
