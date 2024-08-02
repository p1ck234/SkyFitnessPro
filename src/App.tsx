import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./Routes";
const App = () => {
  return (
    <BrowserRouter>
      <div className="container-xl mx-auto p-6 font-sans cursor-custom">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
