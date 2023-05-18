import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import http from "./http";

const App = () => {
  const authMethod = async () => {
    let authInfo = await http.get(
      "/oauth2/password?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0"
    );
    console.log(authInfo.data.access_token);
    localStorage.setItem("token", authInfo.data.access_token);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      authMethod();
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
