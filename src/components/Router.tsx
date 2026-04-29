import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Callback from "../pages/Callback";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
