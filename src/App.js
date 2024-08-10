import React from "react";
import Details from "./Components/Details";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./styles/App.css";
import "./index.css";
import { AuthProvider } from "./Providers/AuthProvider";

function App() {
  return (
    <div>
      <AuthProvider>
        <ToastContainer />;
        <Details />
      </AuthProvider>
    </div>
  );
}

export default App;
