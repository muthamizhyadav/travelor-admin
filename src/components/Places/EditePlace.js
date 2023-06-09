import React, { useEffect } from "react";
import "./EditePlace.css";
import Axios from "axios";
import { useSearchParams } from "react-router-dom";
import BaseUrl from "../../env";
import Loading from "../Loader/Loading";

function EditePlace() {
  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  const [SinglePlace, setSinglePlace] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [editePlace, setEditPlace] = React.useState({});
  // fetch Single Place

  const GetSinglePlace = async () => {
    setShow(true);
    let values = await Axios.get(`${BaseUrl}/v1/tourist/${id}`);
    if (values.status == 200 || values.status == 201) {
      setSinglePlace({ ...values.data });
      setShow(false);
    }
  };

  // uploadImage

  const UploadImage = async () => {
    setShow(true);
    let values = await Axios.put(`${BaseUrl}/v1/tourist/Upload/Image/${id}`, {
      image: image,
    });
    if (values.status == 200 || values.status == 201) {
      GetSinglePlace();
      setShow(false);
      setImage("");
    }
  };

  const imageChange = async (e) => {
    setImage(e.target.value);
  };

  const deleteImg = async (e) => {
    setShow(true);
    let deleteImg = await Axios.put(
      `${BaseUrl}/v1/tourist/delete/Image/${id}`,
      {
        image: e,
      }
    );
    if (deleteImg.status == 200 || deleteImg.status == 201) {
      setShow(false);
      GetSinglePlace();
    }
  };

  const EditChange = (e) => {
    if (e.target.name != "img") {
      setEditPlace({ ...editePlace, [e.target.name]: e.target.value });
    }
  };

  const submitEdit = async () => {
    setShow(true);
    let value = await Axios.put(`${BaseUrl}/v1/tourist/${id}`, editePlace);
    if (value.status == 200 || value.status == 201) {
      setShow(false);
      GetSinglePlace();
    }
  };

  useEffect(() => {
    GetSinglePlace();
  }, []);

  return (
    <div className="edite-place-container">
      <Loading show={show} />
      <div className="edite-place-forms">
        <h1>Edite Place</h1>
        <div>
          <label>PLace Name: </label>
          <input
            type="text"
            defaultValue={SinglePlace.name}
            name="name"
            onChange={(e) => {
              EditChange(e);
            }}
          />
        </div>
        <div>
          <label>State Name: </label>
          <select defaultValue={"State Name"}>
            <option>{SinglePlace.stateName}</option>
          </select>
        </div>
        <div>
          <label>Category: </label>
          <select name="placeCategory" onChange={(e) => EditChange(e)}>
            <option>{SinglePlace.category}</option>
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
          <label>info: </label>
          <input
            type="text"
            defaultValue={SinglePlace.info}
            name="info"
            onChange={(e) => {
              EditChange(e);
            }}
          />
        </div>

        <div>
          <label>Time: </label>
          <input
            type="text"
            defaultValue={SinglePlace.time}
            name="time"
            onChange={(e) => {
              EditChange(e);
            }}
          />
        </div>
        <div>
          <label>History: </label>
          <input
            type="text"
            defaultValue={SinglePlace.history}
            name="history"
            onChange={(e) => {
              EditChange(e);
            }}
          />
        </div>
        <div>
          <label>specialFood: </label>
          <input
            type="text"
            defaultValue={SinglePlace.specialFood}
            name="specialFood"
            onChange={(e) => {
              EditChange(e);
            }}
          />
        </div>
        <div>
          <label>Latitude: </label>
          <input
            type="text"
            defaultValue={SinglePlace.lat}
            name="lat"
            onChange={(e) => {
              EditChange(e);
            }}
          />
        </div>
        <div>
          <label>Longitude: </label>
          <input
            type="text"
            defaultValue={SinglePlace.long}
            name="long"
            onChange={(e) => {
              EditChange(e);
            }}
          />
        </div>
        <div>
          <label>URL: </label>
          <input
            type="text"
            placeholder="past update image URl here"
            value={image}
            onChange={(e) => {
              imageChange(e);
            }}
          />
        </div>
        <div className="image-upload-btn">
          <button onClick={UploadImage}>Upload</button>
        </div>
        <div className="edite-place-image">
          {SinglePlace.img
            ? SinglePlace.img.map((e) => (
                <>
                  <img src={e} alt="" />
                  <button onClick={(a) => deleteImg(e)}>
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
        <div className="edite-place-submit">
          <button onClick={submitEdit}>Save & Continue</button>
        </div>
      </div>
    </div>
  );
}

export default EditePlace;
