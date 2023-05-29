import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import http from "./http";

export const TokenContext = React.createContext(null);

const login = process.env.REACT_APP_LOGIN;
const password = process.env.REACT_APP_PASSWORD;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

const App = () => {
  const initToken = localStorage.getItem("token") ?? null;
  const [token, setToken] = useState(initToken);
  const authMethod = async () => {
    let authInfo = await http.get(
      `/oauth2/password?login=${login}&password=${password}&client_id=${clientId}&client_secret=${clientSecret}&hr=0`
    );
    localStorage.setItem("token", authInfo.data.access_token);
    setToken(authInfo.data.access_token);
    localStorage.setItem("ttl", authInfo.data.ttl);
  };

  useEffect(() => {
    const ttl = localStorage.getItem("ttl") ?? false;
    if (!localStorage.getItem("token") || !ttl) {
      authMethod();
    } else {
      if (ttl < Date.now() / 1000) {
        authMethod();
      }
    }
  }, []);

  return (
    <TokenContext.Provider value={token}>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </TokenContext.Provider>
  );
};

export default App;
