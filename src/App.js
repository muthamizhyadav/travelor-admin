import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Axios from "axios";
import Home from "./components/Login/Home";
import Nav from "./components/NavBar/Nav";
import Menu from "./components/Menu/Menu";
import AddState from "./components/State/AddState";
import Places from "./components/Places/Places";
import ViewPlace from "./components/Places/ViewPlace";
import EditePlace from "./components/Places/EditePlace";
import EditeState from "./components/State/EditeState";
import ViewState from "./components/State/ViewState";
import Loading from "./components/Loader/Loading";
let instance = Axios.create();

function App() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    instance.interceptors.request.use(
      (config) => {
        setShow(true);
        // return config;
        console.log(config, "adfasdf")
        
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (config) => {
        setShow(false);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/mangeSate" element={<AddState />} />
        <Route path="/managePlace" element={<Places />} />
        <Route path="/ViewPlace" element={<ViewPlace />} />
        <Route path="/EditePlace" element={<EditePlace />} />
        <Route path="/EditeState" element={<EditeState />} />
        <Route path="/ViewState" element={<ViewState />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
