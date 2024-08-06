import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { ModalProvider } from "./context";
const App = () => {
  return (
    <BrowserRouter>
      <div className="container-xl mx-auto p-6 font-sans cursor-custom">
        <ModalProvider>
          <AppRoutes />
        </ModalProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
