import React from "react";
import "./Menu.css";
const menues = [
  {
    Title: "Manage State",
    img: "https://media.istockphoto.com/id/1389015727/photo/india-map-india-monuments-environment-karachi-sindh-pakistan-march-30-2022-3d-illustration.jpg?b=1&s=170667a&w=0&k=20&c=sb4vc__AHhZl5g81fS5cQoUvj_W7A-PF0bwf6au9EDA=",
  },
  {
    Title: "Manage Places",
    img: "https://media.istockphoto.com/id/1289872317/photo/village-of-khonoma-in-nagaland.jpg?b=1&s=170667a&w=0&k=20&c=temLtW7VFoM-TEkdpRgx6CGyTXc76D7Qu7MnxJDinb4=",
  },
];

function Menu() {
  return (
    <div className="menu-container">
      <div className="menu">
        {menues.map((e) => (
          <div className="cards" style={{ backgroundImage: `url(${e.img})`,backgroundSize:"cover"  }}>
            <p>{e.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
