import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Login/Home";
import Nav from "./components/NavBar/Nav";
import Menu from "./components/Menu/Menu";
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
