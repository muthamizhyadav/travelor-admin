import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Login/Home";
import Nav from "./components/NavBar/Nav";
import Menu from "./components/Menu/Menu";
import AddState from "./components/State/AddState";
import Places from "./components/Places/Places";
import ViewPlace from "./components/Places/ViewPlace";
import EditePlace from "./components/Places/EditePlace";
import EditeState from "./components/State/EditeState";
import ViewState from "./components/State/ViewState";

function App() {
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
