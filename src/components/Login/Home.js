import React from "react";
import "./Home.css";

import { useNavigate } from "react-router-dom";

function Home() {
  const [login, setLogin] = React.useState({ userName: "", Password: "" });
  const [err, setError] = React.useState(false);
  const naviget = useNavigate();
  const changeFun = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const clickFun = (login) => {
    if (login.userName == "" || login.userName != "Admin") {
      setError(true);
    } else if (login.Password == "" || login.Password != "Admin@123") {
      setError(true);
    }
    naviget("/Menu");
  };

  return (
    <div className="home-container">
      <div className="form">
        <h2>Login</h2>
        <div>
          <label>UserName:</label>{" "}
          <input type="text" name="userName" onChange={(e) => changeFun(e)} />
        </div>
        <div>
          <label>Password:</label>{" "}
          <input type="text" name="Password" onChange={(e) => changeFun(e)} />
        </div>
        {err ? <p style={{ color: "red" }}>Login Failed</p> : ""}
        <div>
          <button onClick={() => clickFun(login)}>Login</button>
        </div>
      </div>
    </div>
  );
}
export default Home;
