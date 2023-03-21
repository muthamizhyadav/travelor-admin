import React from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";
function Nav() {
  const navigate = useNavigate();
  const MenuRoute = ()=>{
    navigate('/Menu')
  }
  return (
    <div className="nav-container">
      <p className="nav-bar-Admin" onClick={MenuRoute} >Admin</p>
    </div>
  );
}

export default Nav;
